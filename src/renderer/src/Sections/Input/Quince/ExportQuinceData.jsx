import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';

const ExportQuinceData = () => {
  const { t } = useTranslation();
  // getState
  const isActive = inputState((state) => state.isShowNetlifyInputButtonGreen);
  const isDisabled = inputState((state) => state.isImportConfigXmlButtonDisabled);
  const quinceRawData = inputState((state) => state.quinceRawData);
  const quinceExportConfigXmlData = inputState((state) => state.quinceExportConfigXmlData);

  // console.log('quinceRawData in ExportQuinceData.jsx:', JSON.stringify(quinceRawData[0].sort));
  // console.log('quinceRawData columns in ExportQuinceData.jsx:', JSON.stringify(quinceRawData[0].columns));
  console.log(
    'quinceRawData presortTrace in ExportQuinceData.jsx:',
    JSON.stringify(quinceRawData?.[0], null, 2)
  );

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
  };

  const handleOnclick = async () => {
    const dataContent = {
      type: 'QuinceResults',
      // docOptions,
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
