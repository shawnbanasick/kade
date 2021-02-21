import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import { Transition } from "semantic-ui-react";
import outputState from "../../GlobalState/outputState";
import vizState from "../../GlobalState/vizState";
import GeneralButton from "../../../Utils/GeneralButton";
import { useTranslation } from "react-i18next";

const clone = require("rfdc")();

const RefreshFactorVizButton = props => {
  const { t } = useTranslation();

  const refresh = () => {
    // getState
    const factorVizOptions = clone(vizState.factorVizOptions);
    const factorVizOptionsHolder = clone(vizState.factorVizOptionsHolder);
    const updateKeys = Object.keys(factorVizOptionsHolder);

    for (let i = 0; i < updateKeys.length; i += 1) {
      factorVizOptions[updateKeys[i]] = factorVizOptionsHolder[updateKeys[i]];
    }
    vizState.factorVizOptions = factorVizOptions;
    vizState.factorVizOptionsHolder = {};
    vizState.updateFactorVisualizationsButtonColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--main-theme-color");
  };

  // getState
  const shouldDisplayFactorVizOptions =
    outputState.shouldDisplayFactorVizOptions;
  const updateFactorVisualizationsButtonColor =
    vizState.updateFactorVisualizationsButtonColor;

  return (
    <Transition
      visible={shouldDisplayFactorVizOptions}
      animation="fade"
      duration={1000}
    >
      <RefreshButtonContainerDiv>
        <RefreshButton
          as={GeneralButton}
          id="refreshFactorVizButton"
          onClick={refresh}
          buttonColor={updateFactorVisualizationsButtonColor}
        >
          {t("Update Factor Visualizations")}
        </RefreshButton>
      </RefreshButtonContainerDiv>
    </Transition>
  );
};

export default view(RefreshFactorVizButton);

const RefreshButtonContainerDiv = styled.div`
  margin-top: 10px;
  /* margin-top: ${props => `${props.marginTop}px`}; */
  /* margin-bottom: ${props => `${props.marginBottom}px`}; */
  margin-bottom: 10px;
  margin-left: 20px;
  display: inline-flex;
`;

const RefreshButton = styled.div`
  background-color: ${props => props.buttonColor};
`;
