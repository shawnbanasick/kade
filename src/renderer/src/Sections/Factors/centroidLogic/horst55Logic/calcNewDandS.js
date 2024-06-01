import evenRound from '../../../../Utils/evenRound';

const calcNewDandS = (D, U) => {
  let sStartValue = 0.0;
  let newD = D.map((item) => Math.abs(item));
  newD.push(sStartValue);
  // spread to find max value
  let S = Math.max(...newD);
  S = evenRound(S, 7);

  D = D.map((item, index) => {
    let temp = Math.min(1.0, U[index] - item);
    temp = evenRound(temp, 7);
    return temp;
  });

  // clone D to U
  U = [...D];

  // todo ---> write U to unrotated loadings file

  return { D, S, U };
};

export default calcNewDandS;
