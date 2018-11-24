import store from "../../../../store";

// todo - basically, just to trigger component update - see if delete possible
const data = function() {
  const newRotationVectors = store.getState("d3RotChartData");

  store.setState({
    newRotationVectors
  });
};

export default data;
