import React from "react";
import includes from "lodash/includes";
import { Button } from "semantic-ui-react";
import { view } from "react-easy-state";
import styled from "styled-components";
import data from "../plot/data";
import store from "../../../../store";
import doD3ChartDataPrep from "../rotationLogic/doD3ChartDataPrep";
import rotationTablePrep from "../rotationTable/rotationTablePrep";
import displaySelectedFactorsOnPlot from "./displaySelectedFactorsOnPlot";
import calculateCommunalities from "../../varimaxLogic/2calculateCommunalities";
import calculatefSigCriterionValues from "../../varimaxLogic/2calculateSigCriterionValues";
import transposeMatrix from "../../../../Utils/transposeMatrix";

class FactorSelectButtons extends React.Component {
  handleSubmit() {
    // if only 1 factor selected show modal
    const userSelectedRotFactors = store.getState("userSelectedRotFactors");
    if (userSelectedRotFactors.length < 2) {
      store.setState({
        showRotFactorSelectWarning: true
      });
    } else {
      // show scatter plot and table
      store.setState({
        showRotFactorSelectWarning: false,
        showScatterPlotTableDiv: true
      });
    }
  }

  // passing in baseline data from props
  handleClick(event, baselineData) {
    const factor = event.target.id;
    let userSelectedRotFactors = store.getState("userSelectedRotFactors");
    let abFactors = store.getState("abFactors");

    // clear all buttons
    if (factor === "clearAllRotFacs") {
      store.setState({
        rotationDegrees: 0
      });
      userSelectedRotFactors = [];
      abFactors = [];
      store.setState({
        highlightRotfactor1: false,
        highlightRotfactor2: false,
        highlightRotfactor3: false,
        highlightRotfactor4: false,
        highlightRotfactor5: false,
        highlightRotfactor6: false,
        highlightRotfactor7: false,
        highlightRotfactor8: false,
        userSelectedRotFactors,
        abFactors,
        showScatterPlotTableDiv: false
      });
    } else {
      // if the button hasn't already been selected
      if (!includes(userSelectedRotFactors, factor)) {
        // if fewer than two buttons have been selected
        if (userSelectedRotFactors.length < 2) {
          // add button clicked id to userselected factors
          userSelectedRotFactors.push(factor);
          // add id to ab factors array
          const idValue = factor.substr(factor.length - 1);
          abFactors.push(parseInt(idValue, 10));

          // set new variables - highlighting, abFactors, and userSelectedFactors - to state
          const factor2 = factor.replace(" ", "");
          // const newFactorId = `highlightRot${  factor2}`;
          const newFactorId = `highlightRot${factor2}`;
          const tempObj1 = {};
          tempObj1[newFactorId] = true;
          tempObj1.userSelectedRotFactors = userSelectedRotFactors;
          tempObj1.abFactors = abFactors;
          store.setState(tempObj1);
        }
        // if length = 2, fire calculations
        if (userSelectedRotFactors.length === 2) {
          // matrix in factor  format
          const factorMatrix1 = store.getState("factorMatrix");

          // transpose matrix to table display format
          const factorMatrixTransposed = transposeMatrix(factorMatrix1);

          // expects bare full array - required to calc significance levels for table/circles
          const arrayWithCommunalities = calculateCommunalities(
            factorMatrixTransposed
          );

          // gets array for fSig testing from LS of calculateCommunalities
          // - sets fSigCriterionResults for this factor matrix
          calculatefSigCriterionValues("flag");

          // returns dataValuesArray for D3 chart
          const d3Prep = doD3ChartDataPrep(arrayWithCommunalities);

          // mutate state
          store.setState({
            d3RotChartData: d3Prep,
            tempRotFacStateArray: factorMatrixTransposed
          });

          // format table data and paint 2-factor table
          rotationTablePrep(d3Prep, baselineData);

          // call to update D3 plot data
          data();
          displaySelectedFactorsOnPlot();
        }
      }
    }
  }

  render() {
    const shouldDisplayRotFactorButtons = store.getState(
      "shouldShowJudgeRotDiv"
    );
    const numFactorsKeptForRotation = store.getState("numFactorsKeptForRot");
    const showRotFactorSelectWarning = store.getState(
      "showRotFactorSelectWarning"
    );
    const buttonsToRenderArray = [];
    const baselineData = this.props.baselineData;
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

    if (shouldDisplayRotFactorButtons) {
      return (
        <React.Fragment>
        <StyledWrapper>
          {show1 && (
            <Button
              id={"factor 1"}
              toggle
              className="wrapper1"
              active={store.getState("highlightRotfactor1")}
              onClick={e => this.handleClick(e, baselineData)}
              key={"f1"}
            >
              1
            </Button>
          )}
          </StyledWrapper>
          <StyledWrapper>
          {show2 && (
            <Button
              id={"factor 2"}
              toggle
              className="wrapper1"
              active={store.getState("highlightRotfactor2")}
              onClick={e => this.handleClick(e, baselineData)}
              key={"f2"}
            >
              2
            </Button>
          )}
          </StyledWrapper>
          <StyledWrapper>
          {show3 && (
            <Button
              id={"factor 3"}
              toggle
              className="wrapper1"
              active={store.getState("highlightRotfactor3")}
              onClick={e => this.handleClick(e, baselineData)}
              key={"f3"}
            >
              3
            </Button>
          )}
          {show4 && (
            <Button
              id={"factor 4"}
              toggle
              className="wrapper1"
              active={store.getState("highlightRotfactor4")}
              onClick={e => this.handleClick(e, baselineData)}
              key={"f4"}
            >
              4
            </Button>
          )}
          {show5 && (
            <Button
              id={"factor 5"}
              toggle
              className="wrapper1"
              active={store.getState("highlightRotfactor5")}
              onClick={e => this.handleClick(e, baselineData)}
              key={"f5"}
            >
              5
            </Button>
          )}
          {show6 && (
            <Button
              id={"factor 6"}
              toggle
              className="wrapper1"
              active={store.getState("highlightRotfactor6")}
              onClick={e => this.handleClick(e, baselineData)}
              key={"f6"}
            >
              6
            </Button>
          )}
          {show7 && (
            <Button
              id={"factor 7"}
              toggle
              className="wrapper1"
              active={store.getState("highlightRotfactor7")}
              onClick={e => this.handleClick(e, baselineData)}
              key={"f7"}
            >
              7
            </Button>
          )}
          {show8 && (
            <Button
              id={"factor 8"}
              className="wrapper1"
              toggle
              active={store.getState("highlightRotfactor8")}
              onClick={e => this.handleClick(e, baselineData)} // e => this.handleClick(e, baselineData)
              key={"f8"}
            >
              8
            </Button>
          )}
          <Button
            className="wrapper1"
            id="clearAllRotFacs"
            onClick={this.handleClick}
          >
            Clear
          </Button>
          <Button
            className="wrapper1"
            id="startRotationDisplay"
            onClick={this.handleSubmit}
          >
            Display
          </Button>
          {showRotFactorSelectWarning && (
            <div style={{ width: 160, backgroundColor: "red" }}>
              <span
                style={{
                  color: "white",
                  marginRight: 5,
                  marginLeft: 5,
                  marginTop: 10
                }}
              >
                Select 2 factor
              </span>
            </div>
          )}
        </StyledWrapper>
        </React.Fragment>
      );
    }
    return null;
  }
}

export default view(FactorSelectButtons);

const StyledWrapper = styled.div`
  .wrapper1 {
    border: 1px solid black;
    box-shadow: 0 2px 2px 0 black;

    &:hover {
      border: 1px solid black;
      box-shadow: 0 2px 2px 0 black;
    }

    &:active {
      box-shadow: 0 1px 1px 0 black;
      transform: translateY(1px);
      background-color: lightgreen !important;
    }
  }
`;
