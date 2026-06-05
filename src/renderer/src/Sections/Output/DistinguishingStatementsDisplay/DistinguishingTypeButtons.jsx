import outputState from '../../GlobalState/outputState';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';

const DistinguishingTypeButtons = (props) => {
  const { t } = useTranslation();
  const stephensonMethodButtonActive = outputState((state) => state.stephensonMethodButtonActive);
  const cohenMethodButtonActive = outputState((state) => state.cohenMethodButtonActive);

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

  return (
    <div className={`flex items-center gap-3 ${props.className}`}>
      <div className={`text-${props.textSize} mr-2.5 mb-2  font-bold`}>
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
  );
};

export default DistinguishingTypeButtons;
