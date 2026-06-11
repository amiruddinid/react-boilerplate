import { EyeIcon, Pencil } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { paths } from '@/config/paths';

import { useBom } from '../api/get-bom';

import BomDelete from './bom-delete';

const BomTable = () => {
  const { data, isLoading, error } = useBom();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching BOM data.</div>;

  console.log('BOM Data:', data);

  return (
    <div>
      <Button
        variant="default"
        className="mb-4"
        onClick={() => navigate(paths.app.masterBomCreate.getHref())}
      >
        Add New
      </Button>
      <Table
        data={data?.data}
        columns={[
          {
            title: '',
            Cell: (row) => (
              <div className="flex items-center">
                <Link to={`/app/master/bom/${row.entry.ID}`}>
                  <EyeIcon className="size-5 text-blue-500 hover:underline" />
                </Link>
                <Link to={`/app/master/bom/${row.entry.ID}/edit`}>
                  <Pencil className="ml-2 size-5 text-yellow-500 hover:underline" />
                </Link>
                <BomDelete id={row.entry.ID} />
              </div>
            ),
          },
          {
            title: 'ID',
            field: 'ID',
          },
          {
            title: 'Car Model ID',
            field: 'CAR_MODEL_ID',
          },
          {
            title: 'Model Name',
            field: 'MODEL_NAME',
          },
          {
            title: 'Inventory ID',
            field: 'INVENTORY_ID',
          },
          {
            title: 'Material Name',
            field: 'MATERIAL_NAME',
          },
          {
            title: 'Qty Required',
            field: 'QTY_REQUIRED',
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

export default BomTable;
