import UnforcedSortsDisplayButton from './UnforcedSortsDisplayButton';
import { useTranslation } from 'react-i18next';

const UnforcedSortsDisplay = (props) => {
  const { t } = useTranslation();

  if (props.display === true) {
    return (
      <div className="flex flex-row font-bold items-baseline justify-end">
        <div className="mr-[20px] text-[clamp(1.0rem,1.4vw,1.6rem)]">{t('Confirm Q Sorts')}:</div>
        <UnforcedSortsDisplayButton number={0} />
      </div>
    );
  } else {
    return (
      <div className="flex flex-row font-bold ">
        <div className="mr-[10px] mt-2 text-[clamp(1.3rem,1.5vw,1.8rem)]">
          {t('Confirm Q Sorts')}:
        </div>
        <UnforcedSortsDisplayButton number={props.number} />
      </div>
    );
  }
};

export default UnforcedSortsDisplay;
