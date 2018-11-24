import evenRound from "../../../Utils/evenRound";

const removeCorrelations = (array, factorLoadings) => {
  const factorCorrelations = [];
  let newArrayFrag;

  function helper1(factorLoadings, index) {
    factorLoadings.forEach((num) => {
      const temp = num * factorLoadings[index];
      newArrayFrag.push(evenRound(temp, 8));
    }, this);

    return newArrayFrag;
  }

  for (let i = 0, iLen = factorLoadings.length; i < iLen; i++) {
    newArrayFrag = [];
    newArrayFrag = helper1(factorLoadings, i);
    factorCorrelations.push(newArrayFrag);
  }

  const residualCorrelationsPrep = [];

  for (let j = 0, jLen = factorLoadings.length; j < jLen; j++) {
    const subtractionFrag = [];
    for (let k = 0, kLen = factorLoadings.length; k < kLen; k++) {
      const tempVar = array[j][k] - factorCorrelations[j][k];
      subtractionFrag.push(evenRound(tempVar, 8));
    }
    residualCorrelationsPrep.push(subtractionFrag);
  }

  for (let p = 0, pLen = factorLoadings.length; p < pLen; p++) {
    const m = p;
    residualCorrelationsPrep[p][m] = 1;
  }

  return residualCorrelationsPrep;
};

export default removeCorrelations;
