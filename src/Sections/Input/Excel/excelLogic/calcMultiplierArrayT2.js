function calcMultiplierArrayT2(copyTriangleShape) {
  const multiplierArray = [];
  let prev;
  for (let i = 0, iLen = copyTriangleShape.length; i < iLen; i += 1) {
    if (copyTriangleShape[i] !== prev) {
      multiplierArray.push(1);
    } else {
      multiplierArray[multiplierArray.length - 1] += 1;
    }
    prev = copyTriangleShape[i];
  }
  // pad the multiplierArray
  const leadValue = copyTriangleShape[0];
  const minLeadValue = -6;
  const padding = Math.abs(minLeadValue - leadValue);
  for (let p = 0; p < padding; p += 1) {
    multiplierArray.unshift(0);
  }
  for (let j = 0; j < 20; j += 1) {
    if (multiplierArray.length < 20) {
      multiplierArray.push(0);
    }
  }
  return multiplierArray;
}

export default calcMultiplierArrayT2;
