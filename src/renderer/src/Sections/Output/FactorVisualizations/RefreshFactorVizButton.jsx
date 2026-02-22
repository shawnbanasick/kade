import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import vizState from '../../GlobalState/vizState';
import outputState from '../../GlobalState/outputState';

const RefreshFactorVizButton = () => {
  const { t } = useTranslation();
  const factorVizOptions = vizState((state) => state.factorVizOptions);
  const factorVizOptionsHolder = vizState((state) => state.factorVizOptionsHolder);
  const updateFactorVizOptions = vizState((state) => state.updateFactorVizOptions);
  const updateFactorVizOptionsHolder = vizState((state) => state.updateFactorVizOptionsHolder);
  const shouldDisplayFactorVizOptions = outputState((state) => state.shouldDisplayFactorVizOptions);
  const updateFactorVisualizationsButtonColor = vizState(
    (state) => state.updateFactorVisualizationsButtonColor
  );
  const factorVisualizationsButtonColor = vizState(
    (state) => state.factorVisualizationsButtonColor
  );

  const refresh = () => {
    const updateKeys = Object.keys(factorVizOptionsHolder);
    for (let i = 0; i < updateKeys.length; i += 1) {
      factorVizOptions[updateKeys[i]] = factorVizOptionsHolder[updateKeys[i]];
    }
    console.log('line 30', JSON.stringify(factorVizOptions, null, 2));
    updateFactorVizOptions({ ...factorVizOptions });
    updateFactorVizOptionsHolder({});
    updateFactorVisualizationsButtonColor('bg-primary-button');
  };

  return (
    <div className={`${shouldDisplayFactorVizOptions ? 'visible' : 'hidden'}`}>
      <div className="inline-flex mt-[10px] mb-[10px] ml-[20px]!">
        <GeneralButton
          id="refreshFactorVizButton"
          onClick={refresh}
          className={`${factorVisualizationsButtonColor}`}
        >
          {t('Update Factor Visualizations')}
        </GeneralButton>
      </div>
    </div>
  );
};

export default RefreshFactorVizButton;
