import React from 'react';
import styled from 'styled-components';
import { view } from '@risingstack/react-easy-state';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import doHeywoodAdjustment from '../centroidLogic/horst55Logic/doHeywoodAdjustment';
import i18n from 'i18next';
import factorState from '../../GlobalState/factorState';
import appState from '../../GlobalState/appState';
import rotationState from '../../GlobalState/rotationState';
import projectHistoryState from '../../GlobalState/projectHistoryState';
import getProjectHistoryState from '../../GlobalState/getProjectHistoryState';
import getFactorState from '../../GlobalState/getFactorState';

// set default state on first load
factorState.heywoodAdjustButtonActive = false;
factorState.heywoodContinueButtonActive = false;

const HeywoodCaseNotification = () => {
  const { t } = useTranslation();

  const handleReselectClick = (event) => {
    factorState.isCentroidFacSelectDisabled = false;
    factorState.isCentroidExtractButtonDisabled = false;

    // remove previous log entry
    const projectHistoryArray = getProjectHistoryState('projectHistoryArray');
    projectHistoryArray.pop();
    projectHistoryState.projectHistoryArray = projectHistoryArray;

    factorState.showUnrotatedFactorTable = false;
    factorState.showEigenvaluesTable = false;
    factorState.showScreePlot = false;
    factorState.showKeepFacForRotButton = false;
    factorState.showHeywoodCaseNotifications = false;
  };

  const handleContinueClick = () => {
    const projectHistoryArray = getProjectHistoryState('projectHistoryArray');
    const heywoodParticipantsTextJoin = getFactorState('heywoodParticipantsTextJoin');

    const projectLogText3 = `${i18n.t(
      'Heywood Case Participants'
    )}: ${heywoodParticipantsTextJoin}. ${i18n.t('Factor Loadings not adjusted')}.`;

    const logMessageObj1 = {
      logMessage: projectLogText3,
      logType: 'HeywoodAdjustment'
    };

    const newProjectHistoryArray = [...projectHistoryArray, logMessageObj1];
    projectHistoryState.projectHistoryArray = newProjectHistoryArray;

    factorState.showUnrotatedFactorTable = true;
    factorState.showEigenvaluesTable = true;
    factorState.showScreePlot = true;
    factorState.showKeepFacForRotButton = true;
    factorState.heywoodButtonDisabled = true;
    appState.isFactorsButtonGreen = true;
    factorState.heywoodContinueButtonActive = true;
    rotationState.showKeepFacForRotButton = true;
  };

  const handleAdjustClick = () => {
    doHeywoodAdjustment();
    factorState.showUnrotatedFactorTable = true;
    factorState.showEigenvaluesTable = true;
    factorState.showScreePlot = true;
    factorState.showKeepFacForRotButton = true;
    factorState.heywoodButtonDisabled = true;
    appState.isFactorsButtonGreen = true;
    factorState.heywoodAdjustButtonActive = true;
  };

  const heywoodContinueButtonActive = getFactorState('heywoodContinueButtonActive');
  const heywoodAdjustButtonActive = getFactorState('heywoodAdjustButtonActive');
  const heywoodReselectButtonActive = false;
  const heywoodButtonDisabled = getFactorState('heywoodButtonDisabled');
  const showHeywoodCaseNotifications = getFactorState('showHeywoodCaseNotifications');
  const heywoodParticipantsCommunalities = getFactorState('heywoodParticipantsCommunalityArray');

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

export default view(HeywoodCaseNotification);

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
