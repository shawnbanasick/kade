import state from "../../../store";
import calculateCorrelations from "./calcCorrelations";
import inputDataErrorMessage from "../inputDataErrorMessage";

export default function mainCorrCalcs(respondentNames, rawSortsArray) {
    if (respondentNames.length > 0) {
        // do data error checks

        const isForcedQsortPattern = state.getState("isForcedQsortPattern");

        // set up comparison array
        const qSortPattern = state.getState("qSortPattern");
        const qSortPatternCopy = qSortPattern.slice();

        qSortPatternCopy.sort((a, b) => b - a);

        const sortedPatternText = qSortPatternCopy.toString();

        const qSortPatternMax = Math.max(...qSortPattern);
        const qSortPatternMin = Math.min(...qSortPattern);
        let errorMessage;
        let explanation;
        let isError = false;

        if (isForcedQsortPattern) {
            for (let i = 0, iLen = rawSortsArray.length; i < iLen; i += 1) {
                // convert to string for comparison to q sort pattern
                const participantQsortCopy = rawSortsArray[i].slice();
                const sortedValues = participantQsortCopy.sort((a, b) => b - a);
                const sortedValuesText = sortedValues.toString();
                // throw error modal notification when no match
                if (sortedValuesText !== sortedPatternText) {
                    errorMessage = `The Q sort for participant ${
            respondentNames[i]
          } does not match the project Q sort pattern.`;
                    explanation = `Check the Q sort data in your file, clear the project, and reload your data. First, check the
                          Q sort pattern data. For CSV  and JSON input, the Q sort pattern is taken from the Q sort data of 
                          the last participant in the input file, For Excel input, the Q sort pattern is taken from the Q sorts 
                          worksheet.`;

                    inputDataErrorMessage(errorMessage, explanation);
                    isError = true;
                    break;
                }
            }
        }

        // loop to check for NaN
        // var res = array.every(function(element) {return typeof element === 'number';});
        if (!isForcedQsortPattern) {
            if (qSortPattern.length !== rawSortsArray[0].length) {
                errorMessage = `Q sort Design Input does not match input data.`;
                explanation = `For projects with unforced data, you must input the "Q Sort Design" data. Please go back to the "1. Input" section and input the "Q Sort Design".`;
                inputDataErrorMessage(errorMessage, explanation);
                isError = true;
                // state.setState({
                //   isCorrelationsButtonGreen: false
                // });
                return;
            }

            for (let i = 0, iLen = rawSortsArray.length; i < iLen; i += 1) {
                // check for out of range values
                const maxValue = Math.max(...rawSortsArray[i]);
                const minValue = Math.min(...rawSortsArray[i]);
                if (maxValue > qSortPatternMax || minValue < qSortPatternMin) {
                    errorMessage = `The Q sort for participant ${
            respondentNames[i]
          } has an out-of-range value.`;
                    explanation = `Check the Q sort data in your file, clear the project, and reload your data.`;

                    inputDataErrorMessage(errorMessage, explanation);
                    isError = true;
                    break;
                }
            }
        }
        // do the calcuations
        if (isError === false) {
            calculateCorrelations(rawSortsArray, respondentNames);
        }
        state.setState({
            showCorrelationMatrix: true,
            activeStartAnalysisButton: true,
            isLoadingBeginAnalysis: false,
            isCorrelationsButtonGreen: true,
            isDataAlreadyLoaded: true
        });
    }
}