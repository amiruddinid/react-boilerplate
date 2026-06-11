import { ContentLayout } from '@/components/layouts';
import ProductionCountMonthly from '@/features/dashboard/components/production-count-monthly';
import { useUser } from '@/lib/auth';

const DashboardRoute = () => {
  const user = useUser();
  return (
    <ContentLayout title="Dashboard">
      <h1 className="text-xl">
        Welcome <b>{`${user.data?.firstName} ${user.data?.lastName}`}</b>
      </h1>
      <ProductionCountMonthly />
    </ContentLayout>
  );
};

export default DashboardRoute;
