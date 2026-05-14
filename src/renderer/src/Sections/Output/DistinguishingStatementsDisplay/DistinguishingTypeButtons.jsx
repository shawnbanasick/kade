import outputState from '../../GlobalState/outputState';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';

const DistinguishingTypeButtons = () => {
  const { t } = useTranslation();
  const stephensonMethodButtonActive = outputState((state) => state.stephensonMethodButtonActive);
  const cohenMethodButtonActive = outputState((state) => state.cohenMethodButtonActive);

  const handleOnclick = (event) => {
    const buttonId = event.target.id;
    if (buttonId === 'stephensonMethodButton') {
      outputState.setState({ distIdentType: 'stephensonMethod' });
      outputState.setState({ stephensonMethodButtonActive: true });
      outputState.setState({ cohenMethodButtonActive: false });
    }
    if (buttonId === 'cohenMethodButton') {
      outputState.setState({ distIdentType: 'cohenMethod' });
      outputState.setState({ stephensonMethodButtonActive: false });
      outputState.setState({ cohenMethodButtonActive: true });
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="mr-2.5 text-xl mb-2  font-bold">
        {t('Select Method for Identifying Distinguishing Statements')}:
      </div>
      <GeneralButton
        id="stephensonMethodButton"
        onClick={handleOnclick}
        key="f2"
        className={`min-w-30 ${stephensonMethodButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
      >
        {t('Stephenson')}
      </GeneralButton>
      <GeneralButton
        id="cohenMethodButton"
        onClick={handleOnclick}
        key="f3"
        className={`min-w-30 ${cohenMethodButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
      >
        {t("Cohen's d")}
      </GeneralButton>
    </div>
  );
};

export default DistinguishingTypeButtons;
