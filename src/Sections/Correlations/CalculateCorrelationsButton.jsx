import styled from "styled-components";
import React, { Component } from "react";
import { view, store } from "react-easy-state";
import state from "../../store";
import mainCorrCalcs from "./correlationsLogic/mainCorrCalcs";

const localStore = store({
  buttonColor: "#d6dbe0"
});

const handleClick = () => {
  const respondentNames = state.getState("respondentNames");

  const mainDataObject = state.getState("mainDataObject");
  const rawSortsArray = mainDataObject.map(item => item.rawSort);

  mainCorrCalcs(respondentNames, rawSortsArray);
  state.setState({
    isCorrelationsButtonGreen: true
  });
};

class CalculateCorrelationsButton extends Component {
  render() {
    return (
      <BeginAnalysisButton buttonColor={ localStore.buttonColor } onClick={ () => handleClick() }>
        <p>Calculate Correlations</p>
        { /* <Spinner className="item-loader-container">
                                                                                                                                          <div className="la-ball-pulse la-2x">
                                                                                                                                            <div />
                                                                                                                                            <div />
                                                                                                                                            <div />
                                                                                                                                          </div>
                                                                                                                                        </Spinner> */ }
      </BeginAnalysisButton>
      );
  }
}

export default view(CalculateCorrelationsButton);

const BeginAnalysisButton = styled.button`
  grid-column-start: 3;
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: ${props => props.buttonColor};
  height: 40px;
  width: 200px;
  border: 1px solid black;
  text-align: center;
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  font-weight: normal;
  border-radius: 4px;
  margin-right: 3px;
  margin-bottom: 3px;
  box-shadow: 0 2px 2px 0 black;
  outline: none;

  &:hover {
    font-weight: bold
  }

  &:active {
    box-shadow: 0 1px 1px 0 black;
    margin-left: 3px;
    transform: translateY(1px);  
  }
`;

/*!
 * Load Awesome v1.1.0 (http://github.danielcardoso.net/load-awesome/)
 * Copyright 2015 Daniel Cardoso <@DanielCardoso>
 * Licensed under MIT
 */
const Spinner = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;

  .la-ball-pulse,
  .la-ball-pulse > div {
    position: relative;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .la-ball-pulse {
    display: block;
    font-size: 0;
    color: whitesmoke;
  }

  .la-ball-pulse.la-dark {
    color: #333;
  }

  .la-ball-pulse > div {
    display: inline-block;
    float: none;
    background-color: currentColor;
    border: 0 solid currentColor;
  }

  .la-ball-pulse {
    width: 54px;
    height: 18px;
  }

  .la-ball-pulse > div:nth-child(1) {
    -webkit-animation-delay: -200ms;
    animation-delay: -200ms;
  }

  .la-ball-pulse > div:nth-child(2) {
    -webkit-animation-delay: -100ms;
    animation-delay: -100ms;
  }

  .la-ball-pulse > div:nth-child(3) {
    -webkit-animation-delay: 0ms;
    animation-delay: 0ms;
  }

  .la-ball-pulse > div {
    width: 10px;
    height: 10px;
    margin: 4px;
    border-radius: 100%;
    -webkit-animation: ball-pulse 1s ease infinite;
    animation: ball-pulse 1s ease infinite;
  }

  .la-ball-pulse.la-sm {
    width: 26px;
    height: 8px;
  }

  .la-ball-pulse.la-sm > div {
    width: 4px;
    height: 4px;
    margin: 2px;
  }

  .la-ball-pulse.la-2x {
    width: 108px;
    height: 36px;
  }

  .la-ball-pulse.la-2x > div {
    width: 20px;
    height: 20px;
    margin: 8px;
  }

  .la-ball-pulse.la-3x {
    width: 162px;
    height: 54px;
  }

  .la-ball-pulse.la-3x > div {
    width: 30px;
    height: 30px;
    margin: 12px;
  }

  /*
 * Animation
 */
  @-webkit-keyframes ball-pulse {
    0%,
    60%,
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    30% {
      opacity: 0.1;
      -webkit-transform: scale(0.01);
      transform: scale(0.01);
    }
  }
`;
