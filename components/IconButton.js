import { Ionicons } from '@expo/vector-icons';
import { Pressable, View, StyleSheet } from 'react-native';

export default function IconButton({ icon, onPress, color, size }) {
  return (
    <Pressable
      android_ripple={{
        color,
      }}
      onPress={onPress}
      style={({ pressed }) => [styles.buttonContainer, pressed && styles.buttonPressed]}>
      <View>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
