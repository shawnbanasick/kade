import React from 'react';

import styled, { keyframes } from 'styled-components';
import { ToastContainer, Zoom } from 'react-toastify';
// import { useTranslation } from "react-i18next";
import DocxContentSelectionPanel from './DocxContentSelectionPanel';
import outputState from '../../GlobalState/outputState';
// import i18n from "i18next";

function OptionsBox() {
  // put here to be able to use React hook for t
  //  function notify() {
  // toast.success(t("File Load Success"));
  // inputState.notifyDataUploadSuccess = false;
  // }

  let displayState = outputState.showDocxOptions;

  // const { t } = useTranslation();

  return (
    <React.Fragment>
      <MainContent>{displayState && <DocxContentSelectionPanel />}</MainContent>
      <ToastContainer transition={Zoom} />
    </React.Fragment>
  );
}

export default OptionsBox;

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
  visibility: ${(props) => (props.view ? 'hidden' : 'visible')};
  animation: ${(props) => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;

  width: 500px;
  height: 550px;
  box-sizing: border-box;
  overflow: auto;
  margin-bottom: 150px;
  margin-right: 50px;

  .ui.attached.tabular.menu {
    background-color: #d6dbe0;
    height: 45px;
  }

  .ui.bottom.attached.segment.active.tab {
    border-bottom-color: white;
    border-left-color: white;
  }
`;
