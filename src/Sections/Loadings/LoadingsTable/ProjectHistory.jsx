import styled from "styled-components";
import React from "react";
import { view } from "react-easy-state";
import transposeMatrix from "../../../Utils/transposeMatrix";
import calculateCommunalities from "../../Rotation/varimaxLogic/2calculateCommunalities";
import calcuateSigCriterionValues from "../../Rotation/varimaxLogic/2calculateSigCriterionValues";
import loadingsTableDataPrep from "../LoadingsTable/loadingsTableDataPrep";
import rotationState from "../../GlobalState/rotationState";
import outputState from "../../GlobalState/outputState";
import loadingState from "../../GlobalState/loadingState";
import factorState from "../../GlobalState/factorState";
import projectHistoryState from "../../GlobalState/projectHistoryState";
import GeneralButton from "../../../Utils/GeneralButton";
import { useTranslation } from "react-i18next";

const clone = require("rfdc")();

const ProjectHistory = () => {
  const { t } = useTranslation();

  const handleUndo = () => {
    // getState - get counter and adjust value
    let archiveCounter = rotationState.archiveCounter;
    archiveCounter -= 1;
    const previousFacMatrixArchive = `facMatrixArc${archiveCounter}`;

    // getState - remove entry from project history
    const projectHistoryArray = clone(projectHistoryState.projectHistoryArray);
    const typeOfUndo3 = projectHistoryArray.pop();
    const typeOfUndo = typeOfUndo3.logType;

    // get the previous matrix from archive
    let previousFacMatrix = JSON.parse(
      sessionStorage.getItem(previousFacMatrixArchive)
    );

    // getState
    const numFactors = rotationState.numFactorsKeptForRot;
    // see if there are other bipolar splits
    let bipolarSplitCount = loadingState.bipolarSplitCount;

    if (typeOfUndo === "Bipolar") {
      previousFacMatrix = JSON.parse(
        sessionStorage.getItem("undoAllBipolarMatrix")
      );

      const projectHistoryArrayLength = JSON.parse(
        sessionStorage.getItem("projectHistoryArrayLength")
      );

      // remove all listings of bipolar splits from history array
      projectHistoryArray.length = projectHistoryArrayLength;

      bipolarSplitCount = 0;
      archiveCounter -= 1;
    }

    // ************* Regular Undo

    // reset significance calculations
    const previousFacMatrix2 = transposeMatrix([...previousFacMatrix]);
    calculateCommunalities(previousFacMatrix2);
    calcuateSigCriterionValues("noFlag");

    // restore previous factor matrix to current factor matrix
    factorState.factorMatrix = previousFacMatrix;

    // re-draw loadings table
    loadingsTableDataPrep(numFactors);

    if (typeOfUndo === "Varimax") {
      projectHistoryState.projectHistoryArray = projectHistoryArray;
      rotationState.archiveCounter = archiveCounter;
      rotationState.varimaxButtonActive = false;
      rotationState.varimaxButtonDisabled = false;
      rotationState.varimaxButtonText = "Varimax Rotation";
      // hide section 6
      outputState.showOutputFactorSelection = false;
      outputState.userSelectedFactors = [];
      outputState.shouldDisplayFactorVizOptions = false;
      outputState.showFactorCorrelationsTable = false;
      outputState.showStandardErrorsDifferences = false;
      outputState.showFactorCharacteristicsTable = false;
      outputState.showDownloadOutputButtons = false;
      outputState.displayFactorVisualizations = false;
      loadingState.sendDataToOutputButtonColor = "#d6dbe0";
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
      rotationState.showVarimaxHeywoodWarning = false;
      rotationState.variContinueButtonActive = false;
      rotationState.variContinueButtonDisabled = false;
      rotationState.variAdjustButtonActive = false;
      rotationState.variAdjustButtonDisabled = false;
      rotationState.variPqmAdjustButtonActive = false;
      rotationState.variPqmAdjustButtonDisabled = false;
      return; // early return varimax undo
    }

    if (typeOfUndo === "Selected") {
      rotationState.archiveCounter = archiveCounter;
      projectHistoryState.projectHistoryArray = projectHistoryArray;
      // hide section 4
      rotationState.shouldDisplayFacKept = false;
      rotationState.varimaxButtonDisabled = false;
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
      // hide section 5
      loadingState.showLoadingsTable = false;
      // hide section 6
      outputState.showOutputFactorSelection = false;
      outputState.shouldDisplayFactorVizOptions = false;
      outputState.userSelectedFactors = [];
      outputState.showFactorCorrelationsTable = false;
      outputState.showStandardErrorsDifferences = false;
      outputState.showFactorCharacteristicsTable = false;
      outputState.showDownloadOutputButtons = false;
      outputState.displayFactorVisualizations = false;
      loadingState.sendDataToOutputButtonColor = "#d6dbe0";
      return;
    }

    // default undo
    rotationState.archiveCounter = archiveCounter;
    loadingState.bipolarSplitCount = bipolarSplitCount;
    projectHistoryState.projectHistoryArray = projectHistoryArray;
    // hide section 6
    outputState.userSelectedFactors = [];
    outputState.showOutputFactorSelection = false;
    outputState.shouldDisplayFactorVizOptions = false;
    outputState.showFactorCorrelationsTable = false;
    outputState.showStandardErrorsDifferences = false;
    outputState.showFactorCharacteristicsTable = false;
    outputState.showDownloadOutputButtons = false;
    outputState.displayFactorVisualizations = false;
    outputState.shouldDisplayFactorViz = false;
    loadingState.sendDataToOutputButtonColor = "#d6dbe0";
    loadingState.bipolarDisabled = false;
    loadingState.bipolarIndexArray = [];
    // normal return
  };

  // getState
  const projectHistoryArray = clone(projectHistoryState.projectHistoryArray);
  const shouldDisplayUndoButton = projectHistoryArray.length > 3;
  let mapCounter = 1;
  return (
    <MainContent>
      <TitleDiv>{t("Project Log")}</TitleDiv>
      <CustomOl>
        {projectHistoryArray.map((listValue, index) => (
          <li key={mapCounter++}>{listValue.logMessage}</li>
        ))}
      </CustomOl>
      {shouldDisplayUndoButton && (
        <UndoButton as={GeneralButton} id="undoButton" onClick={handleUndo}>
          {t("Undo Last Action")}
        </UndoButton>
      )}
    </MainContent>
  );
};

export default view(ProjectHistory);

// const ContentWrapper = styled.div`
//   /* width: calc(100vw - 250px);
//   height: calc(100vh - 100px); */
//   margin-top: 30px;
//   user-select: "none";
//   border: 2px solid red;
// `;

const UndoButton = styled.div`
  margin-left: 40px;
  margin-top: 15px;
`;

const TitleDiv = styled.div`
  font-size: 28px;
  margin-bottom: 5px;
  margin-left: 20px;
  height: 35px;
  width: 400px;
`;

const CustomOl = styled.ol`
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 20px;
  line-height: 2em;
  width: 900px;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 1fr;
  justify-items: left;
  align-items: center;
  box-sizing: border-box;
  background-color: white;
  padding-bottom: 50px;
  padding-top: 50px;
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  width: calc(100vw - 155);
  height: calc(100vh - 120);
`;
