import { Table } from '@/components/ui/table';

import { useMaterial } from '../api/get-material';

const MaterialTable = () => {
  const { data, isLoading, error } = useMaterial();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching material data.</div>;

  console.log('Material Data:', data);

  return (
    <Table
      data={[
        {
          id: '1',
          name: 'Material 1',
          description: 'Description for Material 1',
          quantity: 100,
        },
      ]}
      columns={[
        {
          title: 'Material Name',
          field: 'name',
        },
        {
          title: 'Description',
          field: 'description',
        },
        {
          title: 'Quantity',
          field: 'quantity',
        },
      ]}
    />
  );
};

export default MaterialTable;
