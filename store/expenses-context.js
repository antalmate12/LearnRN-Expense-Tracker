import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2023-07-01'),
  },
  {
    id: 'e2',
    description: 'Groceries',
    amount: 100.0,
    date: new Date('2023-10-09'),
  },
  {
    id: 'e3',
    description: 'A new TV',
    amount: 799.49,
    date: new Date('2023-08-12'),
  },
  {
    id: 'e4',
    description: 'Car insurance',
    amount: 294.67,
    date: new Date('2023-09-16'),
  },
  {
    id: 'e5',
    description: 'A Book',
    amount: 15.29,
    date: new Date('2023-10-12'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  updateExpense: (id, { description, amount, date }) => {},
  deleteExpense: (id) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = +new Date().toString() + Math.random().toString();
      return [{ ...action.payload.expenseData, id }, ...state];
    case 'UPDATE':
      const expenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
      const updatableExpense = state[expenseIndex];
      const updatedExpense = {
        ...updatableExpense,
        ...action.payload.expenseData,
      };
      const updatedExpenses = [...state];
      updatedExpenses[expenseIndex] = updatedExpense;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload.id);
    default:
      return state;
  }
}

export function ExpensesContextProvider(props) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: { expenseData } });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, expenseData } });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: { id } });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return <ExpensesContext.Provider value={value}>{props.children}</ExpensesContext.Provider>;
}
