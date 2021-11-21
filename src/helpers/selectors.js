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