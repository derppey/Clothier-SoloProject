import {render, screen} from '@testing-library/react';
import LoginPage from './LoginPage';

import { BrowserRouter as Router } from 'react-router-dom';


describe('Login Page', () => {
  test('should match the snapshot', () => {
    const { container } = render(<Router><LoginPage /></Router>);
    expect(container.firstChild).toMatchSnapshot();
  })

  test('should have correct title', () => {
    render(<Router><LoginPage /></Router>);
    screen.getByText(/Welcome to Clothier!/);
    screen.getByText(/New to Clothier?/);
  })
})