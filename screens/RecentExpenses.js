import { View, Text } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../utils/date';

export default function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const dateSevenDaysAgo = getDateMinusDays(today, 7);

    return expense.date >= dateSevenDaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expensesPeriod={'Recent'}
      expenses={recentExpenses}
      fallbackText={'No expenses for the last 7 days!'}
    />
  );
}
