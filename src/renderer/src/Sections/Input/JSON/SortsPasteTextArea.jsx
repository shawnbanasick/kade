import React from 'react';
import styled from 'styled-components';
import { view } from '@risingstack/react-easy-state';
import inputState from '../../GlobalState/inputState';

const handleChange = (event) => {
  let textareaInput = event.target.value.toString();
  console.log(textareaInput);
  inputState.sortsPasteTextArea = textareaInput;
  localStorage.setItem('sortsPasteTextArea', textareaInput);

  //appState.currentStatements = statementInput;
  //  localStorage.setItem("currentStatements", statementInput);
};

const StatementTextArea = () => {
  inputState.sortsPasteTextAreaContent = localStorage.getItem('sortsPasteTextArea');

  return (
    <Container>
      <label>Paste sort data from Sheets:</label>
      <StatementTextsInput
        type="textarea"
        name="textValue"
        value={inputState.sortsPasteTextAreaContent || ''}
        onChange={handleChange}
      />
    </Container>
  );
};

export default view(StatementTextArea);

const StatementTextsInput = styled.textarea`
  width: clamp(200px, 40vw, 800px);
  height: 400px;
  margin-top: 10px;
  margin-bottom: 30px;
  user-select: all;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
`;
