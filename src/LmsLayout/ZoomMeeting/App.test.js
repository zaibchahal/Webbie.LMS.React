import { render, screen } from '@testing-library/react';
import ZoomMeeting from './ZoomMeeting';

test('renders learn react link', () => {
  render(<ZoomMeeting />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
