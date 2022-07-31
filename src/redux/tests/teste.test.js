import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Login from '../../pages/Login';
import { renderWithRouterAndRedux } from '../../tests/helpers/renderWith';
import App from '../../App';
import WalletForm from '../../components/WalletForm';

describe('', () => {
  it('', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    expect(history.location.pathname).toBe('/');
  });
  it('', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(emailInput, 'teste');
    userEvent.type(passwordInput, 'teste');
    expect(enterBtn).toBeDisabled();
    userEvent.type(emailInput, 'teste@232');
    userEvent.type(passwordInput, 'teste232323');
    expect(enterBtn).toBeDisabled();
    userEvent.type(emailInput, 'teste@email.com');
    userEvent.type(passwordInput, 'senhaincrivel');
    expect(enterBtn).not.toBeDisabled();
    expect(history.location.pathname).toBe('/');
    userEvent.click(enterBtn);
    // por algum motivo o pathname nao atualiza quando vai pro wallet ¯\_(ツ)_/¯
    expect(screen.getByText(/teste@email\.com/i)).toBeInTheDocument();
  });
  it('', () => {
    renderWithRouterAndRedux(<WalletForm />);
    expect(screen.getByTestId('value-input')).toBeInTheDocument();
    expect(screen.getByTestId('description-input')).toBeInTheDocument();
    expect(screen.getByTestId('currency-input')).toBeInTheDocument();
    expect(screen.getByTestId('method-input')).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
  });
});
