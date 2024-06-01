import React from 'react';
import styled from 'styled-components';

import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import doHeywoodAdjustment from '../centroidLogic/horst55Logic/doHeywoodAdjustment';
import i18n from 'i18next';
import factorState from '../../GlobalState/factorState';
import appState from '../../GlobalState/appState';
import rotationState from '../../GlobalState/rotationState';
import projectHistoryState from '../../GlobalState/projectHistoryState';

const HeywoodCaseNotification = () => {
  const { t } = useTranslation();
  const updateHeywoodAdjustButtonActive = factorState(
    (state) => state.updateHeywoodAdjustButtonActive
  );
  const updateHeywoodContinueButtonActive = factorState(
    (state) => state.updateHeywoodContinueButtonActive
  );

  const updateIsCentroidFacSelectDisabled = factorState(
    (state) => state.updateIsCentroidFacSelectDisabled
  );
  const updateIsCentroidExtractButtonDisabled = factorState(
    (state) => state.updateIsCentroidExtractButtonDisabled
  );
  const updateProjectHistoryArray = projectHistoryState((state) => state.updateProjectHistoryArray);
  const updateShowUnrotatedFactorTable = factorState(
    (state) => state.updateShowUnrotatedFactorTable
  );
  const updateShowEigenvaluesTable = factorState((state) => state.updateShowEigenvaluesTable);
  const updateShowScreePlot = factorState((state) => state.updateShowScreePlot);
  const updateShowKeepFacForRotButton = rotationState(
    (state) => state.updateShowKeepFacForRotButton
  );
  const updateHeywoodButtonDisabled = factorState((state) => state.updateHeywoodButtonDisabled);
  const updateIsFactorsButtonGreen = appState((state) => state.updateIsFactorsButtonGreen);
  const updateShowHeywoodCaseNotifications = factorState(
    (state) => state.updateShowHeywoodCaseNotifications
  );

  // set default state on first load
  updateHeywoodAdjustButtonActive(false);
  updateHeywoodContinueButtonActive(false);

  const handleReselectClick = () => {
    updateIsCentroidFacSelectDisabled(false);
    updateIsCentroidExtractButtonDisabled(false);

    // remove previous log entry
    const projectHistoryArray = projectHistoryState((state) => state.projectHistoryArray);
    projectHistoryArray.pop();
    updateProjectHistoryArray(projectHistoryArray);

    updateShowUnrotatedFactorTable(false);
    updateShowEigenvaluesTable(false);
    updateShowScreePlot(false);
    updateShowKeepFacForRotButton(false);
    updateShowHeywoodCaseNotifications(false);
  };

  const handleContinueClick = () => {
    const projectHistoryArray = projectHistoryState((state) => state.projectHistoryArray);
    const heywoodParticipantsTextJoin = factorState((state) => state.heywoodParticipantsTextJoin);

    const projectLogText3 = `${i18n.t(
      'Heywood Case Participants'
    )}: ${heywoodParticipantsTextJoin}. ${i18n.t('Factor Loadings not adjusted')}.`;

    const logMessageObj1 = {
      logMessage: projectLogText3,
      logType: 'HeywoodAdjustment',
    };

    const newProjectHistoryArray = [...projectHistoryArray, logMessageObj1];
    updateProjectHistoryArray(newProjectHistoryArray);

    updateShowUnrotatedFactorTable(true);
    updateShowEigenvaluesTable(true);
    updateShowScreePlot(true);
    updateShowKeepFacForRotButton(true);
    updateHeywoodButtonDisabled(true);
    updateIsFactorsButtonGreen(true);
    updateHeywoodContinueButtonActive(true);
    updateShowKeepFacForRotButton(true);
  };

  const handleAdjustClick = () => {
    doHeywoodAdjustment();
    updateShowUnrotatedFactorTable(true);
    updateShowEigenvaluesTable(true);
    updateShowScreePlot(true);
    updateShowKeepFacForRotButton(true);
    updateHeywoodButtonDisabled(true);
    updateIsFactorsButtonGreen(true);
    updateHeywoodAdjustButtonActive(true);
  };

  const heywoodContinueButtonActive = factorState((state) => state.heywoodContinueButtonActive);
  const heywoodAdjustButtonActive = factorState((state) => state.heywoodAdjustButtonActive);
  const heywoodButtonDisabled = factorState((state) => state.heywoodButtonDisabled);
  const showHeywoodCaseNotifications = factorState((state) => state.showHeywoodCaseNotifications);
  const heywoodParticipantsCommunalities = factorState(
    (state) => state.heywoodParticipantsCommunalityArray
  );
  const heywoodReselectButtonActive = false;

  if (showHeywoodCaseNotifications) {
    return (
      <Container>
        <TextSpanLabel>{t('Heywood Case Participants')}</TextSpanLabel>
        <HorozontalRule />
        <HeywoodTable>
          <table>
            <tbody>
              <tr>
                <th>{t('Participant')}</th>
                <th>{t('Communality')}</th>
              </tr>
              {heywoodParticipantsCommunalities.map((item, index) => (
                <tr key={`key${index.toString()}`}>
                  <td>{item.participantName}</td>
                  <td className="center">{item.communality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </HeywoodTable>
        <HeywoodText>{`${t('heywoodMessage1')}. ${t('heywoodMessage2')}. ${t(
          'heywoodMessage3'
        )}.`}</HeywoodText>

        <ButtonContainer>
          <ExtractionButton
            onClick={handleContinueClick}
            isActive={heywoodContinueButtonActive}
            disabled={heywoodButtonDisabled}
          >
            {t('Continue Analysis')}
          </ExtractionButton>
          <ExtractionButton
            onClick={handleReselectClick}
            isActive={heywoodReselectButtonActive}
            disabled={heywoodButtonDisabled}
          >
            {t('ReSelect Num Factors')}
          </ExtractionButton>
          <ExtractionButton
            onClick={handleAdjustClick}
            isActive={heywoodAdjustButtonActive}
            disabled={heywoodButtonDisabled}
          >
            {t('Adjust Factor Loadings')}
          </ExtractionButton>
        </ButtonContainer>
      </Container>
    );
  } else {
    return null;
  }
};

export default HeywoodCaseNotification;

const TextSpanLabel = styled.div`
  margin-top: 25px;
  margin-left: 70px;
  margin-right: 10px;
  width: 750px;
  display: block;
`;

const HorozontalRule = styled.div`
  display: block;
  margin-left: 70px;
  height: 1px;
  width: 700px;
  border: 0;
  border-top: 1px solid black;
  padding: 0;
`;

const ExtractionButton = styled(GeneralButton)`
  margin-top: 25px;
  margin-left: 70px;
  width: 200px;
`;

const HeywoodText = styled.div`
  margin-top: 10px;
  width: 680px;
  font-size: 15px;
  margin-left: 80px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 820px;
`;

const HeywoodTable = styled.div`
  padding-top: 25px;
  padding-bottom: 15px;
  padding-left: 80px;

  table,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 5px;
  }

  tr:nth-child(even) {
    background-color: #eee;
  }

  tr:hover {
    background-color: rgba(131, 202, 254, 0.6);
  }

  .center {
    text-align: center;
  }
`;

const Container = styled.div`
  margin-top: 25px;
`;
