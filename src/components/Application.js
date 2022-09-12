import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

import "components/Application.scss";

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  // const [appointments, setAppointments] = useState({});

  // to combine states for day, days & appointements
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });
  // const setDays = (days) => {
  //   setState((prev) => ({ ...prev, days }));
  // };

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
      // console.log(resp[0].data);
      // console.log("----", resp[1].data);
      // console.log("--++--", resp[2].data[1]);
      setState((prev) => ({
        ...prev,
        days: resp[0].data,
        appointments: resp[1].data,
        interviewers: resp[2].data,
      }));
    });
  }, []);

  // to get appointments for day from selector
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  console.log("++++", interviewers);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      setState({
        ...state,
        appointments,
      });
      console.log(res);
    });
  }
  // console.log("stateee", state);
  // console.log("stateee.day", state.day);
  // console.log("dailyyyyy", dailyAppointments); /// getting empty array !!!

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        // {...appointment}
        // or //
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        // interview={appointment.interview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          {/* <DayList days={days} value={day} onChange={setDay} /> used with old state methode */}
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{schedule}</section>
    </main>
  );
}
