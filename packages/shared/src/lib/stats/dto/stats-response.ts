import { ProjectMemberRole } from '../../project'
import { User } from '../../user/user'

export type UserMainInfo = Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'created'>

export type UsersByRegisteredHour = {
    hour: string,
    totalUsers: number
}

export type RecentylRegisteredUsersResponse = UserMainInfo

export type UsersMetaResponse = {
    totalUsers: number,
    verifiedUsersPercent: number,
    activeUsersPercent: number,
    newsletterSubscribersPercent: number,
}