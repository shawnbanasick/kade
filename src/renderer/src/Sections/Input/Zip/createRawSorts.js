import cloneDeep from "lodash/cloneDeep";

const createRawSorts = sortsInput => {
  // create copy of array
  let sortsInputCopy = cloneDeep(sortsInput);

  let newRawSorts = [];
  const sorts = sortsInputCopy.map(sort => {
    // remove first entry from each array and push into newRawSorts
    newRawSorts.push(sort.shift());
    return sort;
  });
  return sorts;
};

export default createRawSorts;
