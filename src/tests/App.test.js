import { render, screen } from '@testing-library/react';
import App from '../App.js';

describe('Test routes', () => {
    beforeEach(() => {
        const currentState = window.history.state;

        window.history.replaceState(currentState, '', '/');
    });

    it('Should render login page', async () => {
        window.history.pushState({}, 'Login page', '/login')

        render(<App/>)

        const loginPage = screen.getByTestId('login-test-id');

        expect(loginPage).toBeInTheDocument();
    });
});