import { FlatList, View, StyleSheet } from 'react-native';

import PickerOrder from './PickerOrder';
import RepositoryItemPressable from './RepositoryItemPressable';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const RepositoryListContainer = ({ repositories, orderKey, setOrderKey }) => {
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => <RepositoryItemPressable item={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <PickerOrder orderKey={orderKey} setOrderKey={setOrderKey} />}
    />
  );
};

export default RepositoryListContainer;
