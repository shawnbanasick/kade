import inputState from '../../GlobalState/inputState';

const revertLoadButtonsColors = (type) => {
  if (type !== 'csv') {
    inputState.setState({ isLoadCsvTextButtonGreen: false });
    inputState.setState({ isLoadCsvQsortsButtonGreen: false });
  }

  if (type !== 'json') {
    inputState.setState({ isLoadJsonTextButtonGreen: false });
    inputState.setState({ isLoadJsonQsortsButtonGreen: false });
    inputState.setState({ isLoadSheetsCsvButtonGreen: false });
  }

  if (type !== 'pqmethod') {
    inputState.setState({ isLoadPqmethodTextButtonButtonGreen: false });
    inputState.setState({ isLoadPqmethodQsortsButtonGreen: false });
  }

  inputState.setState({ isLoadExcelT3ButtonGreen: false });
  inputState.setState({ isLoadExcelT2ButtonGreen: false });
  inputState.setState({ isLoadExcelT1ButtonGreen: false });
  inputState.setState({ isLoadLipsetButtonGreen: false });
  inputState.setState({ isLoadBuzzwordsButtonGreen: false });
  inputState.setState({ isLoadMotivationalButtonGreen: false });
  inputState.setState({ isLoadIpadSurveyButtonGreen: false });
};

export default revertLoadButtonsColors;
