import { useMutation } from '@apollo/client/react';

import { AUTHENTICATE_USER } from '../graphql/mutations';

const useSignIn = () => {
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

    return { data, error };
  };

  return [signIn, result];
};

export default useSignIn;
