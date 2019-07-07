const getDiagonalsAndNewDiagonals = (D, U, L, NL, rMatrix, HOLDR, P, breakLoop, K) => {
    let S = 0.0;
    for (let i542=0; i542<rMatrix.length; i542+=1) {
        S = Math.max(S, Math.abs(D[i542]));
    }
    for (let i56=0; i56<rMatrix.length; i56+=1) {
        D[i56] = Math.min(1.0, (U[i56]-D[i56]));
        U[i56] = D[i56];
    }
    console.log(JSON.stringify(U));

    if (S-P > 0) {
        // * do something
        L +=1;
        console.log(K,L)
    } else {
        // 
        breakLoop = true;
    } 

    if (L > NL) {
        console.log("Communality estimates did NOT converge after 30 iterations");
        breakLoop = true;
    }

    // ** calc new diagonals
    K = 0;
    for (let i77=0; i77<rMatrix.length; i77+=1) {
        for (let j77=0; j77<rMatrix.length; j77+=1) {
            rMatrix[i77][j77] = HOLDR[i77][j77];
        }
    }

    return [D, U, K, rMatrix, L, breakLoop];

}

export default getDiagonalsAndNewDiagonals;