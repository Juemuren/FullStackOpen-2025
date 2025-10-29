import { useQuery } from '@apollo/client/react';

import { GET_ME } from '../graphql/queries';

const useMe = (includeReviews = false) => {
  const { loading, data, refetch } = useQuery(GET_ME, {
    variables: {
      includeReviews,
    },
    fetchPolicy: 'cache-and-network',
  });

  return { data, loading, refetch };
};

export default useMe;
