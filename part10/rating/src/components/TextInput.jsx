import { TextInput, View } from 'react-native';

import Text from './Text';

const FormikTextInput = ({ field, placeholder, secureTextEntry, multiline, styles, formik }) => {
  return (
    <>
      <TextInput
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        style={[styles.input, formik.touched[field] && formik.errors[field] && styles.inputError]}
        placeholder={placeholder}
        value={formik.values[field]}
        onChangeText={formik.handleChange(field)}
      />
      {formik.touched[field] && formik.errors[field] && <Text style={styles.error}>{formik.errors[field]}</Text>}
    </>
  );
};

export default FormikTextInput;
