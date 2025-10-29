import useCreateReview from '../../hooks/useCreateReview';
import ReviewFormContainer from './ReviewFormContainer';

const ReviewForm = () => {
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await createReview({ ownerName, repositoryName, rating: Number(rating), text });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
