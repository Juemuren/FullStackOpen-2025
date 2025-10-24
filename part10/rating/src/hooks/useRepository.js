import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { data, loading, refetch, error } = useQuery(GET_REPOSITORY, {
    variables: {
      repositoryId: id,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return { repo: null, loading, refetch };
  if (error) return { repositories: null, loading, refetch };

  const repo = data?.repository;

  return { repo, loading, refetch };
};

export default useRepository;
