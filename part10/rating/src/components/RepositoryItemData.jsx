import { View, StyleSheet } from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  subContainer: {
    margin: 10,
    gap: 5,
    display: 'flex',
    flexDirection: 'column',
  },
});

const RepositoryItemData = ({ item }) => {
  return (
    <View style={styles.container}>
      <Item num={item.stargazersCount} str="Stars" />
      <Item num={item.forksCount} str="Forks" />
      <Item num={item.reviewCount} str="Reviews" />
      <Item num={item.ratingAverage} str="Rating" />
    </View>
  );
};

const Item = ({ num, str }) => {
  const formatNumber = (num) => {
    if (num < 1000) {
      return num.toString();
    }
    return (num / 1000).toFixed(1) + 'k';
  };

  return (
    <View style={styles.subContainer}>
      <Text fontWeight="bold">{formatNumber(num)}</Text>
      <Text color="textSecondary">{str}</Text>
    </View>
  );
};

export default RepositoryItemData;
