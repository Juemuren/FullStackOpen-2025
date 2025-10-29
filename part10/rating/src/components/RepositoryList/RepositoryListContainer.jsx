import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from '../RepositoryItem';

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    height: 75,
    margin: 5,
  },
  separator: {
    height: 10,
  },
});

const RepositoryItemPressable = ({ item }) => {
  const navi = useNavigate();
  const onPress = () => navi(`/repositories/${item.id}`);

  return (
    <Pressable onPress={onPress}>
      <RepositoryItem item={item} />
    </Pressable>
  );
};

const PickerOrder = ({ orderKey, setOrderKey }) => {
  return (
    <Picker
      prompt="Select a sorting method"
      style={styles.pickerContainer}
      selectedValue={orderKey}
      onValueChange={(newKey) => {
        setOrderKey(newKey);
      }}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
};

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
