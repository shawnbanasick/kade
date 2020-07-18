import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import ResetAnalysisButton from "./ResetAnalysisButton";
import PcaButton from "./factorSelection/ExtractPrinCompButton";
import RevealCentroidTypeSelectionButton from "./RevealCentroidTypeSelectionButton";
// import NoFacSelectedModal from "./factorSelection/NoFacSelectedModal";
// import CentroidSelectDropdown from "./factorSelection/CentroidSelectDropdown";

const TypeOfAnalysisTransitionContainer = () => {
  return (
    <TypeOfAnalysisTransitionContainerDiv>
      <RevealCentroidTypeSelectionButton />
      <PcaButton />
      <ResetAnalysisButton />
    </TypeOfAnalysisTransitionContainerDiv>
  );
};

export default view(TypeOfAnalysisTransitionContainer);

const TypeOfAnalysisTransitionContainerDiv = styled.div`
  display: flex;
  max-width: 1125px;
  /* justify-content: space-around; */
  justify-content: flex-start;
  margin-left: 70px;
`;
