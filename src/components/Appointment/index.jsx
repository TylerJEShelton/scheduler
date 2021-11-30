import React from "react";

import "components/Appointment/styles.scss";

// import custom components
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

// import custom hooks
import useVisualMode from "hooks/useVisualMode";

// global mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

// Returns the appropriate appointment based on the current mode
export default function Appointment(props) {
  // set up the custom hook to track the current mode
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // saves the appointment
  function save(name, interviewer) {
    // if a name wasn't entered or an interviewer wasn't selected, transition to Error Page
    if (!name || !interviewer) {
      transition(ERROR_SAVE);
      return;
    }

    const interview = {
      student: name,
      interviewer
    };
    // show status when saving the appointment
    transition(SAVING);
    // transition to the Show component on a successful save or to the Error component if there is an error while saving
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(error => {
        transition(ERROR_SAVE, true);
      });
  }

  // deletes the appointment
  function deleteAppointment() {
    // show status component when deleting an appointment
    transition(DELETING, true);
    // transition to the Empty component on a successful deletion or to the Error component if there is an error while deleting
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => {
        transition(ERROR_DELETE, true);
      });
  }

  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer ? props.interview.interviewer.id : null}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === ERROR_SAVE && <Error onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error onClose={() => back()} />}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={deleteAppointment}
          onCancel={() => back()}
        />
      )}
    </article>
  );
}