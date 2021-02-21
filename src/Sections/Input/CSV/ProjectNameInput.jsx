import React from "react";
import styled from "styled-components";
import { view, store } from "react-easy-state";
import coreState from "../../GlobalState/coreState";
import inputState from "../../GlobalState/inputState";
import projectHistoryState from "../../GlobalState/projectHistoryState";
import { useTranslation } from "react-i18next";

const localStore = store({ projectName: "" });

const handleChange = e => {
  const projectName = e.target.value;
  let hasAddedProjectName = false;
  if (projectName.length > 0) {
    hasAddedProjectName = true;
  }

  localStore.projectName = projectName;
  inputState.hasAddedProjectName = hasAddedProjectName;
  coreState.projectName = e.target.value;

  const logMessageObj1 = {
    logMessage: `${e.target.value} data loaded from CSV file`,
    logType: "csvInput"
  };

  projectHistoryState.projectHistoryArray = [logMessageObj1];
};

const ProjectNameInput = () => {
  const { t } = useTranslation();

  return (
    <Input
      onChange={e => handleChange(e)}
      label="Project Name:"
      placeholder={t("Input Project Name")}
      value={localStore.projectName}
    />
  );
};

export default view(ProjectNameInput);

const Input = styled.input`
  font-size: 20px;
  height: 30px;
  width: 325px;
  padding: 0.5em;
  margin: 3px;
  color: black;
  background: white;
  border: 1px solid black;
  border-radius: 3px;
`;
