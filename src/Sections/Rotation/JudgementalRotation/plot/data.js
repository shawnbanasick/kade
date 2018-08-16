import store from "../../../store";

// todo - basically, just to trigger component update - see if delete possible
const data = function() {
    let newRotationVectors = store.getState("d3RotChartData");

    store.setState({
        newRotationVectors: newRotationVectors
    });
};

export default data;
