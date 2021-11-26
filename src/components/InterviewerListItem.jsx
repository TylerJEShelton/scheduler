import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

// Returns the interviewers avatar and if the interviewer is selected, it also displays their name
export default function InterviewerListItem (props) {
  let interviewerListItemClass = classNames("interviewers__item", {"interviewers__item--selected": props.selected})

  return (
    <li className={interviewerListItemClass} onClick={props.setInterviewer}>
      <img 
        className={"interviewers__item-image"}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}