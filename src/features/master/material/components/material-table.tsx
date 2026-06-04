import { Table } from '@/components/ui/table';

import { useMaterial } from '../api/get-material';

const MaterialTable = () => {
  const { data, isLoading, error } = useMaterial();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching material data.</div>;

  console.log('Material Data:', data);

  return (
    <Table
      data={data?.data}
      columns={[
        {
          title: 'ID',
          field: 'ID',
        },
        {
          title: 'Name',
          field: 'NAME',
        },
        {
          title: 'Part Number',
          field: 'PART_NUMBER',
        },
        {
          title: 'Unit',
          field: 'UNIT',
        },
        {
          title: 'Created By',
          field: 'CREATED_BY',
        },
        {
          title: 'Created Date',
          field: 'CREATED_DT',
        },
      ]}
    />
  );
};

export default MaterialTable;
