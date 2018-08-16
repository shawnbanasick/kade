import sumArrayValues from "../../Utils/sumArrayValues";
import evenRound from "../../Utils/evenRound";
import getComparisonOfNumAndDen from "./5_getComparisonOfNumAndDen";
import doFactorRotations from "./5_doFactorRotations";

const varimaxCalculations = function(factorA, factorB) {
    var AA = 0.0;
    var BB = 0.0;
    var CC = 0.0;
    var DD = 0.0;
    var uArray = [];
    var tArray = [];
    var ccArray = [];
    var ddArray = [];
    var rotatedFactors;
    var factorALength = factorA.length;
    var U,
        tPrep,
        tPrep2,
        ccPrep,
        ddPrep;

    for (var i = 0, iLen = factorALength; i < iLen; i++) {
        // (3776)
        U = (factorA[i] + factorB[i]) * (factorA[i] - factorB[i]);
        uArray.push(U);
        // (3777)
        tPrep = factorA[i] * factorB[i];
        // (3778)
        tPrep2 = tPrep + tPrep;
        tArray.push(tPrep2);
        // (3779)
        ccPrep = (U + tPrep2) * (U - tPrep2);
        ccArray.push(ccPrep);
        // (3780)
        ddPrep = 2 * U * tPrep2;
        ddArray.push(ddPrep);
    }

    // (3779)
    CC = evenRound(sumArrayValues(ccArray), 17);
    // (3780)
    DD = evenRound(sumArrayValues(ddArray), 17);
    // (3781)
    AA = evenRound(sumArrayValues(uArray), 17);
    // (3782)
    BB = evenRound(sumArrayValues(tArray), 17);

    // (3784-3785)
    var T = evenRound(
        DD - evenRound(2 * AA * evenRound(BB / factorALength, 17), 17),
        17
    );
    var B = evenRound(CC - evenRound((AA * AA - BB * BB) / factorALength, 8), 8);

    var CospAndSinp = getComparisonOfNumAndDen(T, B);
    rotatedFactors = doFactorRotations(CospAndSinp, factorA, factorB);
    return rotatedFactors;
};

export default varimaxCalculations;
