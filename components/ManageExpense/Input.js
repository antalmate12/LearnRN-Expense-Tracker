import { View, Text, TextInput, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

export default function Input({ label, style, textInputConfig, invalid }) {
  return (
    <View style={[style, styles.inputContainer]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          textInputConfig.multiline && styles.inputMultiLine,
          invalid && styles.invalidInput,
        ]}
        {...textInputConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiLine: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
