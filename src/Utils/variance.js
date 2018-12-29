import evenRound from "./evenRound";

const variance = function(arr) {
  let len = 0;
  let sum = 0;
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === "") {
    } else if (isNaN(arr[i])) {
      return 0;
    } else {
      len += 1;
      sum += parseFloat(arr[i]);
    }
  }
  let v = 0;
  if (len > 1) {
    const mean = sum / len;
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] === "") {
      } else {
        v += (arr[i] - mean) * (arr[i] - mean);
      }
    }
    const output2 = v / len;
    const output = evenRound(output2, 6);
    return output;
  }
  return 0;
};

export default variance;
