import state from "../../../store";

const pushCorrelationArray = function(
  sheetNames,
  output,
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  sheetNamesXlsx.push("Correlation Matrix");

  const correlationMatrix = state.getState("correlationTableArray");
  const respondentNames = state.getState("respondentNames");

  // to add respondent names to matrix
  for (let i = 0, iLen = correlationMatrix.length; i < iLen; i++) {
    correlationMatrix[i].unshift(respondentNames[i]);
  }

  // to get max respondent name length
  let respondentNameMaxLength = 0;
  for (let j = 0, jLen = respondentNames.length; j < jLen; j++) {
    const temp1 = respondentNames[j].length;
    if (temp1 > respondentNameMaxLength) {
      respondentNameMaxLength = temp1;
    }
  }
  if (respondentNameMaxLength < 5) {
    respondentNameMaxLength = 5;
  }

  // to set up column spacing
  const columns = [];
  for (let j = 0, jLen = correlationMatrix[0].length + 1; j < jLen; j++) {
    columns.push({
      wch: respondentNameMaxLength
    });
  }
  colSizes.push(columns);

  // to format table header correctly
  respondentNames.unshift("Participant");

  // to add headers to table display
  correlationMatrix.unshift(
    ["", ""],
    ["Correlations between Q-sorts"],
    ["", ""],
    respondentNames
  );
  outputData.push(correlationMatrix);

  return [sheetNames, output, outputData, sheetNamesXlsx, colSizes];
};

export default pushCorrelationArray;
