import React, { useState } from 'react';
import styled from 'styled-components';
import coreState from '../../GlobalState/coreState';
import inputState from '../../GlobalState/inputState';
import { useTranslation } from 'react-i18next';

const ProjectNameInput = () => {
  const { t } = useTranslation();
  const [projectName, setProjectName] = useState('');
  const updateHasAddedProjectName = inputState((state) => state.updateHasAddedProjectName);
  const updateProjectName = coreState((state) => state.updateProjectName);

  const handleChange = (e) => {
    const projectName = e.target.value;
    let hasAddedProjectName = false;
    if (projectName.length > 0) {
      hasAddedProjectName = true;
    }
    setProjectName(projectName);
    updateHasAddedProjectName(hasAddedProjectName);
    updateProjectName(projectName);
  };

  return (
    <React.Fragment>
      <Container>
        3.
        <Input
          onChange={(e) => handleChange(e)}
          label="Project Name:"
          placeholder={t('Input Project Name')}
          value={projectName}
        />
      </Container>
    </React.Fragment>
  );
};

export default ProjectNameInput;

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
