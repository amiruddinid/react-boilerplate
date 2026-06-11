import { useParams } from 'react-router';

import EditBom from '@/features/master/bom/components/bom-edit';

const EditBomRoute = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit BOM</h1>
      <p>This is the Edit BOM page.</p>
      {id && <EditBom id={id} />}
    </div>
  );
};

export default EditBomRoute;
