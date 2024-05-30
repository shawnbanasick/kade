import styled from 'styled-components';
import inputState from '../../GlobalState/inputState';

const StatementTextArea = () => {
  const updateSortsPasteTextArea = inputState((state) => state.updateSortsPasteTextArea);
  const pasteTextAreaContent = inputState((state) => state.sortsPasteTextAreaContent);

  updateSortsPasteTextArea(localStorage.getItem('sortsPasteTextArea'));

  const handleChange = (event) => {
    let textareaInput = event.target.value.toString();
    console.log(textareaInput);
    inputState.sortsPasteTextArea = textareaInput;
    localStorage.setItem('sortsPasteTextArea', textareaInput);

    //appState.currentStatements = statementInput;
    //  localStorage.setItem("currentStatements", statementInput);
  };

  return (
    <Container>
      <label>Paste sort data from Sheets:</label>
      <StatementTextsInput
        type="textarea"
        name="textValue"
        value={pasteTextAreaContent || ''}
        onChange={handleChange}
      />
    </Container>
  );
};

export default StatementTextArea;

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
