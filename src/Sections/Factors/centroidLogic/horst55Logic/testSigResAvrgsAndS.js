import evenRound from "../../../../Utils/evenRound";

const testSigResAvrgsAndS = (rMatrix, N) => {
  let S = 0.0;
  let AVRGS;

  rMatrix.map((row, indexI) => {
    return row.map((item, indexJ) => {
      S = S + rMatrix[indexI][indexJ] ** 2;
      S = evenRound(S, 7);
      AVRGS = (2 * S) / (N * (N - 1));
      AVRGS = evenRound(AVRGS, 7);
      return null;
    });
  });
  return { S, AVRGS };
};

export default testSigResAvrgsAndS;
