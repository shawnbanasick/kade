import uniq from 'lodash/uniq';
import store from "../../store";
import findOccurances from "./findOccurances";
import sortTriangleShape from "./sortTriangleShape";

const getInstances = function() {
  let qSortPattern = sortTriangleShape();

  let numRectsArray = [];
  for (let i = 0; i < qSortPattern.length; i++) {
    numRectsArray.push(i + 1);
  }

  let uniques = uniq(qSortPattern);
  let instances = [];

  for (let k = 0; k < uniques.length; k++) {
    let temp1 = findOccurances(qSortPattern, uniques[k]);
    instances.push(temp1);
  }

  // set max column height to use with factor viz
  let maxColumnHeight = Math.max(...instances);
  store.setState({
    maxColumnHeight: maxColumnHeight
  });

  // get x position
  var xPosLoop = [];
  var counterX = 0;
  for (var m = 0; m < instances.length; m++) {
    for (var p = 0; p < instances[m]; p++) {
      xPosLoop.push(counterX);
    }
    counterX = counterX + 1;
  }

  // get y position
  var yPosLoop = [];
  var counterY;
  for (var r = 0; r < instances.length; r++) {
    counterY = 0;
    for (var s = 0; s < instances[r]; s++) {
      yPosLoop.push(counterY);
      counterY = counterY + 1;
    }
  }

  let positionData = {
    instances: instances,
    xPosLoop: xPosLoop,
    yPosLoop: yPosLoop,
    numRectsArray: numRectsArray,
    uniques: uniques
  };
  store.setState({ positionData: positionData });
  return positionData;
};

export default getInstances;
