import React from 'react';
import { render } from '@testing-library/react';
import { LoadButton } from './LoadButton';

describe(LoadButton, () => {
  it('has correct button text', () => {
    const { getByRole } = render(<LoadButton gifs={[]} isDisplayed={true} />);
    const btnText = getByRole('button').textContent;
    expect(btnText).toBe('LOAD MORE');
  });
});