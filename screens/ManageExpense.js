import { View, Text, StyleSheet, Alert } from 'react-native';
import { useContext, useLayoutEffect } from 'react';
import IconButton from '../components/IconButton';
import { GlobalStyles } from '../constants/styles';
import CustomButton from '../components/Button';
import { ExpensesContext } from '../store/expenses-context';

export default function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    Alert.alert('Are you sure?', 'This action cannot be undone.', [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          expensesCtx.deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
      expensesCtx.updateExpense(expenseId, {
        description: 'Test Update',
        date: new Date('2023-10-10'),
        amount: 69,
      });
    } else {
      expensesCtx.addExpense({
        description: 'Test',
        date: new Date('2023-10-10'),
        amount: 100,
      });
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <CustomButton style={{ flex: 1 }} mode={'flat'} onPress={cancelHandler}>
          Cancel
        </CustomButton>

        <CustomButton style={{ flex: 1 }} onPress={confirmHandler}>
          {isEditing ? 'Update' : 'Add'}
        </CustomButton>
      </View>

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon={'trash'}
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
