import { View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';

import Text from './Text';
import RepositoryItemHead from './RepositoryItemHead';
import RepositoryItemData from './RepositoryItemData';
import RepositoryItemLink from './RepositoryItemLink';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
});

const RepositoryItem = ({ item, single }) => {
  let data;
  if (single === true) {
    let { id } = useParams();
    const { repo, loading } = useRepository(id);

    if (loading) return <Text>Loading...</Text>;

    data = repo;
  } else {
    data = item;
  }

  return (
    <View testID="repositoryItem" style={styles.container}>
      <RepositoryItemHead item={data} />
      <RepositoryItemData item={data} />
      {single && <RepositoryItemLink url={data.url} />}
    </View>
  );
};

export default RepositoryItem;
