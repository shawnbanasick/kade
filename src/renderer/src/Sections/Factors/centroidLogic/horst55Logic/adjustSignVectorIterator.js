import evenRound from '../../../../Utils/evenRound';

const adjustSignVectorIterator = (jj, W, V) => {
  W.map((item, index) => {
    let temp1 = evenRound(W[jj] * V[jj], 7);
    let temp2 = evenRound(W[index] * V[index], 7);
    if (temp1 - temp2 >= 0) {
      jj = index;
    }
    return null;
  });
  return jj;
};

export default adjustSignVectorIterator;
