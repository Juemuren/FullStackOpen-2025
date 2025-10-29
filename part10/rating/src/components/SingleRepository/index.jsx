import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';

import useRepository from '../../hooks/useRepository';
import RepositoryInfo from './RepositoryInfo';
import ReviewItem from './ReviewItem';

const SingleRepository = () => {
  const { id } = useParams();

  const { repository, fetchMore } = useRepository({
    first: 6,
    repositoryId: id,
  });

  const reviews = repository?.reviews ? repository.reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
