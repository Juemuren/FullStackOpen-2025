import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    height: 75,
    margin: 5,
  },
});

const PickerOrder = ({ orderKey, setOrderKey }) => {
  return (
    <Picker
      prompt="Select a sorting method"
      style={styles.pickerContainer}
      selectedValue={orderKey}
      onValueChange={(newKey) => {
        setOrderKey(newKey);
      }}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
};

export default PickerOrder;
