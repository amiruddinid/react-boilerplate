import { useSupplierDetail } from '../api/get-supplier-detail';

const SupplierDetail = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useSupplierDetail({ id });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Error occurred while fetching supplier detail data.</div>;

  console.log('Supplier Detail Data:', data);
  return (
    <div>
      <h1>Supplier Detail</h1>
      <div className="m-4 rounded-xl border p-4 shadow-lg">
        <div className="mb-4 flex flex-col">
          <p className="w-1/2 py-2 text-xl font-bold">ID: {data?.data.ID} </p>
          <p className="w-1/2 py-2 text-xl font-bold">
            Name: {data?.data.NAME}{' '}
          </p>
        </div>
        <div className="flex gap-4">
          <p className="w-80 border-b py-2 text-xl font-bold">Supplier Code</p>
          <p className="border-b py-2 text-xl font-bold">:</p>
          <p className="flex-1 border-b py-2 text-xl font-bold">
            {data?.data.SUPPLIER_CODE}{' '}
          </p>
        </div>
        <div className="flex gap-4">
          <p className="w-80 border-b py-2 text-xl font-bold">Contact Person</p>
          <p className="border-b py-2 text-xl font-bold">:</p>
          <p className="flex-1 border-b py-2 text-xl font-bold">
            {data?.data.CONTACT_PERSON}{' '}
          </p>
        </div>
        <div className="flex gap-4">
          <p className="w-80 border-b py-2 text-xl font-bold">Phone</p>
          <p className="border-b py-2 text-xl font-bold">:</p>
          <p className="flex-1 border-b py-2 text-xl font-bold">
            {data?.data.PHONE}{' '}
          </p>
        </div>
        <div className="flex gap-4">
          <p className="w-80 border-b py-2 text-xl font-bold">Address</p>
          <p className="border-b py-2 text-xl font-bold">:</p>
          <p className="flex-1 border-b py-2 text-xl font-bold">
            {data?.data.ADDRESS}{' '}
          </p>
        </div>
        <div className="flex gap-4">
          <p className="w-80 border-b py-2 text-xl font-bold">Status</p>
          <p className="border-b py-2 text-xl font-bold">:</p>
          <p className="flex-1 border-b py-2 text-xl font-bold">
            {data?.data.IS_ACTIVE ? 'Active' : 'Inactive'}{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetail;
