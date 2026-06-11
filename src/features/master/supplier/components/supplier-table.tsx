import { EyeIcon, Pencil } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { paths } from '@/config/paths';

import { useSupplier } from '../api/get-supplier';

import SupplierDelete from './supplier-delete';

const SupplierTable = () => {
  const { data, isLoading, error } = useSupplier();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching supplier data.</div>;

  console.log('Supplier Data:', data);

  return (
    <div>
      <Button
        variant="default"
        className="mb-4"
        onClick={() => navigate(paths.app.masterSupplierCreate.getHref())}
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
                <Link to={`/app/master/supplier/${row.entry.ID}`}>
                  <EyeIcon className="size-5 text-blue-500 hover:underline" />
                </Link>
                <Link to={`/app/master/supplier/${row.entry.ID}/edit`}>
                  <Pencil className="ml-2 size-5 text-yellow-500 hover:underline" />
                </Link>
                <SupplierDelete id={row.entry.ID} />
              </div>
            ),
          },
          {
            title: 'ID',
            field: 'ID',
          },
          {
            title: 'Supplier Code',
            field: 'SUPPLIER_CODE',
          },
          {
            title: 'Name',
            field: 'NAME',
          },
          {
            title: 'Contact Person',
            field: 'CONTACT_PERSON',
          },
          {
            title: 'Phone',
            field: 'PHONE',
          },
          {
            title: 'Address',
            field: 'ADDRESS',
          },
          {
            title: 'Active',
            field: 'IS_ACTIVE',
            Cell: (row) => <span>{row.entry.IS_ACTIVE ? 'Yes' : 'No'}</span>,
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

export default SupplierTable;
