import { useParams } from 'react-router';

import MaterialDetail from '@/features/master/material/components/material-detail';

const MaterialDetailRoute = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Material Detail</h1>
      <p>This is the Material Detail page.</p>
      {id && <MaterialDetail id={id} />}
    </div>
  );
};

export default MaterialDetailRoute;
