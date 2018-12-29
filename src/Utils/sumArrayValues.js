import reduce from "lodash/reduce";
import evenRound from "../Utils/evenRound";

const sumArrayValues = array => {
  const totalsSums = reduce(array, (sum, num) => evenRound(sum + num, 8));
  return totalsSums;
};

export default sumArrayValues;
