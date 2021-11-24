import { useState, useEffect } from "react";
import axios from "axios";


// API link constants
const daysURL = `api/days`;
const appointmentsURL = `/api/appointments`;
const interviewersURL = `/api/interviewers`;

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day});
  
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(daysURL)),
      Promise.resolve(axios.get(appointmentsURL)),
      Promise.resolve(axios.get(interviewersURL)),
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    });
  }, []);


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`${appointmentsURL}/${id}`, {interview})
    .then(() => {
      setState({
        ...state,
        appointments
      });
    });      
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`${appointmentsURL}/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments
        });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}