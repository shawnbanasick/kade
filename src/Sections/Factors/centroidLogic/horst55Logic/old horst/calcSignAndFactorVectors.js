const calcSignAndFactorVectors = (rMatrix, K, D, fMatrix) => {
    const W = [];
    const V = [];
    const rMatrixClone = rMatrix.map(arr => arr.slice());
    
    // ** create W array of accumulated row values
    // ** create V array of 1s

    // ** for all rows
    for (let i=0; i<rMatrix.length; i+=1) {
        let wTempVal = 0.0; // W[i] = 0.0;
        const vTempVal = 1.0  // V[i] = 1.0;

        // ** accumulate W across row
        for (let j=0; j<rMatrix[i].length; j+=1) {
            wTempVal += rMatrix[i][j];  // W[i] += rMatrix[i][j];         
        }
        W.push(wTempVal);
        V.push(vTempVal);
    }

    // **  SIGN VECTOR LOOP  (a do-while loop?)
    // **  Now, compare array W current (J) value and array V value, with next row (I)
    // **  if product of W and V current row - product
    // **  of W and V next row is 0 or more then shift current row to next (J = I) and continue  
    // **  if negative, then continue

    
    let breakLoop = false;
    let infiniteLoopCatch = 0;

    // ** line 30 loop
    
    do {
        let jj = 0;
        
        // **  line 31 loop
        for (let ii = 1; ii<rMatrix.length; ii += 1) {
            
            // ** if positive, reset jj 
            
            if ( ( W[jj] * V[jj] - W[ii] * V[ii] ) >= 0 ) {
                jj = ii;
            }
            
            // **  if product of current row W and V are 0 or positive, then BREAK and calc Factor Vector
            // **  else, flip the sign of the current V value ( V(J) = -V(J) ), calc new W array values,
            // **  and start sign vector loop again
            
            if (W[jj]*V[jj] < 0) {
                
                // ** flip the sign
                V[jj] = -V[jj];

                // ** recalculate W array and reloop
                for (let k=0; k<rMatrix.length; k+=1 ) {
                    W[k] += 2.0 * rMatrix[k][jj] * V[jj];
                }

            } else {
                // ** break the loop
                breakLoop = true
            }
        }

        infiniteLoopCatch += 1;

    } while (breakLoop === false || infiniteLoopCatch < 999)

    // ** FACTOR VECTOR loop 
    for (let i41=0; i41<rMatrix.length; i41+=1) {
        W[i41] += D[i41] * V[i41];
    }

    let S = 0.0;

    for (let i44=0; i44<rMatrix.length; i44+=1) {
        S += Math.abs(W[i44]);
        S = 1.0/Math.sqrt(S);
    }

    for (let i47=0; i47<rMatrix.length; i47+=1) {
        W[i47] *= S;
    }
    
    // ** write to the output matrix (fmatrix)
    const tempArray = W.slice();
    fMatrix.push(tempArray);
    
    // ** increment counter for num facs extracted
    K += 1;

    // ** calculate residual matrix
    for (let i52=0; i52<rMatrix.length; i52+=1) {
        
        // ** set new diagonals
        rMatrixClone[i52][i52] = D[i52]; 
    
        for (let j52=0; j52<rMatrix.length; j52+=1) {
            rMatrixClone[i52][j52] -= W[i52] * W[j52];
        }
    }

}

export default calcSignAndFactorVectors;