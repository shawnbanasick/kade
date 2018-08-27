import { view, store } from "react-easy-state";
import React from "react";
import styled from "styled-components";
import Start from "./Sections/Start/Start";
import Input from "./Sections/Input/Input";
import Data from "./Sections/Data/Data";
import Correlations from "./Sections/Correlations/Correlations";
import Factors from "./Sections/Factors/Factors";
import Rotation from "./Sections/Rotation/Rotation";
import Loadings from "./Sections/Loadings/Loadings";
import Output from "./Sections/Output/Output";
import ProjectHistory from "./Sections/ProjectHistory/ProjectHistory";
import License from "./Sections/License/License";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.localState = store({
      viewStart: true,
      viewInput: false,
      viewData: false,
      viewCorrelations: false,
      viewFactors: false,
      viewRotation: false,
      viewLoadings: false,
      viewOutput: false,
      viewProjectHistory: false,
      viewLicense: false,
      activeWindow: "viewStart"
    });

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(target) {
    const activeWindow = this.localState.activeWindow;
    this.localState[activeWindow] = false;
    this.localState[target] = true;
    this.localState.activeWindow = target;
  }

  render() {
    const {
      viewStart,
      viewInput,
      viewData,
      viewCorrelations,
      viewFactors,
      viewRotation,
      viewLoadings,
      viewOutput,
      viewProjectHistory,
      viewLicense
    } = this.localState;
    return (
      <AppWrap>
        <Header>KADE</Header>
        <Split>
          <FilesWindow>
            <StartButton
              active={viewStart}
              onClick={() => this.handleClick("viewStart")}
            >
              <p className="title">Start</p>
            </StartButton>
            <FileButton
              active={viewInput}
              onClick={() => this.handleClick("viewInput")}
            >
              <p className="title">1. Input</p>
            </FileButton>
            <FileButton
              active={viewData}
              onClick={() => this.handleClick("viewData")}
            >
              <p className="title">2. Data</p>
            </FileButton>
            <FileButton
              active={viewCorrelations}
              onClick={() => this.handleClick("viewCorrelations")}
            >
              <p className="title">3. Correlations</p>
            </FileButton>
            <FileButton
              active={viewFactors}
              onClick={() => this.handleClick("viewFactors")}
            >
              <p className="title">4. Factors</p>
            </FileButton>
            <FileButton
              active={viewRotation}
              onClick={() => this.handleClick("viewRotation")}
            >
              <p className="title">5. Rotation</p>
            </FileButton>
            <FileButton
              active={viewLoadings}
              onClick={() => this.handleClick("viewLoadings")}
            >
              <p className="title">6. Loadings</p>
            </FileButton>
            <FileButton
              active={viewOutput}
              onClick={() => this.handleClick("viewOutput")}
            >
              <p className="title">7. Output</p>
            </FileButton>
            <FileButton
              active={viewProjectHistory}
              onClick={() => this.handleClick("viewProjectHistory")}
            >
              <p className="title">Project History</p>
            </FileButton>
            <FileButton
              active={viewLicense}
              onClick={() => this.handleClick("viewLicense")}
            >
              <p className="title">License</p>
            </FileButton>
          </FilesWindow>
          <ActionWindow>
            {viewStart && <Start view={viewStart} />}
            {viewInput && <Input view={viewInput} />}
            {viewData && <Data view={viewData} />}
            {viewCorrelations && <Correlations view={viewCorrelations} />}
            {viewFactors && <Factors view={viewFactors} />}
            {viewRotation && <Rotation view={viewRotation} />}
            {viewLoadings && <Loadings view={viewLoadings} />}
            {viewOutput && <Output view={viewOutput} />}
            {viewProjectHistory && <ProjectHistory view={viewProjectHistory} />}
            {viewLicense && <License view={viewLicense} />}
          </ActionWindow>
        </Split>
      </AppWrap>
    );
  }
}

export default view(App);

const AppWrap = styled.div`
  margin-top: 23px;
  font-family: Helvetica;
`;

const Header = styled.header`
  display: grid;
  background-color: black;
  font-family: Helvetica;
  color: #d6dbe0;
  font-size: 1rem;
  height: 23px;
  align-items: center;
  text-align: center;
  position: fixed;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  -webkit-app-region: drag;
`;

const Split = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  height: 100vh;
`;

//  background: #140f1d;
const FilesWindow = styled.div`
  background: #d6dbe0;
  border-right: solid 1px #302b3a;
  position: relative;
  width: 150px;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    box-shadow: -10px 0 20px rgba(0, 0, 0, 0.3) inset;
  }
`;

// background: #191324;

const FileButton = styled.button`
  padding: 10px;
  width: 100%;
  background: #d6dbe0;
  opacity: 0.6;
  color: black;
  border: none;
  text-align: left;
  border-bottom: solid 1px #302b3a;
  transition: 0.3s ease all;
  outline: none !important;

  &:hover {
    opacity: 1;
    border-left: solid 8px #d6dbe0;
    background-color: white;
  }

  ${({ active }) =>
    active &&
    `
    background-color: white;
    opacity: 1;
    border-left: solid 8px #d6dbe0;
    `};

  .title {
    font-weght: bold;
    font-size: 0.9rem;
    margin: 0 0 5px;
    color: black;
  }
`;

const ActionWindow = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
`;

const StartButton = styled.button`
  padding: 10px;
  padding-right: 25px;
  width: 100%;
  background-color: #21ba45;
  border: none;
  text-align: center;
  border-bottom: solid 1px #302b3a;
  transition: 0.3s ease all;
  outline: none !important;

  .title {
    font-weight: bold;
    font-size: 1.2rem;
    margin: 5px 0 5px;
    color: black;
  }

  &:hover {
    opacity: 1;
    border-left: solid 8px #d6dbe0;
    background-color: white;
  }

  ${({ active }) =>
    active &&
    `
    background-color: white;
    opacity: 1;
    border-left: solid 8px #d6dbe0;
  
    .title {
    font-weight: bold;
    font-size: 1.2rem;
    margin: 5px 0 5px;
    color: black;
  } 
    `};
`;
