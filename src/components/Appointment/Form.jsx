import React, { useState } from 'react';

import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

// Returns a form that allows a user to enter a name and select an interviewer from the InterviewerList component.  Once complete, the user can cancel to return to the previous screen or complete and set the appointment
export default function Form(props) {
  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');

  // resets the form information when cancel is clicked
  const reset = () => {
    setStudent('');
    setInterviewer(null);
  };

  // runs the reset function and returns to the previous mode
  const cancel = () => {
    reset();
    props.onCancel();
  };

  const validate = () => {
    if (student === '') {
      setError('Student name cannot be blank');
      return;
    }
    setError('');
    props.onSave(student, interviewer);
  };

  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form autoComplete='off' onSubmit={event => event.preventDefault()}>
          <input
            data-testid='student-name-input'
            className='appointment__create-input text--semi-bold'
            name='name'
            type='text'
            placeholder='Enter Student Name'
            value={student}
            onChange={event => setStudent(event.target.value)}
          />
        </form>
        <section className='appointment__validation'>{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
