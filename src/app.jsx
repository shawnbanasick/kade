import React from "react";
import styled from "styled-components";
// import settings from "electron-settings";


class App extends React.Component {

    render() {
        // const {activeIndex} = this.state;
        return (
            <AppWrap>
              <Header>KANDED</Header>
              <Split>
                <FilesWindow>
                  <FileButton>
                    <p className="title">
                      Start
                    </p>
                  </FileButton>
                  <FileButton>
                    <p className="title">
                      1. Input
                    </p>
                  </FileButton>
                  <FileButton>
                    <p className="title">
                      2. Factors
                    </p>
                  </FileButton>
                  <FileButton>
                    <p className="title">
                      3. Rotation
                    </p>
                  </FileButton>
                  <FileButton>
                    <p className="title">
                      4. Loadings
                    </p>
                  </FileButton>
                  <FileButton>
                    <p className="title">
                      5. Output
                    </p>
                  </FileButton>
                </FilesWindow>
              </Split>
            </AppWrap>
            );
    }
}

export default App;

const AppWrap = styled.div`
  margin-top: 23px;
`;

const Header = styled.header`
  display:grid;
  background-color: #d3d3d3;
  font-family:  Helvetica;
  color: black;
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
  display: flex;
  height: 100vh;
`;

//  background: #140f1d;
const FilesWindow = styled.div`
  background: #d3d3d3;
  border-right: solid 1px #302b3a;
  position: relative;
  width: 20%;
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
  background: #d3d3d3;
  opacity: 0.4;
  color: black;
  border: none;
  text-align: left;
  border-bottom: solid 1px #302b3a;
  transition: 0.3s ease all;

  &:hover {
    opacity: 1;
    border-left: solid 8px #82d8d8;
  }

  ${({ active }) =>
    active &&
    `
    opacity: 1;
    border-left: solid 8px #83cafe;
    `};

  .title {
    font-wight: bold;
    font-size: 0.9rem;
    margin: 0 0 5px;
  }

  .date {
    margin: 0;
  }
`;
