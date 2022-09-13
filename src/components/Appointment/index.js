import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import { useVisualMode } from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    // props.bookInterview(props.id, interview).then(() => transition(SHOW));
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function deleteInterview(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(DELETE);

    props
      .cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
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
          onEdit={() => transition(EDIT)}
        />
      )}
      {/* {!props.interview && <Empty />} */}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}

      {mode === SAVING && <Status message={SAVING} />}
      {mode === ERROR_SAVE && (
        <Error
          message="Appointment can't be saved ! Please try later "
          // onClose={() => (SAVING ? transition(EMPTY) : { back })}
          onClose={back}
        />
      )}
      {mode === DELETE && <Status message={DELETE} />}
      {mode === ERROR_DELETE && (
        <Error
          message="Appointment can't be deleted ! Please try later "
          // onClose={() => (DELETE ? transition(SHOW) : { back })}
          onClose={back}
        />
      )}
      {mode === CONFIRM && (
        <Confirm onConfirm={deleteInterview} onCancel={back} message={DELETE} />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
    </article>
  );
}
