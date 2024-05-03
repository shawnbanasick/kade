import { Tab } from 'semantic-ui-react';
import React from 'react';
import { view } from '@risingstack/react-easy-state';
import styled, { keyframes } from 'styled-components';
import rotationState from '../GlobalState/rotationState';
import FactorsKeptNotification from './FactorKeepSelection/FactorsKeptNotification';
import JudgementalRotationContainer from './JudgementalRotation/JudgementalRotationContainer';
import FireVarimaxButton from './RotationButtons/FireVarimaxButton';
import InitializeJudgementalButton from './RotationButtons/InitializeJudgmentalButton';
import FactorSelectButtons from './FactorKeepSelection/FactorSelectButtons';
import FactorSelectButtonModal from './FactorKeepSelection/FactorSelectButtonModal';
import { useTranslation } from 'react-i18next';
import VarimaxHeywoodWarning from './RotationButtons/VarimaxHeywoodWarning';
import getRotationState from '../GlobalState/getRotationState';

let showKeepFacForRotButton;

const getPanes = (
  optionsTrans,
  varimaxTrans,
  judgmentalTrans,
  numberFactorsKeepTrans,
  extractFactorsFirstTrans
) => {
  return [
    {
      menuItem: optionsTrans,
      render: () => (
        <Tab.Pane>
          <DataWindow1>
            {showKeepFacForRotButton ? (
              <DropdownText>{numberFactorsKeepTrans} </DropdownText>
            ) : (
              <DropdownText>{extractFactorsFirstTrans}</DropdownText>
            )}
            <ButtonBar>
              <FactorSelectButtons />
              <FactorSelectButtonModal />
            </ButtonBar>
            <FactorsKeptNotification />
          </DataWindow1>
        </Tab.Pane>
      )
    },
    {
      menuItem: varimaxTrans,
      render: () => (
        <Tab.Pane>
          <DataWindow2>
            <FireVarimaxButton />
            <VarimaxHeywoodWarning />
          </DataWindow2>
        </Tab.Pane>
      )
    },
    {
      menuItem: judgmentalTrans,
      render: () => (
        <Tab.Pane>
          <DataWindow2>
            <InitializeJudgementalButton />
            <JudgementalRotationContainer />
          </DataWindow2>
        </Tab.Pane>
      )
    }
  ];
};

const Rotation = () => {
  const { t } = useTranslation();

  // located here so panes are updated on translation change re-render
  const optionsTrans = t('Options');
  const varimaxTrans = t('Varimax');
  const judgmentalTrans = t('Judgmental');
  const numberFactorsKeepTrans = t('Number of factors to keep for rotation');
  const extractFactorsFirstTrans = t('Extract factors first');

  const panes = getPanes(
    optionsTrans,
    varimaxTrans,
    judgmentalTrans,
    numberFactorsKeepTrans,
    extractFactorsFirstTrans
  );

  const handleTabChange = (e, { activeIndex }) => {
    rotationState.rotationActiveTabIndex = activeIndex;
  };

  // getState
  const rotationActiveTabIndex = getRotationState('rotationActiveTabIndex');
  showKeepFacForRotButton = getRotationState('showKeepFacForRotButton');

  return (
    <MainContent>
      <Tab
        style={{ width: '100%', minHeight: 'calc(100%-22px)' }}
        panes={panes}
        activeIndex={rotationActiveTabIndex}
        onTabChange={handleTabChange}
      />
    </MainContent>
  );
};

export default view(Rotation);

const DataWindow1 = styled.div`
  display: grid;
  grid-template-rows: 50px 120px 150px 1fr;
  height: calc(100vh - 75px);
  background-color: white;
  max-width: 1197;
  user-select: none;
`;

const DataWindow2 = styled.div`
  background-color: white;
  overflow: scroll;
  padding: 5px;
  padding-top: 5px;
  padding-left: 5px;
  box-sizing: border-box;
  height: calc(100vh - 75px);
  overflow: auto;
  user-select: none;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const ButtonBar = styled.div`
  display: flex;
  flex-direction: row;
`;

const MainContent = styled.div`
  background-color: #d6dbe0;
  overflow: auto;

  background-color: #d6dbe0;
  visibility: ${(props) => (props.view ? 'hidden' : 'visible')};
  animation: ${(props) => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;

  box-sizing: border-box;
  width: calc(100vw - 135px);
  box-sizing: border-box;
  overflow: auto;

  .tabular-menu {
    display: grid;
    grid-template-columns: 100px 100px 140px 110px 150px 170px;
    background-color: #d6dbe0;
    padding-left: 20px !important;
    height: 45px;
    align-items: end;
    list-style: none;
    font-family: Helvetica;
    padding: 0;
    margin: 0;
    font-size: 25px;
  }

  .tabular-menu-item {
    display: grid;
    align-items: center;
    justify-items: center;
    margin-right: 20px;
    background-color: #d6dbe0;
    height: 80%;
    border-top: 5px solid #d6dbe0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .tabular-menu-item a {
    cursor: pointer;
    color: black;
  }

  .tabs-menu-item:not(.is-active):hover {
    color: #3498db;
    background-color: white;
  }

  .tabular-menu-item.is-active {
    color: #3498db;
    background-color: white;
    border-top: 5px solid #0080ff;
    transition: all 0.25s linear;
  }

  .tabular-panel {
    padding: 10px 50px;
    background-color: white;
    padding-left: 20px !important;
  }

  .ui.bottom.attached.segment.active.tab {
    border-bottom-color: white;
    border-left-color: white;
  }
`;

const DropdownText = styled.div`
  margin-right: 20px;
  margin-top: 10px;
  font-size: 22px;
`;
