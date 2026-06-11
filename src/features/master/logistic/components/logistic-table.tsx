import { Pencil } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';

import { useLogistic } from '../api/get-logistic';

import CreateLogistic from './logistic-create';
import LogisticDelete from './logistic-delete';
import EditLogistic from './logistic-edit';

const LogisticTable = () => {
  const { data, isLoading, error } = useLogistic();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching logistic data.</div>;

  console.log('Logistic Data:', data);

  return (
    <div>
      <div className="mb-4">
        {isCreating ? (
          <div className="rounded-xl border bg-muted/20 p-4 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Add Logistic</h2>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
            <CreateLogistic onClose={() => setIsCreating(false)} />
          </div>
        ) : editingId ? (
          <div className="rounded-xl border bg-muted/20 p-4 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Edit Logistic</h2>
              <Button variant="outline" onClick={() => setEditingId(null)}>
                Cancel
              </Button>
            </div>
            <EditLogistic id={editingId} onClose={() => setEditingId(null)} />
          </div>
        ) : (
          <Button variant="default" onClick={() => setIsCreating(true)}>
            Add New
          </Button>
        )}
      </div>
      <Table
        data={data?.data}
        columns={[
          {
            title: '',
            Cell: (row) => (
              <div className="flex items-center">
                <Button
                  variant="link"
                  className="mr-2 p-0"
                  onClick={() => {
                    setEditingId(row.entry.ID);
                    setIsCreating(false);
                  }}
                >
                  <Pencil className="size-5 text-yellow-500 hover:underline" />
                </Button>
                <LogisticDelete id={row.entry.ID} />
              </div>
            ),
          },
          {
            title: 'ID',
            field: 'ID',
          },
          {
            title: 'Vendor Code',
            field: 'VENDOR_CODE',
          },
          {
            title: 'Company Name',
            field: 'COMPANY_NAME',
          },
          {
            title: 'Fleet Type',
            field: 'FLEET_TYPE',
          },
          {
            title: 'Contact Number',
            field: 'CONTACT_NUMBER',
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

export default LogisticTable;
