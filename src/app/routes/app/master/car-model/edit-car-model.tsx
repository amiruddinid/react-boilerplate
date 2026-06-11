import { useParams } from 'react-router';

import EditCarModel from '@/features/master/car-model/components/car-model-edit';

const EditCarModelRoute = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>CarModel Edit</h1>
      {id && <EditCarModel id={id} />}
    </div>
  );
};

export default EditCarModelRoute;
