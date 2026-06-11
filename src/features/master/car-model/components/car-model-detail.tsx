import { useCarModelDetail } from '../api/get-car-model-detail';

const CarModelDetail = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useCarModelDetail({ id });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Error occurred while fetching car-model detail data.</div>;

  console.log('CarModel Detail Data:', data);
  return (
    <div>
      <h1>CarModel Detail</h1>
      <div className="m-4 rounded-xl border p-4 shadow-lg">
        <div className="mb-4 flex flex-col">
          <p className="w-1/2 py-2 text-xl font-bold">ID: {data?.data.ID} </p>
          <p className="w-1/2 py-2 text-xl font-bold">
            Name: {data?.data.NAME}{' '}
          </p>
        </div>
        <div className="flex gap-4">
          <p className="w-80 border-b py-2 text-xl font-bold">Model Name</p>
          <p className="border-b py-2 text-xl font-bold">:</p>
          <p className="flex-1 border-b py-2 text-xl font-bold">
            {data?.data.MODEL_NAME}{' '}
          </p>
        </div>
        <div className="flex gap-4">
          <p className="w-80 border-b py-2 text-xl font-bold">Model Code</p>
          <p className="border-b py-2 text-xl font-bold">:</p>
          <p className="flex-1 border-b py-2 text-xl font-bold">
            {data?.data.MODEL_CODE}{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarModelDetail;
