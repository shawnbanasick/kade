import React from 'react';
import styled from 'styled-components';
import { view, store } from '@risingstack/react-easy-state';
import coreState from '../../GlobalState/coreState';
import inputState from '../../GlobalState/inputState';
import { useTranslation } from 'react-i18next';

const localStore = store({ projectName: '' });

const handleChange = (e) => {
  const projectName = e.target.value;
  let hasAddedProjectName = false;
  if (projectName.length > 0) {
    hasAddedProjectName = true;
  }

  localStore.projectName = projectName;
  inputState.hasAddedProjectName = hasAddedProjectName;

  coreState.projectName = projectName;
};

const ProjectNameInput = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Container>
        3.
        <Input
          onChange={(e) => handleChange(e)}
          label="Project Name:"
          placeholder={t('Input Project Name')}
          value={localStore.projectName}
        />
      </Container>
    </React.Fragment>
  );
};

export default view(ProjectNameInput);

const Input = styled.input`
  font-size: 20px;
  height: 30px;
  width: 355px;
  padding: 0.5em;
  margin: 3px;
  color: black;
  background: white;
  border: 1px solid black;
  border-radius: 3px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  padding-left: 5px;
  margin-bottom: 10px;
`;
