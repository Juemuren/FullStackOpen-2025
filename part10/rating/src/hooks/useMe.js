import { useQuery } from '@apollo/client/react';

import { GET_ME } from '../graphql/queries';

const useMe = () => {
  const { loading, data, refetch } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
  });

  return { data, loading, refetch };
};

export default useMe;
