import { useParams } from 'react-router';

import EditMaterial from '@/features/master/material/components/material-edit';

const EditMaterialRoute = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Material Edit</h1>
      {id && <EditMaterial id={id} />}
    </div>
  );
};

export default EditMaterialRoute;
