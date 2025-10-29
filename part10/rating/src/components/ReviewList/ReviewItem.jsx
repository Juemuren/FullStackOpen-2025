import { View, StyleSheet } from 'react-native';

import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  subContiner: {
    margin: 10,
    gap: 5,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  rating: {
    marginTop: 10,
    marginLeft: 10,
    width: 50,
    height: 50,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: '50%',
  },
});

const ReviewItem = ({ review }) => {
  const handleDate = (date) => {
    const [year, month, day] = date.split('T')[0].split('-');
    return `${day}.${month}.${year}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text color="primary" fontSize="subheading">
          {review.rating}
        </Text>
      </View>
      <View style={styles.subContiner}>
        <Text fontWeight="bold" fontSize="subheading">
          {review.repository.fullName}
        </Text>
        <Text color="textSecondary">{handleDate(review.createdAt)}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
