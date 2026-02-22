import GeneralButton from '../../../Utils/GeneralButton';
import getInputState from '../../GlobalState/getInputState';
import { useTranslation } from 'react-i18next';

const handleOnclick = () => {
  console.log('no content');
};

const CsvDataErrorCheckButton = (props) => {
  const { t } = useTranslation();

  const isActive = getInputState('isCsvDataErrorCheckButtonGreen');
  const showDataImportSuccessMessage = getInputState('showDataImportSuccessMessage');

  return (
    <div className="flex flex-row mt-[20px] items-baseline [grid-column-start:1] w-[900px]">
      <div className="text-[20px] mr-[10px] ml-[8px]">
        <b>{props.number}</b> {t('Confirm Data Input')}
      </div>
      <GeneralButton
        id="csvDataErrorCheckButton"
        $isActive={isActive}
        onClick={handleOnclick}
        className={[
          'mr-[5px]',
          'focus:outline-none',
          'disabled:pointer-events-none disabled:opacity-70',
          isActive
            ? 'shadow-[inset_0_0_0_2px_#666,0_0_1px_transparent] hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent]'
            : 'bg-orange-500 shadow-[inset_0_0_0_0px_#666,0_0_0px_transparent] hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent]',
        ].join(' ')}
      >
        {t('Check for Errors')}
      </GeneralButton>
      {showDataImportSuccessMessage && (
        <div className="text-[20px] mr-[10px] ml-[8px]">{t('No errors found')}.</div>
      )}
    </div>
  );
};

export default CsvDataErrorCheckButton;
