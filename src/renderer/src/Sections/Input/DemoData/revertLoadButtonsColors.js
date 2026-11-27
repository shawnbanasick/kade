import inputState from '../../GlobalState/inputState';

const revertLoadButtonsColors = (type) => {
  inputState.setState({
    ...(type !== 'csv' && {
      isLoadCsvTextButtonGreen: false,
      isLoadCsvQsortsButtonGreen: false,
    }),
    ...(type !== 'pqmethod' && {
      isLoadPqmethodTextButtonButtonGreen: false,
      isLoadPqmethodQsortsButtonGreen: false,
    }),
    ...(type !== 'excelT1' && {
      isLoadExcelT1ButtonGreen: false,
    }),
    ...(type !== 'excelT2' && {
      isLoadExcelT2ButtonGreen: false,
    }),
    ...(type !== 'excelT3' && {
      isLoadExcelT3ButtonGreen: false,
    }),
    isLoadLipsetButtonGreen: false,
    isLoadBuzzwordsButtonGreen: false,
    isLoadMotivationalButtonGreen: false,
    isLoadIpadSurveyButtonGreen: false,
  });
};

export default revertLoadButtonsColors;
