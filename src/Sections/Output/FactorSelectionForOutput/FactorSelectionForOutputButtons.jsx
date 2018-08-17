import React from "react";
import store from "../../store";
import includes from 'lodash/includes';
import { easyComp } from "react-easy-state";
import { Button, Transition } from "semantic-ui-react";
import outputDispatch from "../calcualteOutputLogic/1_outputDispatch";

class FactorSelectionForOutputButtons extends React.Component {
  clearButtonHighlighting() {
    console.log(JSON.stringify("clear button highlighting called"));

    let btnId = store.getState("outputButtonsArray");
    let tempObj2 = {};
    for (let i = 0; i < btnId.length; i++) {
      tempObj2["highlightfactor" + btnId[i]] = false;
    }
    store.setState(tempObj2);
  }

  handleSubmit() {
    let userSelectedFactors = store.getState("userSelectedFactors");
    if (userSelectedFactors.length !== 0) {
      outputDispatch();
      store.setState({
        showDownloadOutputButtons: true,
        outputFactorSelectButtonsDisabled: true
      });
    }
  }

  initializeButtonActiveState(btnId) {
    // set all highlighting to false (not active)
    let tempObj = {};
    for (let i = 0; i < btnId.length; i++) {
      tempObj["highlightfactor" + btnId[i]] = false;
    }
    store.setState(tempObj);
  }

  handleOnclick(event) {
    let factor = event.target.id;
    let userSelectedFactors = store.getState("userSelectedFactors");
    let btnId = store.getState("outputButtonsArray");

    // select all
    if (factor === "selectAllFacs") {
      // construct state object and user selected factors array
      let tempObj = {};
      let userSelectedFactors = [];
      for (let i = 0; i < btnId.length; i++) {
        tempObj["highlightfactor" + btnId[i]] = true;
        let temp1 = "factor " + btnId[i];
        userSelectedFactors.push(temp1);
      }
      tempObj.selectAllClicked = true;
      tempObj.userSelectedFactors = userSelectedFactors;
      tempObj.showDownloadOutputButtons = false;
      tempObj.showFactorCorrelationsTable = false;
      tempObj.showFactorCharacteristicsTable = false;
      tempObj.showStandardErrorsDifferences = false;
      tempObj.displayFactorVisualizations = false;
      tempObj.shouldDisplayFactorVizOptions = false;

      store.setState(tempObj);

    // clear all
    } else if (factor === "clearAllFacs") {
      let tempObj2 = {};
      for (let i = 0; i < btnId.length; i++) {
        tempObj2["highlightfactor" + btnId[i]] = false;
      }
      tempObj2.userSelectedFactors = [];
      tempObj2.showFactorCorrelationsTable = false;
      tempObj2.showFactorCharacteristicsTable = false;
      tempObj2.showStandardErrorsDifferences = false;
      tempObj2.showDownloadOutputButtons = false;
      tempObj2.displayFactorVisualizations = false;
      tempObj2.shouldDisplayFactorVizOptions = false;
      tempObj2.outputFactorSelectButtonsDisabled = false;
      // reset cache of factor viz data      
      tempObj2.outputForDataViz2 = undefined;
      store.setState(tempObj2);
    } else {
      // select individual factors
      let selectAllClicked = store.getState("selectAllClicked");
      // select all factors
      if (selectAllClicked) {
        userSelectedFactors = [];

        let tempObj3 = {};
        for (let i = 0; i < btnId.length; i++) {
          tempObj3["highlightfactor" + btnId[i]] = false;
        }
        tempObj3.userSelectedFactors = userSelectedFactors;
        tempObj3.showFactorCorrelationsTable = false;
        tempObj3.showFactorCharacteristicsTable = false;
        tempObj3.showStandardErrorsDifferences = false;
        tempObj3.selectAllClicked = false;
        tempObj3.displayFactorVisualizations = false;
        tempObj3.shouldDisplayFactorVizOptions = false;

        store.setState(tempObj3);
      }
      if (!includes(userSelectedFactors, factor)) {
        userSelectedFactors.push(factor);
        userSelectedFactors.sort();
        store.setState({
          userSelectedFactors: userSelectedFactors
        });
        let newFactorId = "highlight" + factor.replace(" ", "");
        let tempObj4 = {};
        tempObj4[newFactorId] = true;
        tempObj4.showDownloadOutputButtons = false;
        tempObj4.showFactorCorrelationsTable = false;
        tempObj4.showFactorCharacteristicsTable = false;
        tempObj4.showStandardErrorsDifferences = false;
        tempObj4.displayFactorVisualizations = false;
        tempObj4.shouldDisplayFactorVizOptions = false;
        store.setState(tempObj4);
      }
    }
  }

  render() {
    let btnId = store.getState("outputButtonsArray");
    let showOutputFactorSelection = store.getState("showOutputFactorSelection");
    let areDisabled = store.getState("outputFactorSelectButtonsDisabled");

    // if (showOutputFactorSelection) {

    return (
      <Transition visible={ showOutputFactorSelection } animation="fade" duration={ 1000 }>
        <div>
          <span style={ { marginRight: 5 } }>Select Output Factors:</span>
          { btnId.map((item, index) => (
              <Button key={ "f" + item } toggle active={ store.getState("highlightfactor" + item) } disabled={ areDisabled } onClick={ this.handleOnclick.bind(this) } id={ "factor " + item }>
                { item }
              </Button>
            )) }
          <Button id="selectAllFacs" disabled={ areDisabled } onClick={ this.handleOnclick }>
            Select All
          </Button>
          <Button id="clearAllFacs" onClick={ this.handleOnclick }>
            Clear Selections
          </Button>
          <Button id="startOutput" className="instagram" onClick={ this.handleSubmit }>
            Submit
          </Button>
        </div>
      </Transition>
      );
  }
}

export default easyComp(FactorSelectionForOutputButtons);
