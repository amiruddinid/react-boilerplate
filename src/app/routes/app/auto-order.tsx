import { ContentLayout } from '@/components/layouts';
import { AutoOrderDashboard } from '@/features/auto-order/components/auto-order-dashboard';

const AutoOrderRoute = () => {
  return (
    <ContentLayout title="Auto Order Job Settings">
      <AutoOrderDashboard />
    </ContentLayout>
  );
};

export default AutoOrderRoute;
export const Component = AutoOrderRoute; // Standard for bulletproof-react lazy route configuration
