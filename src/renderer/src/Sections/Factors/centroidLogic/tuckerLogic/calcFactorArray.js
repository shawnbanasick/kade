import evenRound from '../../../../Utils/evenRound';

const calcFactorArray = (coeffFValue, qPrimeArray) => {
  let factorArray = qPrimeArray.map((value, index) =>
    evenRound(value / coeffFValue, 5)
  );
  return factorArray;
};

export default calcFactorArray;
