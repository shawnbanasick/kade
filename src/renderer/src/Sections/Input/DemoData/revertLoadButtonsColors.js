import inputState from '../../GlobalState/inputState';

const revertLoadButtonsColors = (type) => {
  inputState.setState({
    ...(type !== 'csv' && {
      isLoadCsvTextButtonGreen: false,
      isLoadCsvQsortsButtonGreen: false,
    }),
    ...(type !== 'json' && {
      isLoadJsonTextButtonGreen: false,
      isLoadJsonQsortsButtonGreen: false,
      isLoadSheetsCsvButtonGreen: false,
    }),
    ...(type !== 'pqmethod' && {
      isLoadPqmethodTextButtonButtonGreen: false,
      isLoadPqmethodQsortsButtonGreen: false,
    }),
    isLoadExcelT3ButtonGreen: false,
    isLoadExcelT2ButtonGreen: false,
    isLoadExcelT1ButtonGreen: false,
    isLoadLipsetButtonGreen: false,
    isLoadBuzzwordsButtonGreen: false,
    isLoadMotivationalButtonGreen: false,
    isLoadIpadSurveyButtonGreen: false,
  });
};

export default revertLoadButtonsColors;
