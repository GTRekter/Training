import { render, screen } from '@testing-library/react';
import App from '../App';

test('Renders Welcome to Global Azure 2021', () => {
  render(<App />);
    const linkElement = screen.getByText("Welcome to Global Azure 2021");
  expect(linkElement).toBeInTheDocument();
  expect(screen.getAllByRole('img').length).toBe(2);
});
