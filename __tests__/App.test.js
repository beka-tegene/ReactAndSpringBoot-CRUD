import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../src/App';

test('renders app component', () => {
  render(<App />);

  // Check if the component renders
  const linkElement = screen.getByText(/Student Registration/i);
  expect(linkElement).toBeInTheDocument();
});

test('submits the form', async () => {
  render(<App />);

  // Fill in the form fields
  fireEvent.change(screen.getByLabelText(/Student id/i), { target: { value: '123' } });
  fireEvent.change(screen.getByLabelText(/Student Name/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText(/Student Grade/i), { target: { value: 'A' } });

  // Submit the form
  fireEvent.click(screen.getByText(/Submit/i));

  // Wait for the form submission to complete
  await waitFor(() => {
    // Add assertions for the expected behavior after form submission
    // For example, check if the UI is updated or if a success message is displayed
    // You can use screen queries to check for elements on the screen
  });
});

// Add more tests as needed, such as testing edit and delete functionality
