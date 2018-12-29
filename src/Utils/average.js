import evenRound from "./evenRound";

const average = data => {
  const sum2 = data.reduce((sum, value) => sum + value, 0);
  const avg = evenRound(sum2 / data.length, 8);
  return avg;
};

export default average;
