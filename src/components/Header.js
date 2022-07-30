import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { state } = this.props;
    const { user, wallet } = state;
    const { email } = user;
    const ratesValue = wallet.expenses
      .map((element) => parseFloat(element.exchangeRates[element.currency].ask, 0));
    const expensesValue = wallet.expenses.map((element) => parseFloat(element.value));

    const expensesSum = expensesValue
      .reduce((acc, curr, i) => acc + curr * ratesValue[i], 0);

    return (
      <div>
        <span data-testid="email-field">
          {email || ''}
        </span>
        <br />
        <span data-testid="total-field">
          {expensesSum !== 0 ? expensesSum.toFixed(2) : 0}
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state });

Header.propTypes = {
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

export default connect(mapStateToProps)(Header);
