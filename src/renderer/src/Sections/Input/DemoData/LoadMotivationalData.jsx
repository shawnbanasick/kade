import uploadMotivationalData from './uploadMotivationalData';
import revertLoadButtonsColors from './revertLoadButtonsColors';
import LoadButton from './LoadButton';
import inputState from '../../GlobalState/inputState.js';
import appState from '../../GlobalState/appState';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import styled from 'styled-components';

const MotivationalButton1 = () => {
  const { t } = useTranslation();
  const isLoadMotivationalButtonGreen = inputState.isLoadMotivationalButtonGreen;

  const isDataAlreadyLoaded = inputState((state) => state.isDataAlreadyLoaded);
  const trans1 = i18n.t('Data have already been loaded and the analysis has started');
  const trans2 = i18n.t('To clear this analysis and restart the application');
  const trans3 = i18n.t('click the Clear Project button near the bottom of the navigation panel');

  const updateShowErrorMessageBar = inputState((state) => state.updateShowErrorMessageBar);
  const updateErrorMessage = inputState((state) => state.updateErrorMessage);
  const updateExtendedErrorMessage = inputState((state) => state.updateExtendedErrorMessage);
  const updateErrorStackTrace = inputState((state) => state.updateErrorStackTrace);

  const updateIsLoadMotivationalButtonGreen = inputState(
    (state) => state.updateIsLoadMotivationalButtonGreen
  );
  const updateNotifyDataUploadSuccess = inputState((state) => state.updateNotifyDataUploadSuccess);
  const updateAreStatementsLoaded = inputState((state) => state.updateAreStatementsLoaded);
  const updateAreQsortsLoaded = inputState((state) => state.updateAreQsortsLoaded);
  const updateIsInputButtonGreen = appState((state) => state.updateIsInputButtonGreen);
  const updateIsDataButtonGreen = appState((state) => state.updateIsDataButtonGreen);
  const updateIsDataAlreadyLoaded = inputState((state) => state.updateIsDataAlreadyLoaded);

  const handleClick = () => {
    if (isDataAlreadyLoaded) {
      updateShowErrorMessageBar(true);
      updateErrorMessage(i18n.t('Data are already loaded click Clear Project to restart'));
      updateExtendedErrorMessage(`${trans1}. ${trans2}, ${trans3}.`);
      updateErrorStackTrace(i18n.t('no stack trace available'));
    } else {
      uploadMotivationalData();
      revertLoadButtonsColors();

      updateIsLoadMotivationalButtonGreen(true);
      updateNotifyDataUploadSuccess(true);
      updateAreStatementsLoaded(true);
      updateAreQsortsLoaded(true);
      updateIsInputButtonGreen(true);
      updateIsDataButtonGreen(true);
      updateIsDataAlreadyLoaded(true);
    }
  };

  return (
    <div>
      <LoadButton
        id="motivationalButton"
        floated="right"
        onClick={handleClick}
        isActive={isLoadMotivationalButtonGreen}
      >
        <LineContainer>
          <SvgContainer xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </SvgContainer>
          {t('Load Motivational')}
        </LineContainer>
      </LoadButton>
    </div>
  );
};

export default MotivationalButton1;

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
