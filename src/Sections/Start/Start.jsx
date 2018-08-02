import React, { Component } from "react";
import { view } from "react-easy-state";
import styled, { keyframes } from "styled-components";

class Start extends Component {
  render() {
    return (
      <MainContent>
        <LanguageSelection>Language</LanguageSelection>
        <TitleDiv>KANDED</TitleDiv>
        <WebLinkRow>
          <p>web links:</p>
          <hr />
        </WebLinkRow>
        <WebLinkDiv1>square div 1</WebLinkDiv1>
        <WebLinkDiv1>square div 2</WebLinkDiv1>
        <WebLinkDiv2>square div 3</WebLinkDiv2>
        <WebLinkDiv2>square div 4</WebLinkDiv2>
      </MainContent>
      );
  }
}

export default view(Start);


const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;


const MainContent = styled.div`
  display: grid;
  grid-template-columns: 190px 190px 190px 190px;
  grid-template-rows: 50px 125px 125px 200px 200px 50px;
  grid-template-areas:
    "row1 row1 row1 row1"
    "titleRow titleRow titleRow titleRow"
    "weblinkRow weblinkRow weblinkRow weblinkRow"
    "linkboxRow1 linkboxRow1 linkboxRow1 linkboxRow1"
    "linkboxRow2 linkboxRow2 linkboxRow2 linkboxRow2";
  justify-items: center;
  align-items: center;
  background-color: white;
  height: 100%;
  width: 100%;
  visibility: ${props => props.view ? 'hidden' : 'visible'};
  animation: ${props => props.view ? fadeOut : fadeIn} .5s linear;
  transition: visibility .5s linear;
`;

const LanguageSelection = styled.div`
  grid-column-start: 4;
`;

const TitleDiv = styled.div`
  grid-area: titleRow;
  font-family: Helvetica;
  font-size: 50px;
  font-weight: bold;
`;

const WebLinkDiv1 = styled.div`
  grid-area: linkboxRow1;
  height: 180px;
  width: 180px;
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: #d3d3d3;
  color: black;
  border-radius: 2px;
  font-size: 22px;
`;

const WebLinkDiv2 = styled.div`
  grid-area: linkboxRow2;
  display: grid;
  align-items: center;
  justify-items: center;
  height: 180px;
  width: 180px;
  background-color: #d3d3d3;
  color: black;
  border-radius: 2px;
  font-size: 22px;
`;

const WebLinkRow = styled.div`
  grid-area: weblinkRow;
`;
