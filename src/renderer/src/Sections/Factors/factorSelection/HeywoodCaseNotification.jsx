import { useEffect } from 'react';
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
  const projectHistoryArray = projectHistoryState((state) => state.projectHistoryArray);
  const heywoodParticipantsTextJoin = factorState((state) => state.heywoodParticipantsTextJoin);
  const heywoodContinueButtonActive = factorState((state) => state.heywoodContinueButtonActive);
  const heywoodAdjustButtonActive = factorState((state) => state.heywoodAdjustButtonActive);
  const heywoodButtonDisabled = factorState((state) => state.heywoodButtonDisabled);
  const showHeywoodCaseNotifications = factorState((state) => state.showHeywoodCaseNotifications);
  const heywoodParticipantsCommunalities = factorState(
    (state) => state.heywoodParticipantsCommunalityArray
  );

  useEffect(() => {
    updateHeywoodAdjustButtonActive(false);
    updateHeywoodContinueButtonActive(false);
  }, []);

  const handleReselectClick = () => {
    updateIsCentroidFacSelectDisabled(false);
    updateIsCentroidExtractButtonDisabled(false);
    projectHistoryArray.pop();
    updateProjectHistoryArray(projectHistoryArray);
    updateShowUnrotatedFactorTable(false);
    updateShowEigenvaluesTable(false);
    updateShowScreePlot(false);
    updateShowKeepFacForRotButton(false);
    updateShowHeywoodCaseNotifications(false);
  };

  const handleContinueClick = () => {
    const projectLogText3 = `${i18n.t('Heywood Case Participants')}: ${heywoodParticipantsTextJoin}. ${i18n.t('Factor Loadings not adjusted')}.`;
    const logMessageObj1 = { logMessage: projectLogText3, logType: 'HeywoodAdjustment' };
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

  const heywoodReselectButtonActive = false;

  if (!showHeywoodCaseNotifications) return null;

  return (
    <div className="mt-[25px]">
      <div className="block mt-[25px] ml-[70px] mr-[10px] w-[750px]">
        {t('Heywood Case Participants')}
      </div>
      <div className="block ml-[70px] h-[1px] w-[700px] border-0 border-t border-t-black p-0" />
      <div className="pt-[25px] pb-[15px] pl-[80px] [&_table]:border-collapse [&_table,&_th,&_td]:border [&_table,&_th,&_td]:border-black [&_th,&_td]:p-[5px] [&_tr:nth-child(even)]:bg-[#eee] [&_tr:hover]:bg-[rgba(131,202,254,0.6)] [&_.center]:text-center">
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
      </div>
      <div className="mt-[10px] w-[680px] text-[15px] ml-[80px]">
        {`${t('heywoodMessage1')}. ${t('heywoodMessage2')}. ${t('heywoodMessage3')}.`}
      </div>
      <div className="flex flex-row w-[820px] ml-[75px] mt-[25px] gap-4">
        <GeneralButton
          onClick={handleContinueClick}
          isActive={heywoodContinueButtonActive}
          disabled={heywoodButtonDisabled}
          className={`mt-[25px] ml-[70px] w-[200px] ${heywoodContinueButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        >
          {t('Continue Analysis')}
        </GeneralButton>
        <GeneralButton
          onClick={handleReselectClick}
          isActive={heywoodReselectButtonActive}
          disabled={heywoodButtonDisabled}
          className={`mt-[25px] ml-[70px] w-[200px] ${heywoodReselectButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        >
          {t('ReSelect Num Factors')}
        </GeneralButton>
        <GeneralButton
          onClick={handleAdjustClick}
          isActive={heywoodAdjustButtonActive}
          disabled={heywoodButtonDisabled}
          className={`mt-[25px] ml-[70px] w-[200px] ${heywoodAdjustButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        >
          {t('Adjust Factor Loadings')}
        </GeneralButton>
      </div>
    </div>
  );
};

export default HeywoodCaseNotification;
