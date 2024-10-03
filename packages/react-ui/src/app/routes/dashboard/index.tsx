import { t } from 'i18next';
import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { Users, Activity, Mails, ShieldCheck } from 'lucide-react';

import { TableTitle } from '@/components/ui/table-title';
import { dashboardApi } from '@/features/dashboard/lib/dashboard-api';
import { timeSince } from '@/features/dashboard/lib/dashboard-utils';
import { Container } from '@/features/dashboard/components/container';
import { MetricCard } from '@/features/dashboard/components/metric-card';
import { OverviewChart } from '@/features/dashboard/components/overview-chart';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  SeekPage,
  RecentylRegisteredUsersResponse,
  UsersByRegisteredHour,
  UsersMetaResponse
} from '@activepieces/shared';

const chartConfig = {
  views: {
    label: 'New Accounts',
  },
  tasks: {
    color: '#8884d8',
  }
}

const DashboardPage: React.FC = () => {
  const dashboardQueries = useQueries<[
    UseQueryResult<UsersMetaResponse, Error>,
    UseQueryResult<SeekPage<RecentylRegisteredUsersResponse>, Error>,
    UseQueryResult<SeekPage<UsersByRegisteredHour>, Error>
  ]>({
    queries: [
      {
        queryKey: ['usersMeta'],
        queryFn: dashboardApi.getUsersMeta
      },
      {
        queryKey: ['recentUsers'],
        queryFn: dashboardApi.getRecentUsers
      },
      {
        queryKey: ['usersByRegisteredHour'],
        queryFn: dashboardApi.getUsersByRegisteredHour
      }
    ]
  })

  const [
    { data: usersMeta, error: usersMetaError, isLoading: isLoadingUsersMeta },
    { data: recentUsers, error: recentUsersError, isLoading: isLoadingRecentUsers },
    { data: usersByRegisteredHour, error: usersByRegisteredHourError, isLoading: isLoadingUsersByRegisteredHour }
  ] = dashboardQueries;

  if (isLoadingRecentUsers || isLoadingUsersByRegisteredHour || isLoadingUsersMeta) {
    return <div>Loading...</div>;
  }

  if (recentUsersError || usersByRegisteredHourError || usersMetaError) {
    return <div>Error loading data</div>;
  }

  if (!usersMeta || !usersByRegisteredHour || !recentUsers ) {
    return <div>Someting went wrong. No data available</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="mb-4 flex">
        <TableTitle>{t('Dashboard')}</TableTitle>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <MetricCard 
          title="Total Users" 
          value={ usersMeta.totalUsers.toString() } 
          icon={ <Users size={20}/> }
        />
        <MetricCard 
          title="Active Users"
          value={ `${ usersMeta.activeUsersPercent}%` }
          icon={ <Activity size={20}/> }
        />
        <MetricCard 
          title="News Letters" 
          value={ `${ usersMeta.newsletterSubscribersPercent}%` } 
          icon={ <Mails size={20}/> }
        />
        <MetricCard 
          title="Verified Users" 
          value={ `${ usersMeta.verifiedUsersPercent}%` } 
          icon={ <ShieldCheck size={20}/> }
        />
      </div>
      <div className="flex justify-center gap-4">
        <Container className="w-2/3 flex flex-col">
          <h2 className="font-bold mb-6">Overview</h2>
          <OverviewChart 
            chartConfig={ chartConfig }
            data={ usersByRegisteredHour.data }
            keys={{
              XDataKey: 'hour',
              YDataKey: 'totalUsers'
            }}
            tooltipLabelFormatter={ (hour) => `${hour}:00 - ${hour}:59` }
          />
        </Container>
        <Container className="w-1/3">
          <h2 className="font-bold mb-6">Recently joined</h2>
          <ul className="space-y-8">
            { recentUsers.data.map(({ id, firstName, lastName, email, created }) => (
              <li key={ id } className="flex items-center">
                <Avatar>
                  <AvatarFallback className="justify-center items-center flex">
                    <span className="p-2 text-background">
                      { firstName.charAt(0).toLocaleUpperCase() }
                    </span>
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-bold leading-none">{ `${ firstName } ${ lastName }` }</p>
                  <p className="text-sm text-muted-foreground">{ email }</p>
                </div>
                <div className="ml-auto font-semibold text-sm">{ timeSince(created) }</div>
              </li>
            )) }
          </ul>
        </Container>
      </div>
    </div>
  );
};

DashboardPage.displayName = 'Dashboard';

export { DashboardPage };