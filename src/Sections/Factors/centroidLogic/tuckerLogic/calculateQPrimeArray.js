import evenRound from '../../../../Utils/evenRound';

const calculateQPrime = (DR, columnSums) => {
  const qPrime = DR.map((item, index) => {
    return evenRound(item + columnSums[index], 3);
  });
  return qPrime;
};

export default calculateQPrime;
