import state from "../../../store";

const revertLoadButtonsColors = (type) => {

    if (type !== "csv") {
        state.setState({
            isLoadCsvTextButtonGreen: false,
            isLoadCsvQsortsButtonGreen: false,
        })
    }

    if (type !== "json") {
        state.setState({
            isLoadJsonTextButtonGreen: false,
            isLoadJsonQsortsButtonGreen: false,
        })
    }

    if (type !== "pqmethod") {
        state.setState({
            isLoadPqmethodTextButtonButtonGreen: false,
            isLoadPqmethodQsortsButtonGreen: false,
        })
    }

    state.setState({
        isLoadExcelT3ButtonGreen: false,
        isLoadExcelT2ButtonGreen: false,
        isLoadExcelT1ButtonGreen: false,
        isLoadLipsetButtonGreen: false,
        isLoadBuzzwordsButtonGreen: false,
        isLoadMotivationalButtonGreen: false,
        isLoadIpadSurveyButtonGreen: false
    });
};

export default revertLoadButtonsColors;

