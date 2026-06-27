import outputState from '../GlobalState/outputState';
import coreState from '../GlobalState/coreState';
import GeneralButton from '../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';

const DistinguishingTypeButtons = (props) => {
  const { t } = useTranslation();
  const resultsStephensonMethodButtonActive = outputState(
    (state) => state.resultsStephensonMethodButtonActive
  );
  const resultsCohenMethodButtonActive = outputState(
    (state) => state.resultsCohenMethodButtonActive
  );
  const projectName = coreState((state) => state.projectName);

  const handleOnclick = (type) => {
    if (type === 'stephensonMethod') {
      outputState.setState({ resultsDistIdentType: 'stephensonMethod' });
      outputState.setState({ resultsStephensonMethodButtonActive: true });
      outputState.setState({ resultsCohenMethodButtonActive: false });
    }
    if (type === 'cohenMethod') {
      outputState.setState({ resultsDistIdentType: 'cohenMethod' });
      outputState.setState({ resultsStephensonMethodButtonActive: false });
      outputState.setState({ resultsCohenMethodButtonActive: true });
    }
  };

  return (
    <div className={`flex items-center gap-3 w-full justify-between ${props.className}`}>
      <div className="flex flex-row items-center gap-4">
        <div className={`text-${props.textSize} mb-2  font-bold`}>
          1. {t('selectMethodForIdentifyingDistinguishingStatements')}:
        </div>
        <GeneralButton
          id="stephensonMethodButton"
          onClick={() => handleOnclick('stephensonMethod')}
          key="f2"
          className={`min-w-30 h-10 ${resultsStephensonMethodButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        >
          {t('stephenson')}
        </GeneralButton>
        <GeneralButton
          id="cohenMethodButton"
          onClick={() => handleOnclick('cohenMethod')}
          key="f3"
          className={`min-w-30 h-10 ${resultsCohenMethodButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        >
          <div>
            {t('cohens')} <i>d</i>
          </div>
        </GeneralButton>
      </div>
    </div>
  );
};

export default DistinguishingTypeButtons;
