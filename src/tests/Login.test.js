import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App.js';

describe('Test login page', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({})
        }))
    })

    it('should get email value', async () => {
        render(<App />);
        const emailInput = screen.getByTestId('email-id');

        fireEvent.change(emailInput, { target: {
            value: 'userTest@gmail.com'
        }});

        expect(emailInput).toHaveValue('userTest@gmail.com');
    });

    it('should get password value', async () => {
        render(<App />);
        const passwordInput = screen.getByTestId('password-id');

        fireEvent.change(passwordInput, { target: {
            value: 'password123'
        }});

        expect(passwordInput).toHaveValue('password123');
    });
});