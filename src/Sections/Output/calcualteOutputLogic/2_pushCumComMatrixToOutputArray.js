import store from "../../store";
import evenRound from "../../Utils/evenRound";

const pushCumComMaxtrixToOutputArray = function(
    sheetNames,
    output,
    outputData,
    sheetNamesXlsx,
    colSizes
) {
    sheetNamesXlsx.push("Cumul Comm Matrix");

    // isolate data
    let cumulCommMatrix9 = store.getState("unrotatedFactorMatrixOutput");

    // set excel column widths
    let columns = [
        {
            wch: 12
        }
    ];
    for (var ii = 0, iiLen = cumulCommMatrix9[0].length; ii < iiLen; ii++) {
        columns.push({
            wch: 8
        });
    }
    colSizes.push(columns);

    // get rid of eigenvalue and exp var rows
    // let explnVarRow = cumulCommMatrix9.pop();
    // cumulCommMatrix9.pop();
    // cumulCommMatrix9.pop();
    let responderHeadersRow = cumulCommMatrix9.shift();

    // add respondent names and do rounding
    for (let i = 0; i < cumulCommMatrix9.length; i++) {
        // respondentName = cumulCommMatrix9[i].shift();
        for (let j = 2; j < cumulCommMatrix9[i].length; j++) {
            if (j === 2) {
                let temp1 = cumulCommMatrix9[i][j];
                cumulCommMatrix9[i][j] = evenRound(temp1 * temp1, 4);
            } else {
                let temp1 = cumulCommMatrix9[i][j];
                cumulCommMatrix9[i][j] = evenRound(
                    temp1 * temp1 + cumulCommMatrix9[i][j - 1],
                    4
                );
            }
        }
    // cumulCommMatrix9[i].unshift(respondentName);
    }
    cumulCommMatrix9.unshift(responderHeadersRow);

    // add cumulative explained variance
    let explnVarRow = store.getState("cumulEigenPerVar");
    explnVarRow.splice(1, 0, "");
    cumulCommMatrix9.push(["", ""], explnVarRow);

    // add to output
    output.push(cumulCommMatrix9);

    // format for excel
    //cumulCommMatrix9[0][0] = "Participant";
    cumulCommMatrix9.unshift(
        ["", ""],
        ["Cumulative Communalities Matrix"],
        ["", ""]
    );
    outputData.push(cumulCommMatrix9);

    return [sheetNames, output, outputData, sheetNamesXlsx, colSizes];
};

export default pushCumComMaxtrixToOutputArray;
