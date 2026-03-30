import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome screen', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /welcome/i });
  expect(heading).toBeInTheDocument();
  const startButton = screen.getByRole('button', { name: /start here/i });
  expect(startButton).toBeInTheDocument();
});
