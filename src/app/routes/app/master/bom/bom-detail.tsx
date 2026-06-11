import { useParams } from 'react-router';

import BomDetail from '@/features/master/bom/components/bom-detail';

const BomDetailRoute = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>BOM Detail</h1>
      <p>This is the BOM Detail page.</p>
      {id && <BomDetail id={id} />}
    </div>
  );
};

export default BomDetailRoute;
