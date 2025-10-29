import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

import useMe from '../hooks/useMe';
import useSignOut from '../hooks/useSignOut';
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
  const { data } = useMe();
  const [signOut] = useSignOut();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {data?.me && (
          <Link to="/reviews">
            <Text style={styles.text}>Create a review</Text>
          </Link>
        )}
        {data?.me ? (
          <Pressable onPress={signOut}>
            <Text style={styles.text}>Sign out</Text>
          </Pressable>
        ) : (
          <>
            <Link to="/signin">
              <Text style={styles.text}>Sign in</Text>
            </Link>
            <Link to="/signup">
              <Text style={styles.text}>Sign up</Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
