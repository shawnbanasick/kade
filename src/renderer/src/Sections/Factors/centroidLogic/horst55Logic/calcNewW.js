import evenRound from '../../../../Utils/evenRound';

const calcNewW = (D, N, V, W) => {
  W = W.map((item, index) => {
    let wItem = item + D[index] * V[index];
    return evenRound(wItem, 7);
  });
  return W;
};

export default calcNewW;
