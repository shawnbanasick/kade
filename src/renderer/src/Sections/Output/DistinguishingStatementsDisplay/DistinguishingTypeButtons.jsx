import outputState from '../../GlobalState/outputState';
import coreState from '../../GlobalState/coreState';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';

const DistinguishingTypeButtons = (props) => {
  const { t } = useTranslation();
  const stephensonMethodButtonActive = outputState((state) => state.stephensonMethodButtonActive);
  const cohenMethodButtonActive = outputState((state) => state.cohenMethodButtonActive);
  const projectName = coreState((state) => state.projectName);
  const conStephensonDataForExport = outputState((state) => state.conStephensonDataForExport);
  const conCohenDataForExport = outputState((state) => state.conCohenDataForExport);

  const handleOnclick = (type) => {
    if (type === 'stephensonMethod') {
      outputState.setState({ distIdentType: 'stephensonMethod' });
      outputState.setState({ stephensonMethodButtonActive: true });
      outputState.setState({ cohenMethodButtonActive: false });
    }
    if (type === 'cohenMethod') {
      outputState.setState({ distIdentType: 'cohenMethod' });
      outputState.setState({ stephensonMethodButtonActive: false });
      outputState.setState({ cohenMethodButtonActive: true });
    }
  };

  const handleDownload = async (origin) => {
    if (origin === 'consensus') {
      let cohenExcelData = JSON.parse(JSON.stringify(props.cohenData));
      cohenExcelData = cohenExcelData.filter((item) => +item.cutoffLevel > 0);
      cohenExcelData = cohenExcelData.sort((a, b) => a.cutoffLevel - b.cutoffLevel);

      const data = props.exportData; // Replace with actual data from store
      data.sort((a, b) => b.highestLevel - a.highestLevel);
      const dataContent = {
        projectName: projectName,
        type: 'ConExcel',
        conStephensonData: data,
        conCohenData: cohenExcelData,
      };

      const newBlob = new Blob([JSON.stringify(dataContent)], { type: 'text/plain' });
      const arrayBuffer = await new Response(newBlob).arrayBuffer();

      try {
        window.bridge.sendLargeData('large-data', arrayBuffer, 'path');
      } catch (error) {
        console.error('Failed to save Consent Statements List file:', error);
      }
    } else if (origin === 'distinguishing') {
      // Implement download logic for distinguishing statements if needed
      console.log('Download distinguishing statements - not implemented yet');
    }
    return null;
  };

  return (
    <div className={`flex items-center gap-3 w-full justify-between ${props.className}`}>
      <div className="flex flex-row gap-4">
        <div className={`text-${props.textSize} mb-2  font-bold`}>
          {t('selectMethodForIdentifyingDistinguishingStatements')}:
        </div>
        <GeneralButton
          id="stephensonMethodButton"
          onClick={() => handleOnclick('stephensonMethod')}
          key="f2"
          className={`min-w-30 ${stephensonMethodButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        >
          {t('stephenson')}
        </GeneralButton>
        <GeneralButton
          id="cohenMethodButton"
          onClick={() => handleOnclick('cohenMethod')}
          key="f3"
          className={`min-w-30 ${cohenMethodButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        >
          <div>
            {t('cohens')} <i>d</i>
          </div>
        </GeneralButton>
      </div>
      <GeneralButton
        id="bothMethodsButton"
        onClick={() => handleDownload(props.origin)}
        key="f4"
        className={`min-w-30 ${stephensonMethodButtonActive && cohenMethodButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
      >
        {t('Download Data')}
      </GeneralButton>
    </div>
  );
};

export default DistinguishingTypeButtons;
