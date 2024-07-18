import { Tab } from 'semantic-ui-react';
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import inputState from '../GlobalState/inputState';
import JsonPanel from './JsonPanel';
import ExcelPanel from './ExcelPanel';
import Excel3Panel from './KandedPanel';
import PQMethodPanel from './PQMethodPanel';
import KadeZipPanel from './KadeZipPanel';
import DemoDataPanel from './DemoDataPanel';
// import ErrorNotification from './ErrorChecking/ErrorNotification';
// import WarningNotification from './ErrorChecking/WarningNotification';
import { useTranslation } from 'react-i18next';
// import getInputState from '../GlobalState/getInputState';
// import i18n from "i18next";

function Input() {
  const [activeIndex, setActiveIndex] = useState(0);

  const showNotification = inputState((state) => state.notifyDataUploadSuccess);
  const updateNotifyDataUploadSuccess = inputState((state) => state.updateNotifyDataUploadSuccess);

  // put here to be able to use React hook for t
  const notify = async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    await toast.success(t('File Load Success'));
    await updateNotifyDataUploadSuccess(false);
  };

  const { t } = useTranslation();

  const panes = [
    /*
    
    */
    {
      menuItem: t('XLSX'),
      render: () => (
        <Tab.Pane>
          <ExcelPanel />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'KADE XLSX',
      render: () => (
        <Tab.Pane>
          <Excel3Panel />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'KADE ZIP',
      render: () => (
        <Tab.Pane>
          <KadeZipPanel />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'EQ Web Sort',
      render: () => (
        <Tab.Pane>
          <JsonPanel />
        </Tab.Pane>
      ),
    },
    {
      menuItem: t('PQMethod'),
      render: () => (
        <Tab.Pane>
          <PQMethodPanel />
        </Tab.Pane>
      ),
    },

    {
      menuItem: t('Demo Data'),
      render: () => (
        <Tab.Pane>
          <DemoDataPanel />
        </Tab.Pane>
      ),
    },
  ];

  const handleTabChange = (e, { activeIndex }) => {
    setActiveIndex(activeIndex);
  };

  if (showNotification) {
    notify();
  }
  return (
    <React.Fragment>
      <ToastContainer transition={Zoom} />
      <MainContent>
        <Tab panes={panes} activeIndex={activeIndex} onTabChange={handleTabChange} />
        {/* <ErrorNotification /> */}
        {/* <WarningNotification /> */}
      </MainContent>
    </React.Fragment>
  );
}

export default Input;

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

// #d6dbe0;
const MainContent = styled.div`
  background-color: white;
  visibility: ${(props) => (props.view ? 'hidden' : 'visible')};
  animation: ${(props) => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;

  width: calc(100vw - 135px);
  box-sizing: border-box;
  height: 100vh;
  overflow: auto;

  .ui.attached.tabular.menu {
    background-color: #d6dbe0;
    height: 45px;
  }

  .ui.bottom.attached.segment.active.tab {
    border-bottom-color: white;
    border-left-color: white;
  }
`;

/*
{
      menuItem: t("CSV"),
      render: () => (
        <Tab.Pane>
          <CsvPanel notify={notify} />
        </Tab.Pane>
      )
    },
    */
