import { uniq } from 'lodash';

const reduceConsensusArray = (arr, count) => {
  // Build a frequency map
  const freq = {};
  for (const num of arr) {
    freq[num] = (freq[num] || 0) + 1;
  }

  // Keep only elements whose frequency matches the target count
  const returnArray = arr.filter((val) => freq[val] === count);

  return uniq(returnArray);
};

export default reduceConsensusArray;
