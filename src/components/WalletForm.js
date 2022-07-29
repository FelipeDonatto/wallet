import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currencyData } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      didMount: false,
    };
  }

  async componentDidMount() {
    const { dispatchCurrency } = this.props;

    const apiReturn = [];
    await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((finalData) => apiReturn
        .push(Object.entries(finalData)));

    const filteredApiReturn = apiReturn[0]
      .filter((currency) => currency[0] !== 'USDT');

    this.setState(
      { currencies: filteredApiReturn
        .map((currency) => (currency[0] !== 'USDT' ? currency[0] : '')),
      didMount: true },
    );
    const { currencies } = this.state;
    dispatchCurrency(currencies);
  }

  render() {
    const { currencies, didMount } = this.state;
    return (
      <form>
        <input type="number" data-testid="value-input" />
        <input type="text" data-testid="description-input" />
        <select data-testid="currency-input">
          Moeda:
          {didMount && currencies
            .map(
              (currency) => (
                <option key={ currency } value={ currency }>
                  {currency}
                </option>),
            )}
        </select>
        <select data-testid="method-input">
          Método de pagamento
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatchCurrency: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrency: (value) => dispatch(currencyData(value)) });

export default connect(null, mapDispatchToProps)(WalletForm);
