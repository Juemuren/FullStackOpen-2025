import { Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

import RepositoryItem from '../RepositoryItem';

const RepositoryItemPressable = ({ item }) => {
  const navi = useNavigate();
  const onPress = () => navi(`/repositories/${item.id}`);

  return (
    <Pressable onPress={onPress}>
      <RepositoryItem item={item} />
    </Pressable>
  );
};

export default RepositoryItemPressable;
