import state from "../../../store";

const revertLoadButtonsColors = () => {
  state.setState({
    loadLipsetButtonColor: "#d6dbe0",
    loadBuzzwordsButtonColor: "#d6dbe0",
    loadMotivationalButtonColor: "#d6dbe0",
    loadIpadSurveyButtonColor: "#d6dbe0"
  });
};

export default revertLoadButtonsColors;
