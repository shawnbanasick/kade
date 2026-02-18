import evenRound from '../../Utils/evenRound';

const getPercentVarianceArray = (loadingsMatrix, totalVariables) => {
  return loadingsMatrix.map((factor) => {
    // 1. Calculate Sum of Squared Loadings (SSL) for this factor
    const ssl = factor.reduce((sum, loading) => sum + Math.pow(loading, 2), 0);

    // 2. Return the percentage of total variance
    return evenRound((ssl / totalVariables) * 100, 0);
  });
};

export default getPercentVarianceArray;
