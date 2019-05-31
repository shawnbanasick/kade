import state from "../../../store";
import transposeMatrix from "../../../Utils/transposeMatrix";
import loadingsTableDataPrep from "../LoadingsTable/loadingsTableDataPrep";
import calculateCommunalities from "../../Rotation/varimaxLogic/2calculateCommunalities";
import calculateSigCriterionValues from "../../Rotation/varimaxLogic/2calculateSigCriterionValues";

const autoFlagFactors = () => {
  state.setState({
    isLoadingAutoflag: true,
    autoflagButtonColor: "#dbdbe0"
  });

  // should produce for Lipset calc style matrix - 9 cols by 7 rows 

  // give button time to display loading spinner
  setTimeout(() => {
    // get data for current user selected significance level
    const userSelectedSigLevel = state.getState("userSelectedSigLevel");
    const lookupTable = {
      3.906: "P < 0.0001",
      3.481: "P < 0.0005",
      3.291: "P < 0.001",
      2.807: "P < 0.005",
      2.575: "P < 0.01",
      1.96: "P < 0.05",
      1.645: "P < 0.1",
      1.44: "P < 0.15",
      1.28: "P < 0.2",
      majority: "Majority of Common Variance"
    };
    const criticalLevelText = lookupTable[userSelectedSigLevel];
    const requireMajorityCommonVariance = state.getState(
      "requireMajorityCommonVariance"
    );
    // setup Project History Array text
    let comVarText = " and a majority of common variance was not required";
    if (requireMajorityCommonVariance === true) {
      comVarText = " and a majority of common variance was required";
    }
    const autoFlagHistory = [
      `Autoflagging: `, `${criticalLevelText}${comVarText}`
    ];

    const numFactorsKeptForRot = state.getState("numFactorsKeptForRot");

    // reset communalities
    const factorMatrix1 = state.getState("factorMatrix");
    const transposedMatrix = transposeMatrix(factorMatrix1);
    calculateCommunalities(transposedMatrix);

    calculateSigCriterionValues("flag");
    loadingsTableDataPrep(numFactorsKeptForRot);

    state.setState({
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
      autoFlagHistory,
      showOutputFactorSelection: false,
      showFactorCorrelationsTable: false,
      showStandardErrorsDifferences: false,
      showFactorCharacteristicsTable: false,
      showDownloadOutputButtons: false,
      shouldDisplayFactorVizOptions: false,
      displayFactorVisualizations: false,
      sendDataToOutputButtonColor: "orange"
    });
    return null;
  }, 10);
};

export default autoFlagFactors;
