import { EyeIcon, Pencil } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { paths } from '@/config/paths';

import { useCustomer } from '../api/get-customer';

import CustomerDelete from './customer-delete';

const CustomerTable = () => {
  const { data, isLoading, error } = useCustomer();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching customer data.</div>;

  console.log('Customer Data:', data);

  return (
    <div>
      <Button
        variant="default"
        className="mb-4"
        onClick={() => navigate(paths.app.masterCustomerCreate.getHref())}
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
                <Link to={`/app/master/customer/${row.entry.ID}`}>
                  <EyeIcon className="size-5 text-blue-500 hover:underline" />
                </Link>
                <Link to={`/app/master/customer/${row.entry.ID}/edit`}>
                  <Pencil className="ml-2 size-5 text-yellow-500 hover:underline" />
                </Link>
                <CustomerDelete id={row.entry.ID} />
              </div>
            ),
          },
          {
            title: 'ID',
            field: 'ID',
          },
          {
            title: 'Customer Code',
            field: 'CUSTOMER_CODE',
          },
          {
            title: 'Name',
            field: 'NAME',
          },
          {
            title: 'Type',
            field: 'TYPE',
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

export default CustomerTable;
