import { FlatList } from 'react-native';

import useMe from '../../hooks/useMe';
import ReviewItem from './ReviewItem';

const ReviewList = () => {
  const { data, refetch } = useMe(true);

  const reviews = data?.me?.reviews?.edges?.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default ReviewList;
