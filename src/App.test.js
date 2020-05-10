import React from 'react';
import { render, fireEvent, getByLabelText } from '@testing-library/react';
import App from './App';
import Transaction from './components/Transaction/Transaction';

test('renderoi sivulle tekstin Wallet', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/Wallet/i);
  expect(headerElement).toBeInTheDocument();
});


