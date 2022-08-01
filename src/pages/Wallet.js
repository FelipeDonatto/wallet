import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const { state: { email } } = this.props;
    const totalSpent = 0;

    return (
      <div>
        <Header email={ email } totalSpent={ totalSpent } />
        <WalletForm />
        <Table />
      </div>);
  }
}

Wallet.propTypes = {
  state: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  state: state.user });

export default connect(mapStateToProps, null)(Wallet);
