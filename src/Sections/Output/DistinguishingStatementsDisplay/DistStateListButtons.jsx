import React from "react";
import styled from "styled-components";
import { view, store } from "react-easy-state";
import { Button } from "semantic-ui-react";
import state from "../../../store";

const localStore = store({
  rotationDegreeInput: "",
  p0001Active: false,
  p001Active: false,
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
  localStore.p001Active = false;
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
    state.setState({ threshold: 6 });
    console.log("99.99 clicked");
  }

  if (buttonId === "p001Button") {
    clearAllButtons();
    localStore.p001Active = true;
    state.setState({ threshold: 5 });
    console.log("99.9 clicked");
  }

  if (buttonId === "p01Button") {
    clearAllButtons();
    localStore.p01Active = true;
    state.setState({ threshold: 4 });
    console.log("99.0 clicked");
  }

  if (buttonId === "p05Button") {
    clearAllButtons();
    localStore.p05Active = true;
    state.setState({ threshold: 3 });
    console.log("95.0 clicked");
  }

  if (buttonId === "p1Button") {
    clearAllButtons();
    localStore.p1Active = true;
    state.setState({ threshold: 2 });
    console.log("90.0 clicked");
  }

  if (buttonId === "p15Button") {
    clearAllButtons();
    localStore.p15Active = true;
    state.setState({ threshold: 1 });
    console.log("85.0 clicked");
  }

  if (buttonId === "p2Button") {
    clearAllButtons();
    localStore.p2Active = true;
    state.setState({ threshold: 0 });
    console.log("80.0 clicked");
  }
};

class DistStateListButtons extends React.Component {
  render() {
    const shouldDisplayDistStateListButtons = true;
    // const rotationDegreeInputDisplay =  localStore.rotationDegreeInput
    if (shouldDisplayDistStateListButtons) {
      return (
        <StyledWrapper>
          <TextLabel>Threshold:</TextLabel>
          <Button
            id={"p0001Button"}
            className="wrapper1"
            toggle
            active={localStore.p0001Active}
            onClick={handleOnclick}
            key={"f1"}
          >
            0.0001
          </Button>
          <Button
            id={"p001Button"}
            className="wrapper1"
            toggle
            active={localStore.p001Active}
            onClick={handleOnclick}
            key={"f2"}
          >
            0.001
          </Button>
          <Button
            id={"p01Button"}
            className="wrapper1"
            toggle
            active={localStore.p01Active}
            onClick={handleOnclick}
            key={"f3"}
          >
            0.01
          </Button>
          <Button
            id={"p05Button"}
            className="wrapper1"
            toggle
            active={localStore.p05Active}
            onClick={handleOnclick}
            key={"f4"}
          >
            0.05
          </Button>
          <Button
            id={"p1Button"}
            className="wrapper1"
            toggle
            active={localStore.p1Active}
            onClick={handleOnclick}
            key={"f5"}
          >
            0.1
          </Button>
          <Button
            id={"p15Button"}
            className="wrapper1"
            toggle
            active={localStore.p15Active}
            onClick={handleOnclick}
            key={"f6"}
          >
            0.15
          </Button>
          <Button
            id={"p2Button"}
            className="wrapper1"
            toggle
            active={localStore.p2Active}
            onClick={handleOnclick}
            key={"f7"}
          >
            0.2
          </Button>
        </StyledWrapper>
      );
    }
    return null;
  }
}

export default view(DistStateListButtons);

/* 
          begin comparisons
           const lookupArray = [3.906, 3.291, 2.575, 1.96, 1.645, 1.44, 1.28];
          
           const pValuesTextArray = [
            "P < 0.0001",
            "P < 0.001",
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
    border: 1px solid black;
    box-shadow: 0 2px 2px 0 black;

    &:hover {
      border: 1px solid black;
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
