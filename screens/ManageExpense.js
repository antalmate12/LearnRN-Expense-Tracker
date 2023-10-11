import { View, Text, StyleSheet, Alert } from 'react-native';
import { useContext, useLayoutEffect } from 'react';
import IconButton from '../components/IconButton';
import { GlobalStyles } from '../constants/styles';
import CustomButton from '../components/Button';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

export default function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === expenseId);

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

  function confirmHandler(expenseData) {
    if (isEditing) {
      expensesCtx.updateExpense(expenseId, expenseData);
    } else {
      expensesCtx.addExpense(expenseData);
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Save' : 'Add'}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

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

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
