import pull from "lodash/pull";
import store from "../../../store";

// consensusStatementArrays 
function addDistinguishingSymbolsToData(outputForDataViz, distStatementDataVizArray) {
    const consensus01Statements = store.getState("consensus01Statements");
    const consensus05Statements = store.getState("consensus05Statements");
    const userSelectedFactors2 = store.getState("userSelectedFactors");
    const userSelectedFactors = [];

    // to delete spaces between text "Factor " and factor number
    for (let r = 0; r < userSelectedFactors2.length; r++) {
        const temp1 = userSelectedFactors2[r];
        const temp2 = temp1.replace(/\s/g, "");
        userSelectedFactors.push(temp2);
    }

    // Assign Consensus values - loop through userSelectedFactors to get each synFactorViz
    for (let i = 0; i < outputForDataViz.length; i++) {
        // for consensus loop - all statements
        for (let jj = 0, jjLen = outputForDataViz[i].length; jj < jjLen; jj++) {
            // for consensus
            const testValue = +outputForDataViz[i][jj].statement;
            const consensus01 = consensus01Statements.includes(testValue);
            const consensus05 = consensus05Statements.includes(testValue);
            // assign consensus values
            if (consensus01) {
                outputForDataViz[i][jj].isConsensus01State = true;
            } else {
                outputForDataViz[i][jj].isConsensus01State = false;
            }
            if (consensus05) {
                outputForDataViz[i][jj].isConsensus05State = true;
            } else {
                outputForDataViz[i][jj].isConsensus05State = false;
            }
        }

        // for distingishing symbols
        // loop through each distinguishing statement in distStatementDataVizArray[i]
        for (let j = 0, jLen = distStatementDataVizArray[i].length; j < jLen; j++) {
            // get statement number
            const statementId = distStatementDataVizArray[i][j]["No."];

            // avoid empty objects
            let sigSymbol,
                sigSymbolUni;
            const testValue = parseInt(statementId, 10);
            if (!isNaN(testValue)) {
                // get values for calc of direction symbol
                const sigFactorZscoreKey = `Z-SCR-${  userSelectedFactors[i]}`;
                const sigFactorZscoreValue = distStatementDataVizArray[i][j][sigFactorZscoreKey];
                const allFactorZscores = [];

                // loop through all of the factor z-scores and push to array
                for (let k = 0; k < userSelectedFactors.length; k++) {
                    const temp1 = `Z-SCR-${  userSelectedFactors[k]}`;
                    const temp2 = distStatementDataVizArray[i][j][temp1];
                    allFactorZscores.push(temp2);
                }
                // calc directionSymbol by checking against Zscore in all other factors
                const otherFactorZscores = pull(allFactorZscores, sigFactorZscoreValue);

                // let factorZscoreAverage = d3.mean(otherFactorZscores);
                let arrowPointerArrayLeft = [],
                    arrowPointerArrayRight = [];
                for (let kk = 0; kk < otherFactorZscores.length; kk++) {
                    if (sigFactorZscoreValue - otherFactorZscores[kk] > 0) {
                        arrowPointerArrayRight.push("1");
                    } else {
                        arrowPointerArrayLeft.push("1");
                    }
                }

                // for distinguishing
                let directionSymbol,
                    directionSymbolUni;
                if (
                    otherFactorZscores.length === arrowPointerArrayRight.length &&
                    userSelectedFactors.length > 1
                ) {
                    directionSymbol = ">>"; // " >>>"; "&#9658;";  right-pointing pointer
                    directionSymbolUni = "\u25BA";
                } else if (otherFactorZscores.length === arrowPointerArrayLeft.length) {
                    directionSymbol = "<<"; // " <<<";  "&#9668;";  left-pointing pointer
                    directionSymbolUni = "\u25C4";
                } else {
                    directionSymbol = "";
                    directionSymbolUni = "";
                }
                // put it all together and insert into object
                const sigFactorName = `SIG${  userSelectedFactors[i]}`;
                const sigAt01Level = distStatementDataVizArray[i][j][sigFactorName];
                const location = statementId - 1;
                if (sigAt01Level === "*") {
                    sigSymbol = "** "; // "**";  "&#9673;";  sig at .01
                    sigSymbolUni = "\u2733\u2733";
                // sigSymbolUni = "\u25C9";
                } else if (sigAt01Level === "") {
                    sigSymbol = "* "; // "*";  "&#9678;";  sig at .05
                    sigSymbolUni = "\u2733";
                // sigSymbolUni = "\u25CE";
                }

                outputForDataViz[i][location].sigVisualization = sigSymbol;
                outputForDataViz[i][location].sigVisualizationUni = sigSymbolUni;
                outputForDataViz[i][location].directionSymbol = directionSymbol;
                outputForDataViz[i][location].directionSymbolUni = directionSymbolUni;
            }
        }
    }
    return outputForDataViz;
}
;

export default addDistinguishingSymbolsToData;
