import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import { useVisualMode } from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

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
          // onSave={() => console.log("clicked onSave")}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status message={SAVING} />}
    </article>
  );
}
