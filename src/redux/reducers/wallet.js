// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CURRENCY_DATA':
    return ({ ...state, currencies: action.value });
  case 'EXPENSE_DATA':
    return ({ ...state, expenses: [...state.expenses, action.value] });
  case 'DELETE_EXPENSE':
    return ({
      ...state, expenses: state.expenses.filter((expense) => expense !== action.value) });
  default:
    return state;
  }
};

export default wallet;
