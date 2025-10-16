import { View, StyleSheet, Text } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
  },
  text: {
    margin: 10,
    color: 'white',
    fontSize: theme.fontSizes.subheading,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Link to="/">
        <Text style={styles.text}>Repositories</Text>
      </Link>
      <Link to="/sign">
        <Text style={styles.text}>Sign in</Text>
      </Link>
    </View>
  );
};

export default AppBar;
