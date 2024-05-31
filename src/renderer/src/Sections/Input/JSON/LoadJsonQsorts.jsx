import React from 'react';
import styled from 'styled-components';
import { ToastContainer, toast, Slide } from 'react-toastify';
import convertJSONToData from './convertJSONToData';
import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
import throwDataAlreadyLoadedInputErrorModal from '../ErrorChecking/throwDataAlreadyLoadedInputErrorModal';
import throwNoSortsInputErrorModal from '../ErrorChecking/throwNoSortsInputError';
import LoadButton from '../DemoData/LoadButton';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';
import coreState from '../../GlobalState/coreState';
import appState from '../../GlobalState/appState';

function notifyWarning() {
  toast.warn('Select Participant Id to complete JSON import', {
    autoClose: false,
  });
}

const LoadJsonQsortsFile = () => {
  const { t } = useTranslation();
  const isLoadJsonQsortsButtonGreen = inputState((state) => state.isLoadJsonQsortsButtonGreen);
  const isDataAlreadyLoaded = inputState((state) => state.isDataAlreadyLoaded);
  const updateJsonParticipantId = inputState((state) => state.updateJsonParticipantId);
  const updateShowJsonParticipantIdDropdown = inputState(
    (state) => state.updateShowJsonParticipantIdDropdown
  );
  const updateCsvData = coreState((state) => state.updateCsvData);
  const updateJsonObj = coreState((state) => state.updateJsonObj);
  const updateDataOrigin = inputState((state) => state.updateDataOrigin);
  const updateAreQsortsLoaded = inputState((state) => state.updateAreQsortsLoaded);
  const updateIsInputButtonGreen = appState((state) => state.updateIsInputButtonGreen);
  const updateIsDataButtonGreen = appState((state) => state.updateIsDataButtonGreen);
  const updateDisabledSheetsButton = inputState((state) => state.updateDisabledSheetsButton);
  const updateIsDataAlreadyLoaded = inputState((state) => state.updateIsDataAlreadyLoaded);
  const updateCsvErrorMessage1 = inputState((state) => state.updateCsvErrorMessage1);
  const updateShowCsvErrorModal = inputState((state) => state.updateShowCsvErrorModal);
  const areStatementsLoaded = inputState((state) => state.areStatementsLoaded);

  let isNoError = true;

  const handleClick = async () => {
    // check to see if data loaded and correlations started - true ==> throw error
    if (isDataAlreadyLoaded) {
      throwDataAlreadyLoadedInputErrorModal();
    } else {
      try {
        const processJson = (results) => {
          // convert from JSON to array
          const resultsArray = [];
          const resultsKeys = Object.keys(results);

          for (let k = 0; k < resultsKeys.length; k += 1) {
            resultsArray.push(results[resultsKeys[k]]);
          }

          const testValue = Object.prototype.hasOwnProperty.call(resultsArray[0], 'sort');

          if (!testValue) {
            throwNoSortsInputErrorModal(`Can't find the key named "sort" in JSON object`);
            isNoError = false;
          }

          if (isNoError === true) {
            // todo - this is the source of the extra brackets

            console.log(JSON.stringify(results, null, 2));

            const csvData = convertJSONToData(results);

            const columnHeaders = csvData[0][0];
            revertLoadButtonsColors('json');
            updateJsonParticipantId(columnHeaders);
            updateShowJsonParticipantIdDropdown(true);
            updateCsvData(csvData);
            updateJsonObj(results);
            updateDataOrigin('json');
            updateAreQsortsLoaded(true);
            updateIsInputButtonGreen(areStatementsLoaded);
            updateIsDataButtonGreen(areStatementsLoaded);
            updateDisabledSheetsButton(true);
            notifyWarning();
            updateIsDataAlreadyLoaded(true);
          } // end if
          // end read file path
        };

        await window.electronAPI.openJsonFile();
        window.bridge.jsonData((event, jsonData) => {
          processJson(JSON.parse(jsonData));
        });
      } catch (error) {
        updateCsvErrorMessage1(error.message);
        updateShowCsvErrorModal(true);
      }
    }
  };

  return (
    <React.Fragment>
      <JsonButton
        as={LoadButton}
        $isActive={isLoadJsonQsortsButtonGreen}
        onClick={() => handleClick()}
      >
        <LineContainer>
          <SvgContainer xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </SvgContainer>
          <p>{t('Load JSON File')}</p>
        </LineContainer>
      </JsonButton>
      <ToastContainer transition={Slide} />
    </React.Fragment>
  );
};

export default LoadJsonQsortsFile;

const JsonButton = styled.div`
  margin-top: 18px;
`;

const SvgContainer = styled.svg`
  transform: rotate(180deg);
  margin-right: 20px;
  height: 17px;
  width: 17px;
  fill: currentColor;
`;

const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
