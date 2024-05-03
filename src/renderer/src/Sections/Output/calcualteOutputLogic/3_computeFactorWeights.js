import evenRound from "../../../Utils/evenRound";

import calcState from "../../GlobalState/calcState";

const computeFactorWeights = significantLoadingsArray => {
  // source code line 4440

  for (let i = 0; i < significantLoadingsArray.length; i += 1) {
    const f = significantLoadingsArray[i][2];
    const f2 = evenRound(f * f, 5);
    let oneMinusF2;
    let w;
    if (f2 === 1) {
      oneMinusF2 = f2;
      w = evenRound(f / oneMinusF2, 5);
    } else if (f2 > 1) {
      oneMinusF2 = evenRound(1 - f2, 5);
      w = evenRound(f / -oneMinusF2, 5);
    } else {
      oneMinusF2 = evenRound(1 - f2, 5);
      w = evenRound(f / oneMinusF2, 5);
    }
    significantLoadingsArray[i].push(w);
  }
  calcState.sortWeights = significantLoadingsArray;

  return significantLoadingsArray;
};

export default computeFactorWeights;
