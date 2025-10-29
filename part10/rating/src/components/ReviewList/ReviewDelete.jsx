import { Pressable, View, Alert, StyleSheet } from 'react-native';

import Text from '../Text';
import theme from '../../theme';
import useDeleteReview from '../../hooks/useDeleteReview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    padding: 15,
    backgroundColor: theme.colors.error,
  },
  text: {
    color: 'white',
    alignSelf: 'center',
  },
});

const ReviewDelete = ({ id, refetch }) => {
  const [deleteReview] = useDeleteReview();

  const deleteAlert = () =>
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: onDelete,
        },
      ],
      {
        cancelable: true,
      }
    );

  const onDelete = async () => {
    try {
      await deleteReview(id);
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={deleteAlert}>
        <Text fontSize="subheading" fontWeight="bold" style={styles.text}>
          Delete review
        </Text>
      </Pressable>
    </View>
  );
};

export default ReviewDelete;
