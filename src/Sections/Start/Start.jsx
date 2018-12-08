import React, { Component } from "react";
import { view, store } from "react-easy-state";
import styled, { keyframes } from "styled-components";

function handleClick() {}

const localStore = store({
  width: 0,
  height: 0
});

function getWidth() {
  const w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  localStore.width = w;
  return w;
}

function getHeight() {
  const h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  localStore.height = h;
  return h;
}

window.addEventListener("resize", () => {
  getWidth();
  getHeight();
});

class Start extends Component {
  render() {
    getWidth();
    getHeight();
    const width = localStore.width;
    const height = localStore.height;
    return (
      <MainContent>
        <LanguageSelection>{`${width} x ${height}`}</LanguageSelection>
        <TitleDiv>KADE</TitleDiv>
        <SubTitleDiv>
          <HighlightLetter>K</HighlightLetter>
          en-Q
          <HighlightLetter> A</HighlightLetter>
          nalysis
          <HighlightLetter> D</HighlightLetter>
          esktop
          <HighlightLetter> E</HighlightLetter>
          dition
        </SubTitleDiv>
        <SubTitleDiv2>version 0.0.1 alpha</SubTitleDiv2>
        <WebLinkRow>
          <h1>web links:</h1>
          <hr style={{ width: "700px" }} />
        </WebLinkRow>
        <WebLinkDiv1 onClick={handleClick}>
          <StyledAnchor
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/shawnbanasick/kade"
          >
            KADE Main Page and Change Log
          </StyledAnchor>
        </WebLinkDiv1>
        <WebLinkDiv2>
          <StyledAnchor
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/shawnbanasick/kade/wiki"
          >
            KADE Reference Guide and User Manual
          </StyledAnchor>
        </WebLinkDiv2>
        <WebLinkDiv3>
          <StyledAnchor
            target="_blank"
            rel="noopener noreferrer"
            href="https://shawnBanasick.github.io/ken-q-analysis/index.html"
          >
            Ken-Q Analysis Web Application
          </StyledAnchor>
        </WebLinkDiv3>
        <WebLinkDiv4>
          <StyledAnchor
            target="_blank"
            rel="noopener noreferrer"
            href="https://shawnbanasick.github.io/ken-q-data/index.html"
          >
            Ken-Q Data
          </StyledAnchor>
        </WebLinkDiv4>
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

const StyledAnchor = styled.a`
  color: black;

  &:hover {
    color: black;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 240px 240px 240px 240px;
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
