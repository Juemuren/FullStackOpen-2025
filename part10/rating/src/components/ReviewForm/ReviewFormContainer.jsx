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

const ReviewFormContainer = ({ onSubmit }) => {
  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
  };

  const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Repository owner name is required'),
    repositoryName: yup.string().required('Repository name is required'),
    rating: yup.number().integer().min(0).max(100).required('Rating is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <FormikTextInput field="ownerName" placeholder="Repository owner name" formik={formik} styles={styles} />
      <FormikTextInput field="repositoryName" placeholder="Repository name" formik={formik} styles={styles} />
      <FormikTextInput field="rating" placeholder="Rating between 0 and 100" formik={formik} styles={styles} />
      <FormikTextInput field="text" placeholder="Review" multiline={true} formik={formik} styles={styles} />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.text}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export default ReviewFormContainer;
