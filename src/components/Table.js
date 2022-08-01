import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { state: { wallet: { expenses } } } = this.props;
    const expenseCheck = expenses.length !== 0;
    // const ratesValue = wallet.expenses
    //   .map((element) => parseFloat(element.exchangeRates[element.currency].ask, 0));
    // const expensesValue = wallet.expenses.map((element) => parseFloat(element.value));

    // id:0
    // value:"123"
    // description:"23"
    // currency:"USD"
    // method:"Dinheiro"
    // tag:"Alimentação"

    return (
      <table>
        <tr className="table">
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        <tbody>
          { expenseCheck && expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{parseFloat(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>
                {
                  (parseFloat(expense.exchangeRates[expense.currency].ask)).toFixed(2)
                }

              </td>
              <td>
                {(parseFloat(expense.exchangeRates[expense.currency].ask)
             * parseFloat(expense.value)).toFixed(2)}

              </td>
              <td>Real</td>
              <button
                type="button"
              >
                Editar/Excluir
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  state });

Table.propTypes = {
  state: PropTypes.shape(
    { user: PropTypes.shape(
      {
        email: PropTypes.string,
      },

    ),
    wallet: PropTypes.shape({
      expenses: PropTypes.shape([]),
    }).isRequired },
  ).isRequired,
};
export default connect(mapStateToProps)(Table);
