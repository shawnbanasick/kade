import state from "../../../store";

const revertLoadButtonsColors = () => {
    state.setState({
        isLoadLipsetButtonGreen: false,
        isLoadBuzzwordsButtonGreen: false,
        isLoadMotivationalButtonGreen: false,
        isLoadIpadSurveyButtonGreen: false
    });
};

export default revertLoadButtonsColors;

