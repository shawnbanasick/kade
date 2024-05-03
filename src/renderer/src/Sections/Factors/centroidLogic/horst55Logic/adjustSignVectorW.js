import evenRound from "../../../../Utils/evenRound";

const adjustSignVectorW = (jj, rMatrix, W, V) => {
  W = W.map((item, index) => {
    item += 2.0 * rMatrix[index][jj] * V[jj];
    item = evenRound(item, 7);
    return item;
  });
  return W;
};

export default adjustSignVectorW;
