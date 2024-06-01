import evenRound from '../../../../Utils/evenRound';

const accumulateW = (rMatrix) => {
  // helper
  const acculmulate = (value, acc) => acc + value;
  // W = reduce and map rows from rMatrix
  const W = rMatrix.map((row, index) => {
    let wItem = evenRound(row.reduce(acculmulate, 0.0), 7);
    return wItem;
  });
  return W;
};

export default accumulateW;
