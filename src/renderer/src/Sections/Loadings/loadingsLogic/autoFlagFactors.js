import transposeMatrix from "../../../Utils/transposeMatrix";
import loadingsTableDataPrep from "../LoadingsTable/loadingsTableDataPrep";
import calculateCommunalities from "../../Rotation/varimaxLogic/2calculateCommunalities";
import calculateSigCriterionValues from "../../Rotation/varimaxLogic/2calculateSigCriterionValues";
import loadingState from "../../GlobalState/loadingState";
import rotationState from "../../GlobalState/rotationState";
import outputState from "../../GlobalState/outputState";
import i18n from "i18next";
import getLoadingState from "../../GlobalState/getLoadingState";
import getFactorState from "../../GlobalState/getFactorState";
import getRotationState from "../../GlobalState/getRotationState";

const autoFlagFactors = () => {
  loadingState.isLoadingAutoflag = true;
  loadingState.autoflagButtonColor = "#dbdbe0";

  // should produce for Lipset calc style matrix - 9 cols by 7 rows

  // give button time to display loading spinner
  setTimeout(() => {
    // get data for current user selected significance level
    const userSelectedSigLevel = getLoadingState("userSelectedSigLevel");
    const lookupTable = {
      3.891: "P < 0.0001",
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
    const requireMajorityCommonVariance = getLoadingState(
      "requireMajorityCommonVariance"
    );
    // setup Project History Array text
    let comVarText = ` ${i18n.t(
      "and a majority of common variance was not required"
    )}`;
    if (requireMajorityCommonVariance === true) {
      comVarText = ` ${i18n.t(
        "and a majority of common variance was required"
      )}`;
    }
    const autoFlagHistory = [
      `${i18n.t("Auto-Flag")}: `,
      `${criticalLevelText}${comVarText}`
    ];

    const numFactorsKeptForRot = getRotationState("numFactorsKeptForRot");

    // reset communalities
    const factorMatrix1 = getFactorState("factorMatrix");
    const transposedMatrix = transposeMatrix(factorMatrix1);
    calculateCommunalities(transposedMatrix);

    calculateSigCriterionValues("flag");
    loadingsTableDataPrep(numFactorsKeptForRot);

    // reset manual rotation
    rotationState.shouldShowJudgeRotDiv = false;
    rotationState.judgeButtonActive = false;
    rotationState.showScatterPlotTableDiv = false;
    rotationState.abFactors = [];
    rotationState.highlightRotfactor1 = false;
    rotationState.highlightRotfactor2 = false;
    rotationState.highlightRotfactor3 = false;
    rotationState.highlightRotfactor4 = false;
    rotationState.highlightRotfactor5 = false;
    rotationState.highlightRotfactor6 = false;
    rotationState.highlightRotfactor7 = false;
    rotationState.highlightRotfactor8 = false;
    rotationState.userSelectedRotFactors = [];
    // hide section 6
    loadingState.autoFlagHistory = autoFlagHistory;
    outputState.showOutputFactorSelection = false;
    outputState.showFactorCorrelationsTable = false;
    outputState.showStandardErrorsDifferences = false;
    outputState.showFactorCharacteristicsTable = false;
    outputState.showDownloadOutputButtons = false;
    outputState.shouldDisplayFactorVizOptions = false;
    outputState.displayFactorVisualizations = false;
    outputState.showDocxOptions = false;
    loadingState.sendDataToOutputButtonColor = "orange";

    return null;
  }, 10);
};

export default autoFlagFactors;
