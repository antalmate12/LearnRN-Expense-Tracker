import axios from 'axios';

const rootUrl = 'https://learn-react-native-udemy-default-rtdb.europe-west1.firebasedatabase.app/';

export async function storeExpense(expenseData) {
  const res = await axios.post(`${rootUrl}expenses.json`, expenseData);
  return res.data.name;
}

export async function fetchExpenses() {
  const res = await axios.get(`${rootUrl}expenses.json`);
  const expenses = [];

  console.log(res.data);

  for (const key in res.data) {
    expenses.push({
      id: key,
      amount: res.data[key].amount,
      date: new Date(res.data[key].date),
      description: res.data[key].description,
    });
  }

  console.log(expenses);

  return expenses;
}

export async function updateExpense(id, expenseData) {
  await axios.put(`${rootUrl}expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id) {
  await axios.delete(`${rootUrl}expenses/${id}.json`);
}
