import { view } from "react-easy-state";
import React from "react";
import styled, { keyframes } from "styled-components";
import CorrelationTable from "./CorrelationTable/CorrelationTable";
import CalculateCorrelationsButton from "./CalculateCorrelationsButton";
import ErrorNotification from "../Input/ErrorNotification";
import correlationState from "../GlobalState/correlationState";
import appState from "../GlobalState/appState";
import { useTranslation } from "react-i18next";

const Correlations = () => {
  const { t } = useTranslation();

  // getState
  const showCorrelationMatrix = correlationState.showCorrelationMatrix;
  const isDataButtonGreen = appState.isDataButtonGreen;

  return (
    <MainContent>
      <Container1>
        {isDataButtonGreen ? (
          <CalculateCorrelationsButton />
        ) : (
          <DefaultMessage>{t("No data loaded")}</DefaultMessage>
        )}
      </Container1>
      <Container2>
        {showCorrelationMatrix ? (
          <CorrelationTable />
        ) : (
          <DefaultMessage>{t("No correlations calculated")}</DefaultMessage>
        )}
      </Container2>
      <ErrorNotification />
    </MainContent>
  );
};

export default view(Correlations);

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

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 70px 1fr;
  padding-left: 20px;
  grid-template-areas:
    "header header header"
    "main main main"
    "footer footer footer";
  justify-items: start;
  align-items: center;
  background-color: white;
  visibility: ${props => (props.view ? "hidden" : "visible")};
  animation: ${props => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;
  width: calc(100vw - 135px);
  overflow: auto;
  user-select: none;
`;

const Container1 = styled.div`
  grid-area: header;
  justify-self: start;
`;

const Container2 = styled.div`
  grid-area: main;
  justify-self: start;
`;

const DefaultMessage = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  font-size: 22px;
`;
