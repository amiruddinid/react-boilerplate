import { useProductionDetail } from '../api/get-production-detail';

const ProductionDetail = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useProductionDetail({ id });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Error occurred while fetching material detail data.</div>;

  console.log('Production Detail Data:', data);
  return (
    <div>
      <h1>Production Detail</h1>
      <div className="m-4 rounded-xl border p-4 shadow-lg">
        <div className="mb-4 flex flex-col">
          <p className="w-1/2 py-2 text-xl font-bold">ID: {data?.data.ID} </p>
          <p className="w-1/2 py-2 text-xl font-bold">
            Name: {data?.data.NAME}{' '}
          </p>
        </div>
        <div className="flex gap-4">
          <p className="w-80 border-b py-2 text-xl font-bold">Part Number</p>
          <p className="border-b py-2 text-xl font-bold">:</p>
          <p className="flex-1 border-b py-2 text-xl font-bold">
            {data?.data.PART_NUMBER}{' '}
          </p>
        </div>
        <div className="flex gap-4">
          <p className="w-80 border-b py-2 text-xl font-bold">Supplier</p>
          <p className="border-b py-2 text-xl font-bold">:</p>
          <p className="flex-1 border-b py-2 text-xl font-bold">
            {data?.data.SUPPLIER_NAME}{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductionDetail;
