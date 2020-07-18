import React from "react";
import styled from "styled-components";
import { view, store } from "react-easy-state";
import { Button, Header, Modal } from "semantic-ui-react";
import loadingsTableDataPrep from "../../Loadings/LoadingsTable/loadingsTableDataPrep";
import rotationState from "../../GlobalState/rotationState";
import projectHistoryState from "../../GlobalState/projectHistoryState";
import factorState from "../../GlobalState/factorState";
import loadingState from "../../GlobalState/loadingState";
import GeneralButton from "../../../Utils/GeneralButton";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const clone = require("rfdc")();

const localStore = store({
  isActive: false,
  modalOpenSelect: false
});

const handleOpen = () => {
  // getState and confirm that the number of factors has been selected
  const numFactorsKept = rotationState.numFactorsKeptForRot;
  if (isNaN(numFactorsKept)) {
    localStore.modalOpenSelect = false;
  } else {
    localStore.isActive = true;

    // update project history in dom and state
    const projectHistoryText = `${i18n.t(
      "Number of factors selected for rotation"
    )}: ${numFactorsKept}`;

    const projectHistoryArray = clone(projectHistoryState.projectHistoryArray);
    // a shortcut to remove history when selecting a second time - truncate array
    projectHistoryArray.length = 2;

    const logMessageObj = {
      logMessage: projectHistoryText,
      logType: "factorsSelected"
    };

    projectHistoryArray.push(logMessageObj);

    // update state
    projectHistoryState.projectHistoryArray = projectHistoryArray;

    loadingState.isLoadingFactorsKept = true;
    setTimeout(() => {
      loadingsTableDataPrep(numFactorsKept);
    }, 10);

    // show loadings table
    rotationState.isFacSelectDisabled = true;
    rotationState.shouldDisplayFacKept = true;
    loadingState.showLoadingsTable = true;

    // getState - archive values for undo function (ProjectHistory component)
    let archiveCounter = clone(rotationState.archiveCounter);
    const factorMatrix = clone(factorState.factorMatrix);
    archiveCounter += 1;
    const archiveName = `facMatrixArc${archiveCounter}`;
    rotationState.archiveCounter = archiveCounter;
    sessionStorage.setItem(archiveName, JSON.stringify(factorMatrix));
  }
};

const handleClose = () => {
  localStore.modalOpenSelect = false;
};

const FactorSelectButtonModal = () => {
  const { t } = useTranslation();

  const isFacSelectDisabled = rotationState.isFacSelectDisabled;
  localStore.isActive = isFacSelectDisabled;
  const isActive = localStore.isActive;
  const showKeepFacForRotButton = rotationState.showKeepFacForRotButton;

  if (showKeepFacForRotButton) {
    return (
      <React.Fragment>
        <Modal
          dimmer={"blurring"}
          trigger={
            <GeneralFacSelectButton
              as={GeneralButton}
              id="factorsKeptSubmitButton"
              isActive={isActive}
              disabled={isFacSelectDisabled}
              onClick={handleOpen}
            >
              {t("Submit")}
            </GeneralFacSelectButton>
          }
          open={localStore.modalOpenSelect}
          onClose={handleClose}
          basic
          size="small"
        >
          <Header content="Factor Rotation" />
          <Modal.Content>
            <span style={{ fontSize: 30 }}>
              {t("Please select the number of factors to keep for rotation")}
            </span>
          </Modal.Content>
          <Modal.Actions>
            <Button
              id="FactorSelectModalGotItButton"
              color="green"
              onClick={handleClose}
              inverted
            >
              {t("Got it")}
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
  return null;
};

export default view(FactorSelectButtonModal);

const GeneralFacSelectButton = styled.div`
  height: 40px;
`;
