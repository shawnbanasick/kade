import React from "react";
import store from "../../store";
import includes from 'lodash/includes';
import { Button } from "semantic-ui-react";
import { easyComp } from "react-easy-state";

import outputDispatch from "../calcualteOutputLogic/1_outputDispatch";

class FactorSelectionForOutputButtons extends React.Component {
  handleSubmit() {
    outputDispatch();
    store.setState({
      showDownloadOutputButtons: true
    });
  }

  handleOnclick(event) {
    let factor = event.target.id;
    let userSelectedFactors = store.getState("userSelectedFactors");

    // select all
    if (factor === "selectAllFacsButton") {
      let numFactorsKeptForRotation = store.getState("numFactorsKeptForRot");
      userSelectedFactors = [
        "factor 1",
        "factor 2",
        "factor 3",
        "factor 4",
        "factor 5",
        "factor 6",
        "factor 7",
        "factor 8"
      ];
      userSelectedFactors.length = numFactorsKeptForRotation;
      store.setState({
        highlightfactor1: true,
        highlightfactor2: true,
        highlightfactor3: true,
        highlightfactor4: true,
        highlightfactor5: true,
        highlightfactor6: true,
        highlightfactor7: true,
        highlightfactor8: true,
        userSelectedFactors: userSelectedFactors,
        selectAllClicked: true
      });

      // clear all
    } else if (factor === "clearAllFacsButton") {
      userSelectedFactors = [];
      store.setState({
        highlightfactor1: false,
        highlightfactor2: false,
        highlightfactor3: false,
        highlightfactor4: false,
        highlightfactor5: false,
        highlightfactor6: false,
        highlightfactor7: false,
        highlightfactor8: false,
        userSelectedFactors: userSelectedFactors
      });
    } else {
      // select individual factors
      let selectAllClicked = store.getState("selectAllClicked");
      if (selectAllClicked) {
        userSelectedFactors = [];
        store.setState({
          highlightfactor1: false,
          highlightfactor2: false,
          highlightfactor3: false,
          highlightfactor4: false,
          highlightfactor5: false,
          highlightfactor6: false,
          highlightfactor7: false,
          highlightfactor8: false,
          userSelectedFactors: userSelectedFactors,
          selectAllClicked: false
        });
      }
      if (!includes(userSelectedFactors, factor)) {
        userSelectedFactors.push(factor);
        store.setState({
          userSelectedFactors: userSelectedFactors
        });
        let newFactorId = "highlight" + factor.replace(" ", "");
        store[newFactorId] = true;
      }
    }
  }

  render() {
    let showOutputFactorSelection = store.getState("showOutputFactorSelection");
    let numFactorsKeptForRotation = store.getState("numFactorsKeptForRot");
    let buttonsToRenderArray = [];
    for (let i = 0; i < 8; i++) {
      if (i < numFactorsKeptForRotation) {
        buttonsToRenderArray.push(true);
      } else {
        buttonsToRenderArray.push(false);
      }
    }
    const show1 = buttonsToRenderArray[0];
    const show2 = buttonsToRenderArray[1];
    const show3 = buttonsToRenderArray[2];
    const show4 = buttonsToRenderArray[3];
    const show5 = buttonsToRenderArray[4];
    const show6 = buttonsToRenderArray[5];
    const show7 = buttonsToRenderArray[6];
    const show8 = buttonsToRenderArray[7];

    if (showOutputFactorSelection) {
      return (
        <div>
          <span style={{ marginRight: 5 }}>Choose Factors To Output:</span>
          {show1 && (
            <Button
              id={"factor 1"}
              toggle
              active={store.getState("highlightfactor1")}
              onClick={this.handleOnclick.bind(this)}
              key={"f1"}
            >
              1
            </Button>
          )}
          {show2 && (
            <Button
              id={"factor 2"}
              toggle
              active={store.getState("highlightfactor2")}
              onClick={this.handleOnclick.bind(this)}
              key={"f2"}
            >
              2
            </Button>
          )}
          {show3 && (
            <Button
              id={"factor 3"}
              toggle
              active={store.getState("highlightfactor3")}
              onClick={this.handleOnclick.bind(this)}
              key={"f3"}
            >
              3
            </Button>
          )}
          {show4 && (
            <Button
              id={"factor 4"}
              toggle
              active={store.getState("highlightfactor4")}
              onClick={this.handleOnclick.bind(this)}
              key={"f4"}
            >
              4
            </Button>
          )}
          {show5 && (
            <Button
              id={"factor 5"}
              toggle
              active={store.getState("highlightfactor5")}
              onClick={this.handleOnclick.bind(this)}
              key={"f5"}
            >
              5
            </Button>
          )}
          {show6 && (
            <Button
              id={"factor 6"}
              toggle
              active={store.getState("highlightfactor6")}
              onClick={this.handleOnclick.bind(this)}
              key={"f6"}
            >
              6
            </Button>
          )}
          {show7 && (
            <Button
              id={"factor 7"}
              toggle
              active={store.getState("highlightfactor7")}
              onClick={this.handleOnclick.bind(this)}
              key={"f7"}
            >
              7
            </Button>
          )}
          {show8 && (
            <Button
              id={"factor 8"}
              toggle
              active={store.getState("highlightfactor8")}
              onClick={this.handleOnclick.bind(this)}
              key={"f8"}
            >
              8
            </Button>
          )}
          <Button id="selectAllFacsButton" onClick={this.handleOnclick}>
            Select All
          </Button>
          <Button id="clearAllFacsButton" onClick={this.handleOnclick}>
            Clear
          </Button>
          <Button id="startOutputButton" onClick={this.handleSubmit}>
            Submit
          </Button>
        </div>
      );
    }
    return null;
  }
}

export default easyComp(FactorSelectionForOutputButtons);
