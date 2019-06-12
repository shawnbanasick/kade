import { view } from "react-easy-state";
import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import state from "../../store";

// import fetch from "electron-fetch";

// const { net } = require("electron").remote;

// const array = [];
// const request = net.request(
//   "https://raw.githubusercontent.com/shawnbanasick/kade/master/version.json"
// );
// request.on("response", response => {
//   console.log(`STATUS: ${response.statusCode}`);
//   response.on("data", chunk => {
//     console.log(`BODY: ${chunk}`);
//     const value = JSON.parse(chunk);
//     array.push(value);
//   });
//   response.on("end", () => {
//     string.toString();
//     console.log(string);
//     console.log("ended");
//   });
// });
// request.end();

// console.log(array);

function handleClick() {}

class Start extends Component {
  render() {
    const releaseVersion = state.getState("releaseVersion");
    console.log(releaseVersion);
    const version = `version ${state.getState("version")}`;
    return (
      <MainContent>
        {/* <LanguageSelection>{`${width} x ${height}`}</LanguageSelection> */}
        <TitleDiv>KADE</TitleDiv>
        <SutTitleDivContainer>
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
        </SutTitleDivContainer>
        <SubTitleDiv2>{version}</SubTitleDiv2>
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
            KADE
            <br />
            Home Page
          </StyledAnchor>
        </WebLinkDiv1>
        <WebLinkDiv2>
          <StyledAnchor
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/shawnbanasick/kade/wiki"
          >
            KADE User Manual
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

// 240px 240px 240px 240px;
const MainContent = styled.div`
  display: grid;
  grid-template-columns: 260px 260px 260px 260px;
  grid-template-rows: 10px 155px 50px 30px 155px 50px 210px 1fr;
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
  user-select: none;
`;

const LanguageSelection = styled.div`
  grid-column-start: 4;
`;

const TitleDiv = styled.div`
  grid-area: titleRow;
  font-size: 80px;
  font-weight: bold;
  user-select: none;
  padding-left: 30px;
`;

const SutTitleDivContainer = styled.div`
  display: flex;
  grid-area: subtitleRow;
  align-items: center;
  height: 66px;
  width: 700px;
  background-color: rgba(144, 238, 144, 0.6);
  margin: 25px;
  padding-top: 8px;
  padding-left: 25px;
`;

const SubTitleDiv = styled.p`
  font-style: italic;
  font-size: 40px;
  font-weight: normal;
`;

const SubTitleDiv2 = styled.p`
  margin-top: 65px;
  display: flex;
  grid-area: subtitleRow2;
  font-style: italic;
  font-size: 30px;
  font-weight: normal;
  padding: 3px;
`;

// color: #b22222;
const HighlightLetter = styled.span`
  font-size: 60px;
  font-weight: bold;
`;

const WebLinkDiv1 = styled.div`
  display: flex;
  grid-area: linkboxRow1;
  height: 100px;
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
    background-color: #abafb3;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
    /* margin-top: 3px; */
  }
`;

const WebLinkDiv2 = styled.div`
  display: flex;
  grid-area: linkboxRow2;
  height: 100px;
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
    background-color: #abafb3;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
    /* margin-top: 3px; */
  }
`;

const WebLinkDiv3 = styled.div`
  display: flex;
  grid-area: linkboxRow3;
  height: 100px;
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
    background-color: #abafb3;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
    /* margin-top: 3px; */
  }
`;

const WebLinkDiv4 = styled.div`
  display: flex;
  grid-area: linkboxRow4;
  height: 100px;
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
    background-color: #abafb3;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
    /* margin-top: 3px; */
  }
`;

const WebLinkRow = styled.div`
  align-items: flex-end;
  grid-area: weblinkRow;
`;
