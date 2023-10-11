import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { GlobalStyles } from '../constants/styles';

export default function LoadingOverlay() {
  return (
    <View style={styles.loadingOverlay}>
      <ActivityIndicator size="large" color={'white'} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
