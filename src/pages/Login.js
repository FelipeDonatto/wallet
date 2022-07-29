import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      disableBtn: true,
      usrMail: '',
    };
  }

  handleClick() {
    const { usrMail } = this.state;
    const { history, user } = this.props;

    user(usrMail);
    history.push('/carteira');
  }

  handleChange({ target }) {
    const numCheck = 6;
    const targetLength = target.value.length;
    const { usrMail } = this.state;
    const testMail = /\S+@\S+\.\S+/.test(usrMail);
    // https://bobbyhadz.com/blog/react-check-if-email-is-valid#:~:text=To%20validate%20an%20email%20in,is%20valid%20and%20false%20otherwise.&text=Copied!
    // validação feita com a ajuda desde site ^

    if (target.type === 'email') {
      this.setState({
        usrMail: target.value,
      });
    }
    if (target.type === 'password' && targetLength >= numCheck && testMail) {
      this.setState({
        disableBtn: false,
      });
    }
    if (target.type === 'password' && targetLength < numCheck) {
      this.setState({
        disableBtn: true,
      });
    }
  }

  render() {
    const { disableBtn, usrMail } = this.state;

    return (
      <form>
        <h1>Login</h1>
        <input
          type="email"
          data-testid="email-input"
          value={ usrMail }
          onChange={ (event) => this.handleChange(event) }
        />
        <br />
        <input
          type="password"
          data-testid="password-input"
          onChange={ (event) => this.handleChange(event) }
        />
        <br />
        <button
          type="button"
          value="Entrar"
          onClick={ () => this.handleClick() }
          disabled={ disableBtn }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  user: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  user: (email) => dispatch(userLogin(email)) });

export default connect(null, mapDispatchToProps)(Login);
