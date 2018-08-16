import evenRound from "../../Utils/evenRound";
import transposeMatrix from "../../Utils/transposeMatrix";

const unStandardize = function(standardizedResults, sumSquares) {
  var results = [];
  var nLoopLen = standardizedResults.length;
  var n, p;
  var arrayFrag, pLoopLen, newArrayFrag, arrayItem, resultsTransposed;
  var crit;

  for (n = 0; n < nLoopLen; n++) {
    arrayFrag = standardizedResults[n];
    newArrayFrag = [];
    pLoopLen = arrayFrag.length;

    crit = 0;
    for (p = 0; p < pLoopLen; p++) {
      arrayItem = 0;
      arrayItem =
        evenRound(arrayFrag[p], 5) * evenRound(Math.sqrt(sumSquares[p]), 5);
      newArrayFrag.push(evenRound(arrayItem, 5));
      crit = crit + arrayItem * Math.abs(arrayItem);
    }

    // invert (reflect) mostly negative factors
    // todo - on rare occasions seems to be differeneces with R package - see jimmy email
    if (crit < 0) {
      var q;
      var qLoopLen = newArrayFrag.length;
      for (q = 0; q < qLoopLen; q++) {
        newArrayFrag[q] = -newArrayFrag[q];
      }
    }
    results.push(newArrayFrag);
  }

  resultsTransposed = transposeMatrix(results);

  return resultsTransposed;
};

export default unStandardize;
