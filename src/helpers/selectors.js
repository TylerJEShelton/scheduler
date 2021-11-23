export function getAppointmentsForDay(state, day) {
  const days = state.days;
  let dayID = null;
  let currentDayAppointments = [];
  const appointments = [];

  days.forEach(arrayDay => {
    if (arrayDay.name === day) {
      dayID = arrayDay.id;
    }
  });

  if(days[dayID - 1]) {
    currentDayAppointments = days[dayID - 1].appointments;
  }

  currentDayAppointments.forEach(appointmentID => {
    appointments.push(state.appointments[appointmentID]);
  });
  
  return appointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const updatedInterview = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
  return updatedInterview;
}

export function getInterviewersForDay(state, day) {
  const days = state.days;
  let dayID = null;
  let currentDayInterviewers = [];
  const interviewers = [];

  days.forEach(arrayDay => {
    if (arrayDay.name === day) {
      dayID = arrayDay.id;
    }
  });

  if(days[dayID - 1]) {
    currentDayInterviewers = days[dayID - 1].interviewers;
  }

  currentDayInterviewers.forEach(interviewerID => {
    interviewers.push(state.interviewers[interviewerID]);
  });
  
  return interviewers;
}