import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import CheckoutForm from "./CheckoutForm";
import { act } from "react-dom/test-utils";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    // form renders and displays Checkout Form header text
    // render(<Cheorm />); failed as expected
    render(<CheckoutForm />);
    const h2Header = screen.getByText(/checkout form/i);
    expect(h2Header).toBeInTheDocument();
});

test("form shows success message on submit with form details", () => {
    // happy path
    // user can enter all form fields, click button, displays success message
    render(<CheckoutForm />);
    const fnameInput = screen.getByLabelText(/first name/i);
    userEvent.type(fnameInput, 'Dustin');
    expect(fnameInput).toHaveValue('Dustin');

    const lnameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lnameInput, 'Meyers');
    expect(lnameInput).toHaveValue('Meyers');

    const addressInput = screen.getByLabelText(/address/i);
    userEvent.type(addressInput, '505 Ezy St');
    expect(addressInput).toHaveValue('505 Ezy St');

    const cityInput = screen.getByLabelText(/city/i);
    userEvent.type(cityInput, 'New York');
    expect(cityInput).toHaveValue('New York');

    const stateInput = screen.getByLabelText(/state/i);
    userEvent.type(stateInput, 'New York');
    expect(stateInput).toHaveValue('New York');

    const zipInput = screen.getByLabelText(/zip/i);
    userEvent.type(zipInput, '12345');
    expect(zipInput).toHaveValue('12345');
   
    const submitButton = screen.getByRole('button');
    act(() => {
        userEvent.click(submitButton);   
    })
    const successMessage = screen.getByText(/woo-hoo/i);
    // expect(successMessage).not.toBeInTheDocument(); fails as expected
    expect(successMessage).toBeInTheDocument();
});
