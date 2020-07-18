import { Tab } from "semantic-ui-react";
import React from "react";
import { view, store } from "react-easy-state";
import styled, { keyframes } from "styled-components";
import { ToastContainer, toast, Zoom } from "react-toastify";
import CsvPanel from "./CsvPanel";
import JsonPanel from "./JsonPanel";
import ExcelPanel from "./ExcelPanel";
import KandedPanel from "./KandedPanel";
import PQMethodPanel from "./PQMethodPanel";
import DemoDataPanel from "./DemoDataPanel";
import ErrorNotification from "./ErrorNotification";
import { useTranslation } from "react-i18next";
import inputState from "../GlobalState/inputState";
// import i18n from "i18next";

const localStore = store({
  activeIndex: 0
});

function Input() {
  // put here to be able to use React hook for t
  function notify() {
    toast.success(t("File Load Success"));
    inputState.notifyDataUploadSuccess = false;
  }

  const { t } = useTranslation();

  const panes = [
    {
      menuItem: t("CSV"),
      render: () => (
        <Tab.Pane>
          <CsvPanel notify={notify} />
        </Tab.Pane>
      )
    },
    {
      menuItem: t("Excel"),
      render: () => (
        <Tab.Pane>
          <ExcelPanel />
        </Tab.Pane>
      )
    },
    {
      menuItem: t("KADE"),
      render: () => (
        <Tab.Pane>
          <KandedPanel />
        </Tab.Pane>
      )
    },
    {
      menuItem: t("JSON"),
      render: () => (
        <Tab.Pane>
          <JsonPanel />
        </Tab.Pane>
      )
    },
    {
      menuItem: t("PQMethod"),
      render: () => (
        <Tab.Pane>
          <PQMethodPanel />
        </Tab.Pane>
      )
    },
    {
      menuItem: t("Demo Data"),
      render: () => (
        <Tab.Pane>
          <DemoDataPanel />
        </Tab.Pane>
      )
    }
  ];

  const handleTabChange = (e, { activeIndex }) => {
    localStore.activeIndex = activeIndex;
  };

  const { activeIndex } = localStore;
  const showNotification = inputState.notifyDataUploadSuccess;
  if (showNotification) {
    notify();
  }
  return (
    <React.Fragment>
      <ToastContainer transition={Zoom} />
      <MainContent>
        <Tab
          panes={panes}
          activeIndex={activeIndex}
          onTabChange={handleTabChange}
        />
        <ErrorNotification />
      </MainContent>
    </React.Fragment>
  );
}

export default view(Input);

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
  visibility: ${props => (props.view ? "hidden" : "visible")};
  animation: ${props => (props.view ? fadeOut : fadeIn)} 0.5s linear;
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
