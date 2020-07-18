import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import factorState from "../../GlobalState/factorState";
import { useTranslation } from "react-i18next";

const HorstWarningMessage = () => {
  const { t } = useTranslation();
  const showHorstWarningMessage = factorState.didNotConverge;
  // const horstAutoStopYesActive = factorState.horstAutoStopYesActive;
  const horstIterations = factorState.horstIterations;

  if (showHorstWarningMessage) {
    return (
      <HorstNoConvergenceMessage>
        {`${t("No convergence")}: ${horstIterations} ${t("iterations")}`}
      </HorstNoConvergenceMessage>
    );
  } else {
    return null;
  }
};

export default view(HorstWarningMessage);

const HorstNoConvergenceMessage = styled.div`
  margin-bottom: 50px;
  font-size: 20px;
  background: #ffff00;
  min-width: 300px;
  padding: 3px 20px 3px 20px;
  width: max-content;
  border: 2px solid black;
`;
