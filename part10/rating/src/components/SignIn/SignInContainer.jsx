import { View, Pressable, TextInput, StyleSheet } from 'react-native';

import { useFormik } from 'formik';
import * as yup from 'yup';

import Text from '../Text';
import theme from '../../theme';

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
  inputError: {
    borderColor: theme.colors.error,
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
  error: {
    color: theme.colors.error,
  },
});

const SignInContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, formik.touched.username && formik.errors.username && styles.inputError]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && <Text style={styles.error}>{formik.errors.username}</Text>}
      <TextInput
        secureTextEntry
        style={[styles.input, formik.touched.password && formik.errors.password && styles.inputError]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && <Text style={styles.error}>{formik.errors.password}</Text>}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.text}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignInContainer;
