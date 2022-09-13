import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  const interviewers = props.interviewers;
  const listOfInterviewers = interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      // selected={interviewer.id === props.interviewer}
      selected={interviewer.id === props.value}
      // setInterviewer={props.setInterviewer}
      setInterviewer={() => props.onChange(interviewer.id)}
    />
  ));

  //// to validate that interviwers props is an array
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired,
  };
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listOfInterviewers}</ul>
    </section>
  );
}
