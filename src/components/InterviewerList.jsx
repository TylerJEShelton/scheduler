import React from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

// Returns an InterviewerListItem component for each interviewer in the props.interviewers array
export default function InterviewerList (props) {
  const displayInterviewers = props.interviewers.map((interviewer) => {
    return(
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  })
  
  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {displayInterviewers}  
      </ul> 
    </section>
  );
}