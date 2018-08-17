import store from "../../store";
import evenRound from "../../Utils/evenRound";

const computeFactorWeights = function(significantLoadingsArray) {
    // source code line 4440

    for (let i = 0; i < significantLoadingsArray.length; i++) {
        var f = significantLoadingsArray[i][2];
        var f2 = evenRound(f * f, 5);
        var oneMinusF2,
            w;
        if (f2 === 1) {
            oneMinusF2 = f2;
            w = evenRound(f / oneMinusF2, 5);
        } else if (f2 > 1) {
            oneMinusF2 = evenRound(1 - f2, 5);
            w = evenRound(f / -oneMinusF2, 5);
        } else {
            oneMinusF2 = evenRound(1 - f2, 5);
            w = evenRound(f / oneMinusF2, 5);
        }
        significantLoadingsArray[i].push(w);
    }
    store.setState({
        sortWeights: significantLoadingsArray
    });

    return significantLoadingsArray;
};

export default computeFactorWeights;
