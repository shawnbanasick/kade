import styled from "styled-components";
import { view } from "react-easy-state";
import React from "react";
import GeneralButton from "../../../Utils/GeneralButton";
import factorState from "../../GlobalState/factorState";
import { useTranslation } from "react-i18next";

const Horst55CentroidModal = () => {
  const { t } = useTranslation();

  const handleOnclick = () => {
    factorState.showUseHorstLimit = true;
    factorState.isPcaButtonDisabled = true;
    factorState.disabledCentroidFactorButton = true;
    factorState.activeHorst55CentroidButton = true;
    factorState.isHorst55Disabled = true;
    factorState.isTraditionalCentroidDisabled = true;
    factorState.isTuckerMacCallumCentroidDisabled = true;
  };
  // const isCentroidLoading = factorState.isCentroidLoading;
  // loading={isCentroidLoading}

  // getState
  const isActive = factorState.activeHorst55CentroidButton;
  const isDisabled = factorState.isHorst55Disabled;

  return (
    <HorstButton
      as={GeneralButton}
      id="noFacSelectedModalButton"
      isActive={isActive}
      disabled={isDisabled}
      onClick={handleOnclick}
    >
      Horst 5.5 <br /> {t("Centroid Factors")}
    </HorstButton>
  );
};

export default view(Horst55CentroidModal);

const HorstButton = styled.div`
  margin-right: 15px;
`;
