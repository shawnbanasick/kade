import React from "react";
import styled from "styled-components";
import store from "../../../store";

const handleChange = e => {
  const projectName = e.target.value;
  let hasAddedProjectName = false;
  if (projectName.length > 0) {
    hasAddedProjectName = true;
  }
  store.setState({
    hasAddedProjectName,
    projectName: e.target.value,
    projectHistoryArray: [`${e.target.value} data loaded from CSV file`]
  });
};

const ProjectNameInput = () => (
  <Input
    onChange={e => handleChange(e)}
    label="Project Name:"
    placeholder="Input Project Name"
  />
);

export default ProjectNameInput;

const Input = styled.input`
  font-size: 20px;
  height: 30px;
  width: 250px;
  padding: 0.5em;
  margin: 0.1em;
  color: black;
  background: white;
  border: 1px solid black;
  border-radius: 3px;
`;
