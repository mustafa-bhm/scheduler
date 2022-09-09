export function getAppointmentsForDay(state, day) {
  const arr = [];

  // to verify if day is in the state OBJ
  const dayIsAvailable = state.days.find((daysName) => daysName.name === day);

  // to get the arr of Appointments by appoi.id
  if (dayIsAvailable) {
    const appoinArr = dayIsAvailable.appointments.map(
      (id) => state.appointments[id]
    );

    return appoinArr;
  }
  if (dayIsAvailable === undefined) {
    return arr;
  }
}

export function getInterview(state, interview) {
  if (interview) {
    const student = interview.student;
    const interviewer = { ...state.interviewers[interview.interviewer] };

    return {
      student,
      interviewer,
    };
  }

  if (!interview) return null;
}
