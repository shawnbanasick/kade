import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import factorState from "../../GlobalState/factorState";
import { useTranslation } from "react-i18next";
import HorstNumberInput from "./HorstNumberInput";

const InputHorstCutoffsNoLimit = () => {
  const { t } = useTranslation();

  // getState
  const showHorstIterationLimit = factorState.showHorstIterationLimit;
  const horstIterations = factorState.horstIterations;

  if (showHorstIterationLimit) {
    return (
      <React.Fragment>
        <HorstIterationContainerDiv1>
          <TextSpanIterations>{`${t(
            "Number of Iterations"
          )}:  `}</TextSpanIterations>
          <HorstNumberInput
            style={{ width: 100 }}
            name={"horstIterations"}
            value={horstIterations}
            lowerLimit={1}
            upperLimit={10000}
          />
        </HorstIterationContainerDiv1>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default view(InputHorstCutoffsNoLimit);

const HorstIterationContainerDiv1 = styled.div`
  display: flex;
  margin-top: 25px;
  margin-left: 70px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const TextSpanIterations = styled.span`
  margin-right: 10px;
  width: 220px;
`;
