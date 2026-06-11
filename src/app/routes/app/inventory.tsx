import { ContentLayout } from '@/components/layouts';
import { InventoryList } from '@/features/inventory/components/inventory-list';

const InventoryRoute = () => {
  return (
    <ContentLayout title="Inventory View">
      <InventoryList />
    </ContentLayout>
  );
};

export default InventoryRoute;
export const Component = InventoryRoute; // Standard for lazy route loading
