import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Header, Modal } from 'semantic-ui-react';
import loadingsTableDataPrep from '../../Loadings/LoadingsTable/loadingsTableDataPrep';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import rotationState from '../../GlobalState/rotationState';
import projectHistoryState from '../../GlobalState/projectHistoryState';
import loadingState from '../../GlobalState/loadingState';
import factorState from '../../GlobalState/factorState';

const FactorSelectButtonModal = () => {
  const { t } = useTranslation();
  // getState
  const numFactorsKept = rotationState((state) => state.numFactorsKeptForRot);
  const projectHistoryArray = projectHistoryState((state) => state.projectHistoryArray);
  let splitFactorsArray = loadingState((state) => state.splitFactorsArray);
  const updateSplitFactorsArray = loadingState((state) => state.updateSplitFactorsArray);
  const updateSplitFactorsArrayArchive = loadingState(
    (state) => state.updateSplitFactorsArrayArchive
  );
  const updateProjectHistoryArray = projectHistoryState((state) => state.updateProjectHistoryArray);
  const updateIsLoadingFactorsKept = loadingState((state) => state.updateIsLoadingFactorsKept);
  const updateIsFacSelectDisabled = rotationState((state) => state.updateIsFacSelectDisabled);
  const updateShouldDisplayFacKept = rotationState((state) => state.updateShouldDisplayFacKept);
  const updateShowLoadingsTable = loadingState((state) => state.updateShowLoadingsTable);
  const updateArchiveCounter = rotationState((state) => state.updateArchiveCounter);
  let archiveCounter = rotationState((state) => state.archiveCounter);
  const factorMatrix = factorState((state) => state.factorMatrix);

  const [localStore, setLocalStore] = useState({
    isActive: false,
    modalOpenSelect: false,
  });

  const handleOpen = () => {
    console.log('clicked');

    if (isNaN(numFactorsKept)) {
      setLocalStore({ ...localStore, modalOpenSelect: false });
    } else {
      setLocalStore({ ...localStore, isActive: true });

      splitFactorsArray.length = +numFactorsKept;
      updateSplitFactorsArray([...splitFactorsArray]);
      updateSplitFactorsArrayArchive([...splitFactorsArray]);

      // update project history in dom and state
      const projectHistoryText = `${i18n.t(
        'Number of factors selected for rotation'
      )}: ${numFactorsKept}`;

      // a shortcut to remove history when selecting a second time - truncate array
      projectHistoryArray.length = 2;

      const logMessageObj = {
        logMessage: projectHistoryText,
        logType: 'factorsSelected',
      };

      projectHistoryArray.push(logMessageObj);

      // update state
      updateProjectHistoryArray(projectHistoryArray);

      updateIsLoadingFactorsKept(true);

      setTimeout(() => {
        loadingsTableDataPrep(numFactorsKept);
      }, 10);

      // show loadings table
      updateIsFacSelectDisabled(true);
      updateShouldDisplayFacKept(true);
      updateShowLoadingsTable(true);
      updateArchiveCounter(archiveCounter);

      // getState - archive values for undo function (ProjectHistory component)

      archiveCounter += 1;
      const archiveName = `facMatrixArc${archiveCounter}`;
      sessionStorage.setItem(archiveName, JSON.stringify(factorMatrix));
    }
  };

  const handleClose = () => {
    setLocalStore({ ...localStore, modalOpenSelect: false });
  };

  const isFacSelectDisabled = rotationState((state) => state.isFacSelectDisabled);
  // setLocalStore({ ...localStore, isActive: isFacSelectDisabled });
  const isActive = localStore.isActive;
  const showKeepFacForRotButton = rotationState((state) => state.showKeepFacForRotButton);

  if (showKeepFacForRotButton) {
    return (
      <React.Fragment>
        <Modal
          dimmer={'blurring'}
          trigger={
            <GeneralFacSelectButton
              as={GeneralButton}
              id="factorsKeptSubmitButton"
              $isActive={isActive}
              disabled={isFacSelectDisabled}
              onClick={handleOpen}
            >
              {t('Submit')}
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
              {t('Please select the number of factors to keep for rotation')}
            </span>
          </Modal.Content>
          <Modal.Actions>
            <Button id="FactorSelectModalGotItButton" color="green" onClick={handleClose} inverted>
              {t('Got it')}
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
  return null;
};

export default FactorSelectButtonModal;

const GeneralFacSelectButton = styled.div`
  height: 40px;
`;
