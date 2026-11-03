import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';

const ExportQuinceData = () => {
  const { t } = useTranslation();
  // getState
  const isActive = inputState((state) => state.isShowNetlifyInputButtonGreen);
  const isDisabled = inputState((state) => state.disabledNetlifyButton);
  const updateShowSheetsInput = inputState((state) => state.updateShowSheetsInput);
  const updateShowNetlifyInput = inputState((state) => state.updateShowNetlifyInput);
  const updateShowFirebaseInput = inputState((state) => state.updateShowFirebaseInput);
  const updateIsShowSheetsInputButtonGreen = inputState(
    (state) => state.updateIsShowSheetsInputButtonGreen
  );
  const updateIsShowFirebaseInputButtonGreen = inputState(
    (state) => state.updateIsShowFirebaseInputButtonGreen
  );
  const updateIsShowNetlifyInputButtonGreen = inputState(
    (state) => state.updateIsShowNetlifyInputButtonGreen
  );

  const handleOnclick = async () => {
    const data = [1, 2, 3, 4, 5]; // Example data to export
    const dataContent = {
      type: 'QuinceResults',
      // docOptions,
      // translatedTextObj,
      data: [...data],
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
