import { useMutation } from '@apollo/client/react';

import { CREATE_USER } from '../graphql/mutations';

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const createUser = async ({ username, password }) => {
    const { data, error } = await mutate({
      variables: {
        user: {
          username,
          password,
        },
      },
    });

    return { data, error };
  };

  return [createUser, result];
};

export default useCreateUser;
