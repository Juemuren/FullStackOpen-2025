import { useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';

import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const navi = useNavigate();

  const createReview = async ({ ownerName, rating, repositoryName, text }) => {
    const { data, error } = await mutate({
      variables: {
        review: {
          ownerName,
          rating,
          repositoryName,
          text,
        },
      },
    });

    const repositoryId = data?.createReview?.repositoryId;

    navi(`/repositories/${repositoryId}`);

    return { data, error };
  };

  return [createReview, result];
};

export default useCreateReview;
