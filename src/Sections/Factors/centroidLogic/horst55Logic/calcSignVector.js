import evenRound from "../../../../Utils/evenRound";
import adjustSignVectorW from "./adjustSignVectorW";
import adjustSignVectorIterator from "./adjustSignVectorIterator";

const calcSignAndFactorVectors = (rMatrix, W, V) => {
  //  SIGN VECTOR and FACTOR VECTOR LOOP  (a do-while loop)
  let endLoop = false;
  let infiniteLoopCatch = 0;

  
  // V = create a vector of 1s
  V = Array(rMatrix.length).fill(1.0);

  // line 30 loop
  do {
    let jj = 0;

    jj = adjustSignVectorIterator(jj, W, V);

    //  Line 2007 - 32
    if (evenRound(W[jj] * V[jj], 7) < 0) {
      //  flip the sign
      V[jj] = -V[jj];

      // recalculate W array and reloop
      W = adjustSignVectorW(jj, rMatrix, W, V);
    } else {
      // break the loop
      endLoop = true;
    }

    infiniteLoopCatch += 1;
    if (infiniteLoopCatch > 750) {
      endLoop = true;
    }
  } while (endLoop === false);

  return { W, V };
};

export default calcSignAndFactorVectors;
