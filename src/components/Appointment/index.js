import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import { useVisualMode } from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  function deleteInterview(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(DELETE);

    props.cancelInterview(props.id, interview).then(() => transition(EMPTY));
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          // interviewer={props.interview.interviewer}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {/* {!props.interview && <Empty />} */}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}

      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETE && <Status message={DELETE} />}
      {mode === CONFIRM && (
        <Confirm onConfirm={deleteInterview} onCancel={back} message={DELETE} />
      )}
    </article>
  );
}
