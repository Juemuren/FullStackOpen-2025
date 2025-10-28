import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';

import Text from '../Text';
import useRepository from '../../hooks/useRepository';
import RepositoryInfo from './RepositoryInfo';
import ReviewItem from './ReviewItem';

const SingleRepository = () => {
  let { id } = useParams();
  const { repository, loading } = useRepository(id);

  if (loading) return <Text>Loading...</Text>;

  const reviews = repository?.reviews ? repository.reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default SingleRepository;
