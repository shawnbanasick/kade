import evenRound from '../../../../Utils/evenRound';

const reflectMatrix = (negativereflectionArray, matrix, columnSums, DR) => {

  let reflectionArray = [];
  for (let j = 0; j < columnSums.length; j += 1) {
    const tempObject = {};
    tempObject.colIndex = j;
    tempObject.weight = 1;
    tempObject.value = columnSums[j];
    tempObject.hasBeenReflected = false;
    tempObject.reflectionTarget = false;
    reflectionArray.push(tempObject);
  }


  let count = 0;
  let breakLoop = false;

  do {
    // determine if target identified
    // let targetIdentified = false;
    let valueToReflect = 0;
    let indexOfValueToReflect;
    let matrixNeedsReflection = false;
    // get value of column to reflect
    for (let i = 0; i < reflectionArray.length; i += 1) {
      // if it hasn't been reflected already
      if (reflectionArray[i].hasBeenReflected === false) {
        // if has negative column sum and no target identified yet
        if (reflectionArray[i].value < 0) {
          if (reflectionArray[i].value < valueToReflect) {
            valueToReflect = reflectionArray[i].value;
            indexOfValueToReflect = i;
            matrixNeedsReflection = true;
          }
        }
      }
    }

    if (matrixNeedsReflection === true) {
      // iterate through the reflection
      for (let j = 0; j < reflectionArray.length; j += 1) {
        if (reflectionArray[j].value === valueToReflect) {
          reflectionArray[j].weight = -1;
          reflectionArray[j].hasBeenReflected = true;
          reflectionArray[j].reflectionTarget = false;
        } else {
          reflectionArray[j].value = evenRound(
            reflectionArray[j].value + -2 * matrix[indexOfValueToReflect][j],
            3
          );
        }
      }
    } else {
      breakLoop = true;
      const tempFactorArray = [];

      for (let m = 0; m < reflectionArray.length; m += 1) {
        let tempValue = evenRound(
          reflectionArray[m].value + DR[m] * reflectionArray[m].weight,
          3
        );
        tempFactorArray.push(tempValue);
      }
      return tempFactorArray;
    }

    // prevent infinite loop
    count += 1;
    if (count > 50) {
      breakLoop = true;
    }
  } while (breakLoop === false);
};

export default reflectMatrix;
