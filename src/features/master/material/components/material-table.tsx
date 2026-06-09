import { EyeIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { paths } from '@/config/paths';

import { Table } from '@/components/ui/table';

import { useMaterial } from '../api/get-material';
import { Button } from '@/components/ui/button';

const MaterialTable = () => {
  const { data, isLoading, error } = useMaterial();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching material data.</div>;

  console.log('Material Data:', data);

  return (
    <div>
      <Button variant="default" className="mb-4" 
        onClick={() => navigate(paths.app.masterMaterialCreate.getHref())}>
        Add New
      </Button>
      <Table
        data={data?.data}
        columns={[
          {
            title: '',
            Cell: (row) => (
              <Link to={`/app/master/material/${row.entry.ID}`}>
                <EyeIcon className="size-5 text-blue-500 hover:underline" />
              </Link>
            ),
          },
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
    </div>
  );
};

export default MaterialTable;
