// import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { loading, data, refetch, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return { repositories: null, loading, refetch };
  if (error) return { repositories: null, loading, refetch };

  const repositories = data?.repositories || [];

  return { repositories, loading, refetch };
};

export default useRepositories;
