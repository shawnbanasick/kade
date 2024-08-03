import styled from 'styled-components';
import { Transition } from 'semantic-ui-react';
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

  const color = '#a5d6a7';

  const refresh = () => {
    const updateKeys = Object.keys(factorVizOptionsHolder);
    for (let i = 0; i < updateKeys.length; i += 1) {
      factorVizOptions[updateKeys[i]] = factorVizOptionsHolder[updateKeys[i]];
    }
    updateFactorVizOptions(factorVizOptions);
    updateFactorVizOptionsHolder({});
    updateFactorVisualizationsButtonColor(color);
  };

  return (
    <Transition visible={shouldDisplayFactorVizOptions} animation="fade" duration={1000}>
      <RefreshButtonContainerDiv>
        <RefreshButton
          as={GeneralButton}
          id="refreshFactorVizButton"
          onClick={refresh}
          $buttonColor={factorVisualizationsButtonColor}
        >
          {t('Update Factor Visualizations')}
        </RefreshButton>
      </RefreshButtonContainerDiv>
    </Transition>
  );
};

export default RefreshFactorVizButton;

const RefreshButtonContainerDiv = styled.div`
  margin-top: 10px;
  /* margin-top: ${(props) => `${props.marginTop}px`}; */
  /* margin-bottom: ${(props) => `${props.marginBottom}px`}; */
  margin-bottom: 10px;
  margin-left: 20px;
  display: inline-flex;
`;

const RefreshButton = styled.div`
  background-color: ${(props) => props.$buttonColor};
`;
