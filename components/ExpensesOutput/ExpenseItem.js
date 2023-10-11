import { Pressable, View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../utils/date';
import { useNavigation } from '@react-navigation/native';

export default function ExpenseItem({ expense }) {
  const navigation = useNavigation();

  function expensePressHandler() {
    navigation.navigate('ManageExpense', {
      expenseId: expense.id,
    });
  }

  return (
    <Pressable
      android_ripple={{
        color: GlobalStyles.colors.primary50,
      }}
      style={({ pressed }) => [pressed && styles.pressed]}
      onPress={expensePressHandler}>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{expense.description}</Text>
          <Text style={[styles.textBase]}>{getFormattedDate(expense.date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.amount]}>{expense.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    minWidth: 80,
  },
  amount: {
    fontSize: 16,
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.5,
  },
});
