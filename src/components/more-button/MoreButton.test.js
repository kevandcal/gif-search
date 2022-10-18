import React from 'react';
import { render } from '@testing-library/react';
import { MoreButton } from './MoreButton';

describe(MoreButton, () => {
  it('has correct button text', () => {
    const { getByRole } = render(<MoreButton gifs={[]} showMoreBtn={true} />);
    const btnText = getByRole('button').textContent;
    expect(btnText).toBe('LOAD MORE');
  });
});