export function getAppointmentsForDay(state, day) {
  const arr = [];

  // to verify if day is in the state object
  const dayIsAvailable = state.days.find((daysName) => daysName.name === day);

  // to get the arr of Appointments by appointment id
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

////
export function getInterviewersForDay(state, day) {
  const arr = [];

  // to verify if day is in the state OBJ
  const dayIsAvailable = state.days.find((daysName) => daysName.name === day);

  // to get the arr of interviwers by interviewr.id
  if (dayIsAvailable) {
    const interviewersArr = dayIsAvailable.interviewers.map(
      (id) => state.interviewers[id]
    );

    return interviewersArr;
  }
  if (dayIsAvailable === undefined) return arr;
}

////

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
