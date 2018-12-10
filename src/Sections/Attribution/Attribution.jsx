import React, { Component } from "react";
import { view, store } from "react-easy-state";
import styled, { keyframes } from "styled-components";
import initialState from '../../initialState';
import state from '../../store';
import { Button } from 'semantic-ui-react';

function handleClick() {
    console.log(JSON.stringify("clicked"));
    const initialStateValues = initialState();
    state.setState(initialStateValues);
}


class Attribution extends Component {
    render() {
        return (
            <MainContent>
              <h1>Attribution</h1>
              <Button onClick={ handleClick } size='large'>Reset State</Button>
            </MainContent>
            );
    }
}

export default view(Attribution);

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

const StyledAnchor = styled.a`
  color: black;

  &:hover {
    color: black;
  }
`;

// 240px 240px 240px 240px;
const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 20px 155px 50px 30px 115px 120px 180px 20px;
  grid-template-areas:
    "row1 row1 row1 row1"
    "titleRow titleRow titleRow titleRow"
    "subtitleRow subtitleRow subtitleRow subtitleRow"
    "subtitleRow2 subtitleRow2 subtitleRow2 subtitleRow2"
    "weblinkRow weblinkRow weblinkRow weblinkRow"
    "linkboxRow1 linkboxRow1 linkboxRow2 linkboxRow2"
    "linkboxRow3 linkboxRow3 linkboxRow4 linkboxRow4";
  justify-items: center;
  align-items: center;
  background-color: white;
  visibility: ${props => (props.view ? "hidden" : "visible")};
  animation: ${props => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;

  font-family: Helvetica, sans-serif;
  font-size: 18px;

  width: calc(100vw - 125px);
  box-sizing: border-box;
  max-height: calc(100vh - 22px);
  overflow: auto;
`;

const LanguageSelection = styled.div`
  grid-column-start: 4;
`;

const TitleDiv = styled.div`
  grid-area: titleRow;
  font-size: 80px;
  font-weight: bold;
  user-select: none;
`;

const SubTitleDiv = styled.p`
  display: flex;
  grid-area: subtitleRow;
  font-style: italic;
  font-size: 40px;
  font-weight: normal;
`;

const SubTitleDiv2 = styled.p`
  display: flex;
  grid-area: subtitleRow2;
  font-style: italic;
  font-size: 30px;
  font-weight: normal;
`;

const HighlightLetter = styled.span`
  color: #b22222;
  font-weight: bold;
`;

const WebLinkDiv1 = styled.div`
  display: flex;
  grid-area: linkboxRow1;
  height: 120px;
  width: 180px;
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: #d6dbe0;
  color: black;
  border-radius: 5px;
  font-size: 22px;
  margin-right: 3px;
  margin-bottom: 3px;
  box-shadow: 0 2px 2px 0 black;
  text-align: center;
  user-select: none;
  line-height: 1.2;

  &:hover {
    font-weight: bold;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
    margin-top: 3px;
  }
`;

const WebLinkDiv2 = styled.div`
  display: flex;
  grid-area: linkboxRow2;
  height: 120px;
  width: 180px;
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: #d6dbe0;
  color: black;
  border-radius: 5px;
  font-size: 22px;
  margin-right: 3px;
  margin-bottom: 3px;
  box-shadow: 0 2px 2px 0 black;
  text-align: center;
  user-select: none;
  line-height: 1.2;

  &:hover {
    font-weight: bold;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
    margin-top: 3px;
  }
`;

const WebLinkDiv3 = styled.div`
  display: flex;
  grid-area: linkboxRow3;
  height: 120px;
  width: 180px;
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: #d6dbe0;
  color: black;
  border-radius: 5px;
  font-size: 22px;
  margin-right: 3px;
  margin-bottom: 3px;
  box-shadow: 0 2px 2px 0 black;
  text-align: center;
  user-select: none;
  line-height: 1.2;

  &:hover {
    font-weight: bold;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
    margin-top: 3px;
  }
`;

const WebLinkDiv4 = styled.div`
  display: flex;
  grid-area: linkboxRow4;
  height: 120px;
  width: 180px;
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: #d6dbe0;
  color: black;
  border-radius: 5px;
  font-size: 22px;
  margin-right: 3px;
  margin-bottom: 3px;
  box-shadow: 0 2px 2px 0 black;
  text-align: center;
  user-select: none;
  line-height: 1.2;

  &:hover {
    font-weight: bold;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
    margin-top: 3px;
  }
`;

const WebLinkRow = styled.div`
  grid-area: weblinkRow;
`;
