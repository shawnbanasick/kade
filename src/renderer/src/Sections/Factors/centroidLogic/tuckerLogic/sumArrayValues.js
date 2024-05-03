import evenRound from '../../../../Utils/evenRound';

const sumArrayValues = array => {
  let totalsSums = array.reduce((sum, num) => {
    return evenRound(sum + num, 5);
  });
  return totalsSums;
};

export default sumArrayValues;
