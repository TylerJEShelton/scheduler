import { useState, useEffect } from 'react';
import axios from 'axios';

// API link constants
const daysURL = `/api/days`;
const appointmentsURL = `/api/appointments`;
const interviewersURL = `/api/interviewers`;

export default function useApplicationData() {
  // declare state with initial values
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  // set the currently selected date in the sidebar
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    // pull all of the API data and update state with the newly requested data
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // records the newly created or edited appointment in the API
  function bookInterview(id, interview) {
    let spots = 0;
    let dayID = 0;
    let appointmentIDs = [];

    // create an appointment variable at the passed in id with the passed in interview data
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    // create a new appointments variable that replaces the appointment at the passed in id
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`${appointmentsURL}/${id}`, { interview }).then(() => {
      // after successfully updating the interview information for the specific id in the API, need to update the local state with the new information.

      for (const day of state.days) {
        // loop through days in state to find the day.id and array of appointments for the day that contains the specified appointment id
        if (day.appointments.includes(id)) {
          dayID = day.id;
          appointmentIDs = day.appointments;
        }
      }
      // loop through the array of appointment ids and add up the spots available for appointments with no interview information
      appointmentIDs.forEach(appointmentID => {
        if (!appointments[appointmentID].interview) {
          spots++;
        }
      });
      // store the new spots remaining information in the day variable and a state.days information in the days variable
      const day = { ...state.days[dayID - 1], spots: spots };
      const days = [...state.days];
      // for the day with the specified id, update the day with the newly created day information
      days[dayID - 1] = day;
      // set the state with the new appointments and days information
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  // deletes the specified appointment
  function cancelInterview(id) {
    let spots = 0;
    let dayID = 0;
    let appointmentIDs = [];

    // create an appointment variable at the passed in id with null interview data
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    // create a new appointments variable that replaces the appointment at the passed in id
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`${appointmentsURL}/${id}`).then(() => {
      // after successfully deleting the interview information for the specific id in the API, need to update the local state with the new information.

      for (const day of state.days) {
        // loop through days in state to find the day.id and array of appointments for the day that contains the specified appointment id
        if (day.appointments.includes(id)) {
          dayID = day.id;
          appointmentIDs = day.appointments;
        }
      }
      // loop through the array of appointment ids and add up the spots available for appointments with no interview information
      appointmentIDs.forEach(appointmentID => {
        if (!appointments[appointmentID].interview) {
          spots++;
        }
      });
      // store the new spots remaining information in the day variable and a state.days information in the days variable
      const day = { ...state.days[dayID - 1], spots: spots };
      const days = [...state.days];
      // for the day with the specified id, update the day with the newly created day information
      days[dayID - 1] = day;
      // set the state with the new appointments and days information
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
