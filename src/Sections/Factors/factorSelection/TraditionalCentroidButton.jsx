import styled from "styled-components";
import { view } from "react-easy-state";
import React from "react";
// import centroidDispatch from "../centroidLogic/centroidDispatch";
import factorState from "../../GlobalState/factorState";
// import appState from "../../GlobalState/appState";
import GeneralButton from "./../../../Utils/GeneralButton";
import { useTranslation } from "react-i18next";

const handleOnclick = () => {
  factorState.showNumberOfCentroidFacToExtract = true;
  factorState.activeTraditionalCentroidFactorButton = true;
  factorState.isTraditionalCentroidDisabled = true;
  // // show spinner duirng calcs
  // factorState.showCentroidSpinner = true;
  // const numFactors = factorState.numCentroidFactors;
  // // Brown centroids calcs start
  // centroidDispatch(numFactors);
  // factorState.numFacsForTableWidth = numFactors;
  // // hide spinner since calcs are done
  // factorState.showCentroidSpinner = false;
  // factorState.showUnrotatedFactorTable = true;
  // factorState.showEigenvaluesTable = true;
  // factorState.showScreePlot = true;
  // factorState.activeTraditionalCentroidFactorButton = true;
  // factorState.isPcaButtonDisabled = true;
  // factorState.disabledCentroidFactorButton = true;
  // factorState.isHorst55Disabled = true;
  // factorState.isTuckerMacCallumCentroidDisabled = true;
  // factorState.isCentroidFacSelectDisabled = true;
  // rotationState.showKeepFacForRotButton = true;
  // appState.isFactorsButtonGreen = true;
  // factorState.isTraditionalCentroidDisabled = true;
  // factorState.showNumberOfCentroidFacToExtract = true;
  // // setTimeout(function() {
  // // }, 500);
};

const TraditionalCentroidButton = () => {
  const { t } = useTranslation();

  // getState
  const isActive = factorState.activeTraditionalCentroidFactorButton;
  const isDisabled = factorState.isTraditionalCentroidDisabled;
  // const isCentroidLoading = factorState.isCentroidLoading;

  return (
    <TradButton
      as={GeneralButton}
      id="traditionalCentroidButton"
      isActive={isActive}
      disabled={isDisabled}
      onClick={handleOnclick}
    >
      Brown <br /> {t("Centroid Factors")}
    </TradButton>
  );
};

export default view(TraditionalCentroidButton);

const TradButton = styled.div`
  margin-left: 70px;
  margin-right: 5px;
`;
