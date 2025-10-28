import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { data, loading, refetch, error } = useQuery(GET_REPOSITORY, {
    variables: {
      repositoryId: id,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return { repository: null, loading, refetch };
  if (error) return { repository: null, loading, refetch };

  const repository = data?.repository;

  return { repository, loading, refetch };
};

export default useRepository;
