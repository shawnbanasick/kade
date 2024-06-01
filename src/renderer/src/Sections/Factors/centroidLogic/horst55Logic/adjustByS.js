import evenRound from '../../../../Utils/evenRound';

const adjustByS = (N, W) => {
  let S = 0.0;
  // helper
  let tempW = W.map((item) => Math.abs(item));
  const acculumate = (acc, value) => acc + value;

  S = tempW.reduce(acculumate, 0.0);
  S = evenRound(S, 7);
  S = 1.0 / Math.sqrt(S);
  S = evenRound(S, 7);

  let newW = W.map((item) => {
    let temp1 = item * S;
    let temp2 = evenRound(temp1, 7);
    return temp2;
  });

  return newW;
};

export default adjustByS;
