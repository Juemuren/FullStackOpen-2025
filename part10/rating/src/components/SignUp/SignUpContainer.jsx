import { View, Pressable, StyleSheet } from 'react-native';

import { useFormik } from 'formik';
import * as yup from 'yup';

import Text from '../Text';
import FormikTextInput from '../TextInput';
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

const SignUpContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  const validationSchema = yup.object().shape({
    username: yup.string().min(5).max(30).required('Username is required'),
    password: yup.string().min(5).max(50).required('Password is required'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], "Password don't match")
      .required('Password confirmation is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <FormikTextInput field="username" placeholder="Username" formik={formik} styles={styles} />
      <FormikTextInput secureTextEntry={true} field="password" placeholder="Password" formik={formik} styles={styles} />
      <FormikTextInput
        secureTextEntry={true}
        field="passwordConfirmation"
        placeholder="Password confirmation"
        formik={formik}
        styles={styles}
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.text}>Sign up</Text>
      </Pressable>
    </View>
  );
};

export default SignUpContainer;
