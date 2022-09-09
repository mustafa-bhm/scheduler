import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import { useVisualMode } from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* {props.interview && ( */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          // interviewer={props.interview.interviewer}
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {/* {!props.interview && <Empty />} */}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={() => console.log("clicked onSave")}
          onCancel={() => back()}
        />
      )}
    </article>
  );
}
