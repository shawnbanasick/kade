import intersection from 'lodash/intersection';

function reduceDistingArray(array) {
  const reducedArray = [];
  for (let r = 0; r < array.length; r += 1) {
    const increment3 = r + 1;
    const commonSet2 = intersection(array[r], array[increment3]);
    reducedArray.push(commonSet2);
  }
  if (reducedArray.length > 1) {
    reducedArray.pop();
  }
  return reducedArray;
}

export default reduceDistingArray;
