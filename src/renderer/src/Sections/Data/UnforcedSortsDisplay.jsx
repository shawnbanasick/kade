import ConfirmButton from './UnforcedSortsDisplayButton';
import { useTranslation } from 'react-i18next';

const UnforcedSortsDisplay = (props) => {
  const { t } = useTranslation();

  if (props.display === true) {
    return (
      <div className="flex font-bold items-baseline">
        <div className="mr-[10px] text-[clamp(1.3rem,1.5vw,1.8rem)]">{t('Confirm Q Sorts')}:</div>
        <ConfirmButton number={0} />
      </div>
    );
  } else {
    return (
      <div className="flex font-bold items-baseline">
        <div className="mr-[10px] text-[clamp(1.3rem,1.5vw,1.8rem)]">{t('Confirm Q Sorts')}:</div>
        <ConfirmButton number={props.number} />
      </div>
    );
  }
};

export default UnforcedSortsDisplay;
