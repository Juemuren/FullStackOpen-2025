import { View, StyleSheet } from 'react-native';

import ReviewData from './ReviewData';
import ReviewLink from './ReviewLink';
import ReviewDelete from './ReviewDelete';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    margin: 10,
    backgroundColor: 'white',
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
    gap: 10,
  },
});

const ReviewItem = ({ review, refetch }) => {
  return (
    <View style={styles.container}>
      <ReviewData review={review} />
      <View style={styles.subContainer}>
        <ReviewLink id={review.repository.id} />
        <ReviewDelete id={review.id} refetch={refetch} />
      </View>
    </View>
  );
};

export default ReviewItem;
