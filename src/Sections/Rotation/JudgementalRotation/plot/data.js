import state from "../../../../store";

// todo - basically, just to trigger component update - see if delete possible
const data = () => {
  const newRotationVectors = state.getState("d3RotChartData");

  state.setState({
    newRotationVectors
  });
};

export default data;
