import {render, screen} from '@testing-library/react';
import Register from './Register';

describe('Register Page', () => {
  test('should match the snapshot', () => {
    const { container } = render(<Register />);
    expect(container.firstChild).toMatchSnapshot();
  })
})