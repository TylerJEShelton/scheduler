import React from 'react';

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  prettyDOM,
  getByDisplayValue,
} from '@testing-library/react';

/* somewhere near the top */
import axios from 'axios';

import Application from 'components/Application';

afterEach(cleanup);

describe('Application', () => {
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

  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    // get all appointment articles
    const appointments = getAllByTestId(container, 'appointment');
    // grab the first appointment article which happens to be an empty appointment from the mock data
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, 'Add'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' },
    });
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, 'SAVING')).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));

    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    );

    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });

  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'));

    // 3. Click the "Delete" button on the booked appointment.
    // get all appointment articles
    const appointments = getAllByTestId(container, 'appointment');
    // grab the appointment article that contains the text "Archie Cohen" from the mock data
    const appointment = appointments.find(appt =>
      queryByText(appt, 'Archie Cohen')
    );

    // click the delete button on the booked appointment
    fireEvent.click(getByAltText(appointment, 'Delete'));

    // 4. Check that the confirmation message is shown.
    await waitForElement(() =>
      getByText(appointment, /are you sure you would like to delete/i)
    );

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, 'Confirm'));

    // 6. Check that the element with the text "DELETING" is displayed.
    expect(getByText(appointment, 'DELETING')).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, 'Add'));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    );

    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });

  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'));

    // 3. Click the "Edit" button on the booked appointment.
    // get all appointment articles
    const appointments = getAllByTestId(container, 'appointment');
    // grab the appointment article that contains the text "Archie Cohen" from the mock data
    const appointment = appointments.find(appt =>
      queryByText(appt, 'Archie Cohen')
    );

    // click the edit button on the booked appointment
    fireEvent.click(getByAltText(appointment, 'Edit'));

    // 4. Check that the edit appointment screen appears with "Archie Cohen" in the input field
    await waitForElement(() => getByDisplayValue(appointment, 'Archie Cohen'));

    // 5. Change the name in the input field
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Theo Smith' },
    });

    // 6. Click on "Sylvia Palmer" to change the interviewer
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    // 7. Check to see that "Sylvia Palmer" is now displayed which means the click was successful
    expect(getByText(appointment, 'Sylvia Palmer')).toBeInTheDocument();

    // 8. Click the "Save" button on the confirmation.
    fireEvent.click(getByText(appointment, 'Save'));

    // 9. Check that the element with the text "SAVING" is displayed.
    expect(getByText(appointment, 'SAVING')).toBeInTheDocument();

    // 10. Wait until "Theo Smith" is displayed.
    await waitForElement(() => getByText(appointment, 'Theo Smith'));

    // 11. Check to see if "Sylvia Palmer is displayed"
    expect(getByText(appointment, 'Sylvia Palmer')).toBeInTheDocument();

    // 12. Check that the DayListItem with the text "Monday" still has the text "1 spot remaining".
    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    );

    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  /* test number five */
  it('shows the save error when failing to save an appointment', async () => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    // get all appointment articles
    const appointments = getAllByTestId(container, 'appointment');
    // grab the first appointment article which happens to be an empty appointment from the mock data
    const appointment = appointments[0];

    // Click the add appointment button
    fireEvent.click(getByAltText(appointment, 'Add'));

    // Verify that the form component has been displayed and enter the name "Theo Smith" as the student
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Theo Smith' },
    });

    // Click on Sylvia Palmer to add her as the interviewer
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    // Click the Save button
    fireEvent.click(getByText(appointment, 'Save'));

    // Check to see that the "SAVING" is displayed
    expect(getByText(appointment, 'SAVING')).toBeInTheDocument();

    // Wait to see if it transitions to the Error page by finding "Error" on the page
    await waitForElement(() => getByText(appointment, 'Error'));

    // Click the "Close" button
    fireEvent.click(getByAltText(appointment, 'Close'));

    // Check to see that the user returns to the form screen
    expect(getByPlaceholderText(appointment, /enter student name/i));

    // Verify that the input field is empty
    expect(getByDisplayValue(appointment, ''));

    // Verify that "Sylvia Palmer" is not selected and not in the DOM.
    expect(queryByText(appointment, 'Sylvia Palmer')).not.toBeInTheDocument();
  });

  it('shows the delete error when failing to delete an appointment', async () => {
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'));

    // 3. Click the "Delete" button on the booked appointment.
    // get all appointment articles
    const appointments = getAllByTestId(container, 'appointment');
    // grab the appointment article that contains the text "Archie Cohen" from the mock data
    const appointment = appointments.find(appt =>
      queryByText(appt, 'Archie Cohen')
    );

    // click the delete button on the booked appointment
    fireEvent.click(getByAltText(appointment, 'Delete'));

    // 4. Check that the confirmation message is shown.
    await waitForElement(() =>
      getByText(appointment, /are you sure you would like to delete/i)
    );

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, 'Confirm'));

    // 6. Check that the element with the text "DELETING" is displayed.
    expect(getByText(appointment, 'DELETING')).toBeInTheDocument();

    // 7. Wait to see if it transitions to the Error page by finding "Error" on the page
    await waitForElement(() => getByText(appointment, 'Error'));

    // 8. Click the "Close" button
    fireEvent.click(getByAltText(appointment, 'Close'));

    // 9. Check to verify that "Archie Cohen" is found and that appointment isn't deleted
    expect(getByText(appointment, 'Archie Cohen'));

    // 10. Check that the DayListItem with the text "Monday" still has the text "1 spot remaining".
    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    );

    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });
});
