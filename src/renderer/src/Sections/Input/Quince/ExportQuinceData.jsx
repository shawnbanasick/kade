import { useTranslation } from 'react-i18next';

import inputState from '../../GlobalState/inputState';
import GeneralButton from '../../../Utils/GeneralButton';

const ExportQuinceData = () => {
  const { t } = useTranslation();
  // getState
  const isActive = inputState((state) => state.isShowNetlifyInputButtonGreen);
  const isDisabled = inputState((state) => state.isImportConfigXmlButtonDisabled);
  const quinceRawData = inputState((state) => state.quinceRawData);
  const quinceExportConfigXmlData = inputState((state) => state.quinceExportConfigXmlData);

  const translatedTextObj = {
    randomId: t('Random ID'),
    urlUsercode: t('URL Usercode'),
    participantId: t('Participant ID'),
    deviceType: t('Device Type'),
    dateTime: t('Date and Time'),
    timeWelcome: t('Welcome Page'),
    timeConsent: t('Consent Page'),
    timePresort: t('Pre-sort Page'),
    timeRefine: t('Refinement Page'),
    timeSort: t('Sort Page'),
    timePostsort: t('Post-sort Page'),
    timeSurvey: t('Survey Page'),
    pos: t('Pre-sort Positive'),
    neg: t('Pre-sort Negative'),
    neu: t('Pre-sort Neutral'),
    mainData: t('Main Data'),
    projectInfo: t('Project Information'),
    projectName: t('Project Name'),
    statements: t('Statements'),
    statement: t('Statement'),
    qSorts: t('Q Sorts'),
    noPartId: t('No Participant ID'),
    noUrlUsercode: t('No URL Usercode'),
    noInfo: t('No Information'),
    presortTracing: t('Presort Tracing'),
    noUnusual: t('No Unusual Statements'),
    posToNeg: t('Positive → Negative side'),
    negToPos: t('Negative → Positive side'),
    surveyResponses: t('Survey Responses'),
    participantNum: t('Participant #'),
    responded: t('Responded'),
    noResponse: t('No Response'),
    totalParticipants: t('Total Participants'),
    textOther: t('Text entered with "Other" options'),
    text: t('Text'),
    counts: t('Counts'),
    mean: t('Mean'),
    percentRespondents: t('Percent of Respondents'),
    option: t('Option'),
    count: t('Count'),
    percent: t('Percent'),
    noResponses: t('No Responses'),
    presortValues: t('Pre-sort Values'),
    qSortValue: t('Q Sort Value'),
    pattern: t('Pattern'),
    quinceFileSaved: t('Quince file saved successfully!'),
    fileSavedTo: t('File saved to:'),
    participant: t('Participant'),
  };

  const handleOnclick = async () => {
    const dataContent = {
      type: 'QuinceResults',
      translatedTextObj,
      data: quinceRawData,
      surveyQuestions: quinceExportConfigXmlData,
    };
    const newBlob = new Blob([JSON.stringify(dataContent)], { type: 'text/plain' });
    const arrayBuffer = await new Response(newBlob).arrayBuffer();
    try {
      window.bridge.sendLargeData('large-data', arrayBuffer, 'path');
    } catch (error) {
      console.error('Failed to export Quince data:', error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 p-2 h-[205px] w-[250px]">
      <GeneralButton
        id="NetlifyButton"
        onClick={handleOnclick}
        disabled={isDisabled}
        className={`min-w-[120px] ${isActive ? 'bg-primary-button' : 'bg-gray-300 outline outline-1 outline-gray-400'}`}
      >
        {t('Export Quince Data')}
      </GeneralButton>
    </div>
  );
};

export default ExportQuinceData;
