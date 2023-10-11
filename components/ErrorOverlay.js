import { View, Text, StyleSheet, Button } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import CustomButton from './Button';

export default function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.overlay}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <CustomButton onPress={onConfirm}>Okay</CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
