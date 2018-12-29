import evenRound from "./evenRound";
import average from "./average";

const standardDeviation = values => {
  const avg = average(values);
  const squareDiffs = values.map(value => {
    const diff = value - avg;
    const sqrDiff = diff * diff;
    return sqrDiff;
  });
  const avgSquareDiff1 = squareDiffs.reduce((sum, value) => sum + value, 0);
  const avgSquareDiff = evenRound(avgSquareDiff1 / (squareDiffs.length - 1), 8);
  const stdDev = evenRound(Math.sqrt(avgSquareDiff), 8);
  return stdDev;
};

export default standardDeviation;
