import React from "react";
import styled from "styled-components";
import { view, store } from "react-easy-state";
import GeneralButton from "../../../Utils/GeneralButton";
import outputState from "../../GlobalState/outputState";

const localStore = store({
  rotationDegreeInput: "",
  p0001Active: false,
  p0005Active: false,
  p001Active: false,
  p005Active: false,
  p01Active: false,
  p05Active: true,
  p1Active: false,
  p15Active: false,
  p2Active: false,
  buttonColor: "#d6dbe0",
  pressed: false
});

const clearAllButtons = () => {
  localStore.p0001Active = false;
  localStore.p0005Active = false;
  localStore.p001Active = false;
  localStore.p005Active = false;
  localStore.p01Active = false;
  localStore.p05Active = false;
  localStore.p1Active = false;
  localStore.p15Active = false;
  localStore.p2Active = false;
};

const handleOnclick = event => {
  const buttonId = event.target.id;

  // clear all button highlighting

  if (buttonId === "p0001Button") {
    clearAllButtons();
    localStore.p0001Active = true;
    outputState.threshold = 8;
  }

  if (buttonId === "p0005Button") {
    clearAllButtons();
    localStore.p0005Active = true;
    outputState.threshold = 7;
  }

  if (buttonId === "p001Button") {
    clearAllButtons();
    localStore.p001Active = true;
    outputState.threshold = 6;
  }

  if (buttonId === "p005Button") {
    clearAllButtons();
    localStore.p005Active = true;
    outputState.threshold = 5;
  }

  if (buttonId === "p01Button") {
    clearAllButtons();
    localStore.p01Active = true;
    outputState.threshold = 4;
  }

  if (buttonId === "p05Button") {
    clearAllButtons();
    localStore.p05Active = true;
    outputState.threshold = 3;
  }

  if (buttonId === "p1Button") {
    clearAllButtons();
    localStore.p1Active = true;
    outputState.threshold = 2;
  }

  if (buttonId === "p15Button") {
    clearAllButtons();
    localStore.p15Active = true;
    outputState.threshold = 1;
  }

  if (buttonId === "p2Button") {
    clearAllButtons();
    localStore.p2Active = true;
    outputState.threshold = 0;
  }
};

const DistStateListButtons = () => {
  const shouldDisplayDistStateListButtons = true;
  if (shouldDisplayDistStateListButtons) {
    return (
      <StyledWrapper>
        <TextLabel>Threshold:</TextLabel>
        <GeneralButton
          id={"p0001Button"}
          isActive={localStore.p0001Active}
          onClick={handleOnclick}
          key={"f1"}
        >
          0.0001
        </GeneralButton>
        <GeneralButton
          id={"p0005Button"}
          isActive={localStore.p0005Active}
          onClick={handleOnclick}
          key={"f2"}
        >
          0.0005
        </GeneralButton>
        <GeneralButton
          id={"p001Button"}
          isActive={localStore.p001Active}
          onClick={handleOnclick}
          key={"f3"}
        >
          0.001
        </GeneralButton>
        <GeneralButton
          id={"p005Button"}
          isActive={localStore.p005Active}
          onClick={handleOnclick}
          key={"f4"}
        >
          0.005
        </GeneralButton>
        <GeneralButton
          id={"p01Button"}
          isActive={localStore.p01Active}
          onClick={handleOnclick}
          key={"f5"}
        >
          0.01
        </GeneralButton>
        <GeneralButton
          id={"p05Button"}
          isActive={localStore.p05Active}
          onClick={handleOnclick}
          key={"f6"}
        >
          0.05
        </GeneralButton>
        <GeneralButton
          id={"p1Button"}
          isActive={localStore.p1Active}
          onClick={handleOnclick}
          key={"f7"}
        >
          0.1
        </GeneralButton>
        <GeneralButton
          id={"p15Button"}
          isActive={localStore.p15Active}
          onClick={handleOnclick}
          key={"f8"}
        >
          0.15
        </GeneralButton>
        <GeneralButton
          id={"p2Button"}
          isActive={localStore.p2Active}
          onClick={handleOnclick}
          key={"f9"}
        >
          0.2
        </GeneralButton>
      </StyledWrapper>
    );
  }
  return null;
};

export default view(DistStateListButtons);

/* 
  begin comparisons
    const lookupArray = [3.891, 3.481, 3.291, 2.807, 2.575, 1.96, 1.645, 1.44, 1.28];
  
    const pValuesTextArray = [
    "P < 0.0001",
    "P < 0.0005",
    "P < 0.001",
    "P < 0.005"
    "P < 0.01",
    "P < 0.05",
    "P < 0.1",
    "P < 0.15"
    "P < 0.2"
  ];
  */

const StyledWrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 20px;

  .wrapper1 {
    box-shadow: 0 2px 2px 0 black;

    &:hover {
      box-shadow: 0 2px 2px 0 black;
    }

    &:active {
      box-shadow: 0 0 1px 0 black inset;
    }
  }
`;

const TextLabel = styled.div`
  margin-right: 10px;
  font-size: 18px;
  font-weight: bold;
`;
