import { View, StyleSheet } from 'react-native';

import RepositoryItemHead from './RepositoryItemHead';
import RepositoryItemData from './RepositoryItemData';
import RepositoryItemLink from './RepositoryItemLink';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
});

const RepositoryItem = ({ item, showLink }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <RepositoryItemHead item={item} />
      <RepositoryItemData item={item} />
      {showLink && <RepositoryItemLink url={item.url} />}
    </View>
  );
};

export default RepositoryItem;
