import store from "../../store";
import cloneDeep from "lodash/cloneDeep";

function assignFactorScores(zScoreArray) {
    var qavSortTriangleShape = store.getState("qSortPattern");
    var sortedZScoreArray = [];
    for (var i = 0; i < zScoreArray.length; i++) {
        var factorNumbers = zScoreArray[i];

        var temp1 = cloneDeep(factorNumbers);

        temp1.sort(function(a, b) {
            if (a.zScore === b.zScore) {
                return b.statement - a.statement;
            } else {
                return a.zScore - b.zScore;
            }
        });

        for (var j = 0; j < qavSortTriangleShape.length; j++) {
            temp1[j].sortValue = qavSortTriangleShape[j];
            temp1[j].sigVisualization = "";
            temp1[j].sigVisualizationUni = "";
            temp1[j].directionSymbol = "";
            temp1[j].directionSymbolUni = "";
        }
        temp1.sort(function(a, b) {
            return a.statement - b.statement;
        });
        sortedZScoreArray.push(temp1);
    }
    store.setState({
        analysisOutput: sortedZScoreArray
    });
    return sortedZScoreArray;
}

export default assignFactorScores;
