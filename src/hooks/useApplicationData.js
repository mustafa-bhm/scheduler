import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  // to update available spots when deleting or adding new appointment

  const spotsUpdate = (day, days, appointments) => {
    const dayIndex = days.findIndex((daysName) => daysName.name === day);
    const dayObj = days[dayIndex];
    const appoinId = dayObj.appointments;

    let spots = 0;
    for (let id of appoinId) {
      let appointment = appointments[id];
      !appointment.interview && spots++;
    }
    let newDayObj = { ...dayObj, spots };
    let newDayArr = [...days];
    newDayArr[dayIndex] = newDayObj;
    return newDayArr;
  };

  // to combine multiple API calls
  useEffect(() => {
    const urlDays = `http://localhost:8001/api/days`;
    const urlAppoin = `http://localhost:8001/api/appointments`;
    const urlInterv = `http://localhost:8001/api/interviewers`;

    Promise.all([
      axios.get(urlDays),
      axios.get(urlAppoin),
      axios.get(urlInterv),
      //
    ]).then((resp) => {
      setState((prev) => ({
        ...prev,
        days: resp[0].data,
        appointments: resp[1].data,
        interviewers: resp[2].data,
      }));
    });
  }, []);

  //to book new interviws & appointments
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((res) => {
        let daysUpdate = spotsUpdate(state.day, state.days, appointments);
        setState({
          ...state,
          appointments,
          days: daysUpdate,
        });
        console.log(res);
      });
  }

  /// to delete interviews & appointments
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      // interview: { ...interview },
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((res) => {
        let daysUpdate = spotsUpdate(state.day, state.days, appointments);
        setState({
          ...state,
          appointments,
          days: daysUpdate,
        });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
