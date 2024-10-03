import { api } from '@/lib/api';
import { 
    SeekPage,
    RecentylRegisteredUsersResponse,
    UsersByRegisteredHour,
    UsersMetaResponse
 } from '@activepieces/shared';

export const dashboardApi = {
    getUsersMeta() {
        return api.get<UsersMetaResponse>(`/v1/stats/users/meta`);
    },
    getRecentUsers() {
        return api.get<SeekPage<RecentylRegisteredUsersResponse>>(`/v1/stats/users/recent`);
    },
    getUsersByRegisteredHour() {
        return api.get<SeekPage<UsersByRegisteredHour>>(`/v1/stats/users/byRegisteredHour`);
    },
}