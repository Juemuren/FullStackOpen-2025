import { useState } from 'react';

import useRepositories from '../../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';

const RepositoryList = () => {
  const ORDER_OPTIONS = {
    latest: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
    highest: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
    lowest: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
  };

  const [orderKey, setOrderKey] = useState('latest');
  const order = ORDER_OPTIONS[orderKey];

  const { repositories } = useRepositories(order);

  return <RepositoryListContainer repositories={repositories} orderKey={orderKey} setOrderKey={setOrderKey} />;
};

export default RepositoryList;
