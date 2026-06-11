import { EyeIcon, Pencil } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { paths } from '@/config/paths';

import { useCarModel } from '../api/get-car-model';

import CarModelDelete from './car-model-delete';

const CarModelTable = () => {
  const { data, isLoading, error } = useCarModel();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching car-model data.</div>;

  console.log('CarModel Data:', data);

  return (
    <div>
      <Button
        variant="default"
        className="mb-4"
        onClick={() => navigate(paths.app.masterCarModelCreate.getHref())}
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
                <Link to={`/app/master/car-model/${row.entry.ID}`}>
                  <EyeIcon className="size-5 text-blue-500 hover:underline" />
                </Link>
                <Link to={`/app/master/car-model/${row.entry.ID}/edit`}>
                  <Pencil className="ml-2 size-5 text-yellow-500 hover:underline" />
                </Link>
                <CarModelDelete id={row.entry.ID} />
              </div>
            ),
          },
          {
            title: 'ID',
            field: 'ID',
          },
          {
            title: 'Model Name',
            field: 'MODEL_NAME',
          },
          {
            title: 'Model Code',
            field: 'MODEL_CODE',
          },
          {
            title: 'Color',
            field: 'COLOR',
          },
          {
            title: 'Transmission',
            field: 'TRANSMISSION_TYPE',
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

export default CarModelTable;
