import { View, Image, StyleSheet } from 'react-native';

import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  subContainer: {
    margin: 10,
    gap: 5,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
    margin: 10,
  },
  language: {
    borderRadius: 5,
    padding: 5,
    backgroundColor: theme.colors.primary,
    color: 'white',
  },
});

const RepositoryItemHead = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{
          uri: item.ownerAvatarUrl,
        }}
      />
      <View style={styles.subContainer}>
        <Text fontWeight="bold">{item.fullName}</Text>
        <Text color="textSecondary">{item.description}</Text>
        <Text style={styles.language}>{item.language}</Text>
      </View>
    </View>
  );
};

export default RepositoryItemHead;
