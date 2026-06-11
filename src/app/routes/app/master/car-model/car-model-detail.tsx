import { useParams } from 'react-router';

import CarModelDetail from '@/features/master/car-model/components/car-model-detail';

const CarModelDetailRoute = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>CarModel Detail</h1>
      <p>This is the CarModel Detail page.</p>
      {id && <CarModelDetail id={id} />}
    </div>
  );
};

export default CarModelDetailRoute;
