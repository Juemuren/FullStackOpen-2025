import { View, Pressable, TextInput, Button, StyleSheet } from 'react-native';
import { useFormik } from 'formik';

import Text from './Text';
import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
};

const onSubmit = (values) => {
  console.log(values);
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 20,
    display: 'flex',
    backgroundColor: 'white',
  },
  input: {
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize: theme.fontSizes.body,
  },
  button: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    fontSize: theme.fontSizes.subheading,
  },
});

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.text}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
