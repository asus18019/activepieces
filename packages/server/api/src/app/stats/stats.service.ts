import { FastifyRequest } from 'fastify'
import { 
    SeekPage,
    UsersByRegisteredHour,
    RecentylRegisteredUsersResponse,
    UsersMetaResponse
 } from '@activepieces/shared'
import { UserStatus } from '@activepieces/shared'
import { UserEntity } from './../user/user-entity'
import { repoFactory } from '../core/db/repo-factory'
import { calculatePercentage } from '@activepieces/server-shared'

export const userRepo = repoFactory(UserEntity)

export const statsService = {
    async getUsersByRegisteredHour (req: FastifyRequest): Promise<SeekPage<UsersByRegisteredHour>> {
        const getUsersByRegisteredHour = await userRepo()
            .createQueryBuilder("users")
            .select("STRFTIME('%H', created)", "hour")
            .addSelect("COUNT(*)", "totalUsers")
            .groupBy("hour")
            .orderBy("hour", "ASC")
            .getRawMany();

        return {
            data: getUsersByRegisteredHour,
            next: null,
            previous: null,
        }
    },
    async getRecentUsers (req: FastifyRequest): Promise<SeekPage<RecentylRegisteredUsersResponse>> {
        const recentUsers = await userRepo()
            .createQueryBuilder()
            .select("id, firstName, lastName, email, created")
            .orderBy("created", "DESC")
            .limit(5)
            .getRawMany();

        return {
            data: recentUsers,
            next: null,
            previous: null,
        }
    },
    async getUsersMeta (req: FastifyRequest): Promise<UsersMetaResponse> {
        const [totalUsers, activeUsers, verifiedUsers, newsLetters] = await Promise.all([
            userRepo().count(),
            userRepo().countBy({ status: UserStatus.ACTIVE }),
            userRepo().countBy({ verified: true }),
            userRepo().countBy({ newsLetter: true })
        ]);

        if (totalUsers === 0) {
            return {
                totalUsers: 0,
                verifiedUsersPercent: 0,
                activeUsersPercent: 0,
                newsletterSubscribersPercent: 0,
            };
        }

        return {
            totalUsers,
            verifiedUsersPercent: calculatePercentage(verifiedUsers, totalUsers),
            activeUsersPercent: calculatePercentage(activeUsers, totalUsers),
            newsletterSubscribersPercent: calculatePercentage(newsLetters, totalUsers),
        }
    }
}