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
    console.log('handleOnclick type:', type, 'origin:', origin);
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

  console.log('DistinguishingTypeButtons conStephensonDataForExport:', props.data1);

  const handleDownload = async (origin) => {
    if (origin === 'consensus') {
      console.log('handleDownload origin:', origin);
      // const dataXlsx = 'test data for consensus statements'; // Replace with actual data from store
      const dataContent = {
        projectName: projectName,
        type: 'ConExcel',
        conStephensonData: props.data1, // Replace with actual data from store
        // conCohenData: props.data2, // Replace with actual data from store
      };

      const newBlob = new Blob([JSON.stringify(dataContent)], { type: 'text/plain' });
      const arrayBuffer = await new Response(newBlob).arrayBuffer();

      try {
        // const buffer = new Uint8Array(data).buffer;
        window.bridge.sendLargeData('large-data', arrayBuffer, 'path');

        // const result = await window.electronAPI.saveDocx(docxContent.buffer, filepath);
        // console.log(result);
      } catch (error) {
        console.error('Failed to save file:', error);
      }
    } else {
      // Implement download logic for distinguishing statements here
    }
    // Implement download logic here, using the selected method (stephensonMethod or cohenMethod)
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
