import React from "react";

// Return the students and interviewers name from props and when it is hovered the edit and delete buttons are shown
export default function Show(props) {
  return(
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{props.student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{props.interviewer ? props.interviewer.name : null}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            onClick={props.onEdit}
            src="images/edit.png"
            alt="Edit"
          />
          <img
            className="appointment__actions-button"
            onClick={props.onDelete}
            src="images/trash.png"
            alt="Delete"
          />
        </section>
      </section>
    </main>
  );
}