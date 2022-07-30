import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currencyData, expenseData } from '../redux/actions';

const Alimentacao = 'Alimentação';
class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      didMount: false,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentacao,
      id: 0,
    };
  }

  async componentDidMount() {
    const { dispatchCurrency } = this.props;

    await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((finalData) => this.setState({
        currencies: finalData,
        didMount: true,
      }));

    const { currencies } = this.state;
    const currenciesStr = Object.keys(currencies).filter((data) => data !== 'USDT');
    dispatchCurrency(currenciesStr);
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const {
      currencies, value, description, currency, method, tag, id,
    } = this.state;
    const { dispatchExpense } = this.props;
    fetch('https://economia.awesomeapi.com.br/json/all');
    dispatchExpense(
      {
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: currencies,
      },
    );
    this.setState((prev) => ({ value: '',
      description: '',
      id: prev.id + 1,
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentacao }));
  }

  render() {
    const {
      currencies, didMount, value, description, currency, method, tag,
    } = this.state;

    return (
      <form onChange={ this.handleChange }>
        <input value={ value } name="value" type="number" data-testid="value-input" />
        <input
          value={ description }
          name="description"
          type="text"
          data-testid="description-input"
        />
        <select value={ currency } name="currency" data-testid="currency-input">
          Moeda:
          {didMount && Object.keys(currencies).filter((data) => data !== 'USDT')
            .map(
              (currencyValue) => (
                <option key={ currencyValue } value={ currencyValue }>
                  {currencyValue}
                </option>),
            )}
        </select>
        <select value={ method } name="method" data-testid="method-input">
          Método de pagamento
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select value={ tag } name="tag" data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatchCurrency: PropTypes.func.isRequired,
  dispatchExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrency: (value) => dispatch(currencyData(value)),
  dispatchExpense: (value) => dispatch(expenseData(value)),
});

export default connect(null, mapDispatchToProps)(WalletForm);
