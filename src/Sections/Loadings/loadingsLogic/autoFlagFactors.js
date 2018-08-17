import store from "../../store";
import loadingsTableDataPrep from "../LoadingsTable/loadingsTableDataPrep";
import calculateSigCriterionValues from "../../S4-rotation/varimaxLogic/2calculateSigCriterionValues";
import transposeMatrix from '../../Utils/transposeMatrix';
import calculateCommunalities from "../../S4-rotation/varimaxLogic/2calculateCommunalities";

const autoFlagFactors = function() {
    store.setState({
        isLoadingAutoflag: true
    });

    // should produce for Lipset calc style matrix - 9 cols by 7 rows
    // console.log(
    //   "rotFacStateArray (autoflag in [col facs]): " +
    //     JSON.stringify(rotFacStateArray)
    // );

    // give button time to display loading spinner
    setTimeout(() => {

        // get data for current user selected significance level
        let userSelectedSigLevel = store.getState("userSelectedSigLevel");
        let lookupTable = {
            3.906: "p < 0.0001",
            3.291: "p < 0.001",
            2.575: "p < 0.01",
            1.96: "p < 0.05",
            1.645: "p < 0.1",
            majority: "Majority of Common Variance"
        };
        let criticalLevelText = lookupTable[userSelectedSigLevel];
        let requireMajorityCommonVariance = store.getState(
            "requireMajorityCommonVariance"
        );
        // setup Project History Array text
        let comVarText = "and a majority of common variance was not required";
        if (requireMajorityCommonVariance === true) {
            comVarText = " and a majority of common variance was required";
        }
        let autoFlagHistory = [
            "Autoflagging set to " + criticalLevelText + comVarText
        ];


        let numFactorsKeptForRot = store.getState("numFactorsKeptForRot");

        // reset communalities
        let factorMatrix1 = store.getState("factorMatrix");
        let transposedMatrix = transposeMatrix(factorMatrix1);
        calculateCommunalities(transposedMatrix);


        calculateSigCriterionValues("flag");
        loadingsTableDataPrep(numFactorsKeptForRot);

        store.setState({
            // reset manual rotation
            shouldShowJudgeRotDiv: false,
            judgeButtonActive: false,
            showScatterPlotTableDiv: false,
            abFactors: [],
            highlightRotfactor1: false,
            highlightRotfactor2: false,
            highlightRotfactor3: false,
            highlightRotfactor4: false,
            highlightRotfactor5: false,
            highlightRotfactor6: false,
            highlightRotfactor7: false,
            highlightRotfactor8: false,
            userSelectedRotFactors: [],
            // hide section 6
            autoFlagHistory: autoFlagHistory,
            showOutputFactorSelection: false,
            showFactorCorrelationsTable: false,
            showStandardErrorsDifferences: false,
            showFactorCharacteristicsTable: false,
            showDownloadOutputButtons: false,
            shouldDisplayFactorVizOptions: false,
            displayFactorVisualizations: false
        });
        return null;
    }, 10);
};

export default autoFlagFactors;
