import uniq from "lodash/uniq";
import store from "../../../store";
import findOccurances from "./findOccurances";
import sortTriangleShape from "./sortTriangleShape";

const getInstances = function() {

  const qSortPattern = sortTriangleShape();

  const numRectsArray = [];
  for (let i = 0; i < qSortPattern.length; i++) {
    numRectsArray.push(i + 1);
  }

  const uniques = uniq(qSortPattern);
  const instances = [];

  for (let k = 0; k < uniques.length; k++) {
    const temp1 = findOccurances(qSortPattern, uniques[k]);
    instances.push(temp1);
  }

  // set max column height to use with factor viz
  const maxColumnHeight = Math.max(...instances);
  store.setState({
    maxColumnHeight
  });

  // get x position
  const xPosLoop = [];
  let counterX = 0;
  for (let m = 0; m < instances.length; m++) {
    for (let p = 0; p < instances[m]; p++) {
      xPosLoop.push(counterX);
    }
    counterX += 1;
  }

  // get y position
  const yPosLoop = [];
  let counterY;
  for (let r = 0; r < instances.length; r++) {
    counterY = 0;
    for (let s = 0; s < instances[r]; s++) {
      yPosLoop.push(counterY);
      counterY += 1;
    }
  }

  const positionData = {
    instances,
    xPosLoop,
    yPosLoop,
    numRectsArray,
    uniques
  };
  store.setState({ positionData });
  return positionData;
};

export default getInstances;
