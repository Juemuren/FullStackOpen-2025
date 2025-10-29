import { Pressable, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';

import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    padding: 15,
    backgroundColor: theme.colors.primary,
  },
  text: {
    color: 'white',
    alignSelf: 'center',
  },
});

const ReviewLink = ({ id }) => {
  const navi = useNavigate();
  const onPress = () => navi(`/repositories/${id}`);

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Text fontSize="subheading" fontWeight="bold" style={styles.text}>
          View repository
        </Text>
      </Pressable>
    </View>
  );
};

export default ReviewLink;
