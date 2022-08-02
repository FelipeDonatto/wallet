// Coloque aqui suas actions
export const userLogin = (email) => ({ type: 'USER_LOGIN', email });
export const walletData = (value) => ({ type: 'WALLET_DATA', value });
export const currencyData = (value) => ({ type: 'CURRENCY_DATA', value });
export const expenseData = (value) => ({ type: 'EXPENSE_DATA', value });
export const deleteExpense = (value) => ({ type: 'DELETE_EXPENSE', value });
export const idToEdit = (value) => ({ type: 'EDIT_ID', value });
export const editExpense = (value) => (
  { type: 'EDIT_EXPENSE', value });
