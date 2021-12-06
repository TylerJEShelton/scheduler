import React from 'react';

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
} from '@testing-library/react';

import Application from 'components/Application';

afterEach(cleanup);

/* Promises Example*/
xit('defaults to Monday and changes the schedule when a new day is selected', () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText('Monday')).then(() => {
    fireEvent.click(getByText('Tuesday'));
    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });
});

/* async/await Example */
it('defaults to Monday and changes the schedule when a new day is selected', async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText('Monday'));

  fireEvent.click(getByText('Tuesday'));

  expect(getByText('Leopold Silvers')).toBeInTheDocument();
});
