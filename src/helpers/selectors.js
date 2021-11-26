// return an array of appointments for all of the appointments on the selected day
export function getAppointmentsForDay(state, day) {
  const days = state.days;
  let dayID = null;
  let currentDayAppointments = [];
  const appointments = [];

  // loop through the days array to find the day id that matches the passed in day
  days.forEach(arrayDay => {
    if (arrayDay.name === day) {
      dayID = arrayDay.id;
    }
  });

  if(days[dayID - 1]) {
    // if there is a day at the dayID - 1 in the array, assign the appointments on that day to currentDayAppointments
    currentDayAppointments = days[dayID - 1].appointments;
    // loop through those appointment ids and put the appointment object into the appointments array
    currentDayAppointments.forEach(appointmentID => {
      appointments.push(state.appointments[appointmentID]);
    });
  }  
  return appointments;
}

// return an object with the student name and the interviewer object for the specified interview
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  // get the interviewer object based on the interviewer id stored in the interview object
  const updatedInterview = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
  return updatedInterview;
}

// return an array of interviwers that 
export function getInterviewersForDay(state, day) {
  const days = state.days;
  let dayID = null;
  let currentDayInterviewers = [];
  const interviewers = [];

  // loop through the days array to find the day id that matches the passed in day
  days.forEach(arrayDay => {
    if (arrayDay.name === day) {
      dayID = arrayDay.id;
    }
  });

  if(days[dayID - 1]) {
    // if there is a day at the dayID - 1 in the array, assign the interviewer ids on that day to currentDayInterviewers
    currentDayInterviewers = days[dayID - 1].interviewers;
    // loop through those interviewer ids and put the interviewer object into the interviewers array
    currentDayInterviewers.forEach(interviewerID => {
      interviewers.push(state.interviewers[interviewerID]);
    });
  }  
  return interviewers;
}