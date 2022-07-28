import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Header extends Component {
  render() {
    const { email, totalSpent } = this.props;
    return (
      <div>
        <span data-testid="email-field">
          {email || ''}
        </span>
        <br />
        <span data-testid="total-field">
          {totalSpent }
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </div>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalSpent: PropTypes.number.isRequired,
};
