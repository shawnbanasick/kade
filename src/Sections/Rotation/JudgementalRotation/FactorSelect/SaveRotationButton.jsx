import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import transposeMatrix from "../../../../Utils/transposeMatrix";
import calcuateSigCriterionValues from "../../varimaxLogic/2calculateSigCriterionValues";
import loadingsTableDataPrep from "../../../Loadings/LoadingsTable/loadingsTableDataPrep";
import rotationState from "../../../GlobalState/rotationState";
import outputState from "../../../GlobalState/outputState";
import loadingState from "../../../GlobalState/loadingState";
import projectHistoryState from "../../../GlobalState/projectHistoryState";
import factorState from "../../../GlobalState/factorState";
import GeneralButton from "../../../../Utils/GeneralButton";
import { useTranslation } from "react-i18next";

const clone = require("rfdc")();

const SaveRotationButton = () => {
  const { t } = useTranslation();

  const saveRotations = e => {
    e.stopPropagation();
    // getState
    const rotationDegrees = rotationState.rotationDegrees;

    // moved here to give faster DOM update
    rotationState.rotationDegrees = 0;
    rotationState.showScatterPlotTableDiv = false;

    // replace current rot factor matrix with tempRotFacStateArray
    const tempRotFacStateArray = clone(rotationState.tempRotFacStateArray);
    let abFactors = clone(rotationState.abFactors);
    const factorA = abFactors[0];
    const factorB = abFactors[1];

    // update state before re-drawing loadings table
    const tempRotFacStateArray2 = transposeMatrix(tempRotFacStateArray);
    factorState.factorMatrix = tempRotFacStateArray2;

    // re-draw loadings table
    const numFactors = rotationState.numFactorsKeptForRot;

    calcuateSigCriterionValues("noFlag");

    loadingsTableDataPrep(numFactors);

    // to archive current rot factor matrix
    let archiveCounter = rotationState.archiveCounter;
    archiveCounter += 1;
    const archiveName = `facMatrixArc${archiveCounter}`;
    rotationState.archiveCounter = archiveCounter;

    // send archive to storage to use with the undo function in Project History
    sessionStorage.setItem(archiveName, JSON.stringify(tempRotFacStateArray2));

    // getState - update Project History
    const projectHistoryArray = clone(projectHistoryState.projectHistoryArray);
    const projectHistoryText = `${t("Factor")} ${factorA} ${t("and")} ${t(
      "Factor"
    )} ${factorB} ${t("rotation")} ${rotationDegrees} ${t("degrees")}`;

    const logMessageObj = {
      logMessage: projectHistoryText,
      logType: "saveRotation"
    };

    projectHistoryArray.push(logMessageObj);

    // remove plot and table from DOM and update state
    const userSelectedRotFactors = [];
    abFactors = [];
    projectHistoryState.projectHistoryArray = projectHistoryArray;
    rotationState.highlightRotfactor1 = false;
    rotationState.highlightRotfactor2 = false;
    rotationState.highlightRotfactor3 = false;
    rotationState.highlightRotfactor4 = false;
    rotationState.highlightRotfactor5 = false;
    rotationState.highlightRotfactor6 = false;
    rotationState.highlightRotfactor7 = false;
    rotationState.highlightRotfactor8 = false;
    rotationState.userSelectedRotFactors = userSelectedRotFactors;
    rotationState.abFactors = abFactors;
    rotationState.showScatterPlotTableDiv = false;
    // hide section 6
    outputState.showOutputFactorSelection = false;
    outputState.shouldDisplayFactorVizOptions = false;
    outputState.userSelectedFactors = [];
    outputState.showFactorCorrelationsTable = false;
    outputState.showStandardErrorsDifferences = false;
    outputState.showFactorCharacteristicsTable = false;
    outputState.showDownloadOutputButtons = false;
    outputState.displayFactorVisualizations = false;
    rotationState.notifyForSavedRotation = true;
  };

  const rotationDegrees = rotationState.rotationDegrees;
  const isDisabled = loadingState.bipolarDisabled;
  if (rotationDegrees !== 0) {
    return (
      <OrangeButton
        as={GeneralButton}
        id="saveRotationButtonOrange"
        onClick={saveRotations}
        disabled={isDisabled}
        // color="orange"
        className="wrapper2"
      >
        {" "}
        {t("Save Rotation")}
      </OrangeButton>
    );
  }
  return (
    <React.Fragment>
      <GeneralButton id="saveRotationButtonGray">
        {" "}
        {t("Save Rotation")}
      </GeneralButton>
    </React.Fragment>
  );
};

export default view(SaveRotationButton);

const OrangeButton = styled.div`
  background-color: orange !important;
`;
