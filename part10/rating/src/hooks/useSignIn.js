import { useMutation, useApolloClient } from '@apollo/client/react';

import useAuthStorage from '../hooks/useAuthStorage';
import { AUTHENTICATE_USER } from '../graphql/mutations';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE_USER);

  const signIn = async ({ username, password }) => {
    const { data, error } = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });

    const accessToken = data?.authenticate?.accessToken?.toString();

    if (accessToken) {
      await authStorage.setAccessToken(accessToken);
      await apolloClient.resetStore();
    }

    return { data, error };
  };

  return [signIn, result];
};

export default useSignIn;
