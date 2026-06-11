import { useBomDetail } from '../api/get-bom-detail';

const BomDetail = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useBomDetail({ id });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching BOM detail data.</div>;

  console.log('BOM Detail Data:', data);
  return (
    <div>
      <h1>BOM Detail</h1>
      <div className="m-4 rounded-xl border p-4 shadow-lg">
        <div className="mb-4 flex flex-col">
          <p className="w-1/2 py-2 text-xl font-bold">ID: {data?.data.ID} </p>
          <p className="w-1/2 py-2 text-xl font-bold">
            Car Model: {data?.data.MODEL_NAME} ({data?.data.MODEL_CODE})
          </p>
        </div>
        <div className="flex gap-4">
          <p className="w-80 border-b py-2 text-xl font-bold">Inventory ID</p>
          <p className="border-b py-2 text-xl font-bold">:</p>
          <p className="flex-1 border-b py-2 text-xl font-bold">
            {data?.data.INVENTORY_ID}{' '}
          </p>
        </div>
        {data?.data.MATERIAL_NAME && (
          <div className="flex gap-4">
            <p className="w-80 border-b py-2 text-xl font-bold">
              Material Name
            </p>
            <p className="border-b py-2 text-xl font-bold">:</p>
            <p className="flex-1 border-b py-2 text-xl font-bold">
              {data?.data.MATERIAL_NAME}{' '}
            </p>
          </div>
        )}
        {data?.data.PART_NUMBER && (
          <div className="flex gap-4">
            <p className="w-80 border-b py-2 text-xl font-bold">Part Number</p>
            <p className="border-b py-2 text-xl font-bold">:</p>
            <p className="flex-1 border-b py-2 text-xl font-bold">
              {data?.data.PART_NUMBER}{' '}
            </p>
          </div>
        )}
        <div className="flex gap-4">
          <p className="w-80 border-b py-2 text-xl font-bold">
            Quantity Required
          </p>
          <p className="border-b py-2 text-xl font-bold">:</p>
          <p className="flex-1 border-b py-2 text-xl font-bold">
            {data?.data.QTY_REQUIRED}{' '}
          </p>
        </div>
        {data?.data.WAREHOUSE_LOCATION && (
          <div className="flex gap-4">
            <p className="w-80 border-b py-2 text-xl font-bold">
              Warehouse Location
            </p>
            <p className="border-b py-2 text-xl font-bold">:</p>
            <p className="flex-1 border-b py-2 text-xl font-bold">
              {data?.data.WAREHOUSE_LOCATION}{' '}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BomDetail;
