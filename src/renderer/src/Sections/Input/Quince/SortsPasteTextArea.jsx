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
  };

  return (
    <div className="flex flex-col select-none">
      <label>Paste sort data from Sheets:</label>
      <textarea
        name="textValue"
        value={pasteTextAreaContent || ''}
        onChange={handleChange}
        className="w-[clamp(200px,40vw,800px)] h-[400px] mt-[10px] mb-[30px] select-all"
      />
    </div>
  );
};

export default StatementTextArea;
