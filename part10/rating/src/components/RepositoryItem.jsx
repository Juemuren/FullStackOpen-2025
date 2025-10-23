import { View, StyleSheet } from 'react-native';

import RepositoryItemHead from './RepositoryItemHead';
import RepositoryItemData from './RepositoryItemData';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <RepositoryItemHead item={item} />
      <RepositoryItemData item={item} />
    </View>
  );
};

export default RepositoryItem;
