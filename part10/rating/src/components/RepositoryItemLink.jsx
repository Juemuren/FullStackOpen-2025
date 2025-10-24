import { Pressable, View, StyleSheet } from 'react-native';
import { openURL } from 'expo-linking';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    borderRadius: 10,
    margin: 10,
    padding: 20,
    backgroundColor: theme.colors.primary,
  },
  text: {
    color: 'white',
    alignSelf: 'center',
  },
});

const RepositoryItemLink = ({ url }) => {
  const onPress = () => openURL(url);

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Text fontSize="subheading" fontWeight="bold" style={styles.text}>
          Open in GitHub
        </Text>
      </View>
    </Pressable>
  );
};

export default RepositoryItemLink;
