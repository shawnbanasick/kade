import styled from "styled-components";
import React, { Component } from "react";
import state from "../../../store";
import downloadCSVdata from "./downloadCSVdata";

const handleClick = () => {
  const isJsonLoaded = state.getState("showJsonFileLoadedMessage");
  if (isJsonLoaded) {
    downloadCSVdata();
  } else {
    state.setState({
      showErrorMessageBar: true,
      errorMessage: `No data to download`,
      extendedErrorMessage: "No data available for download."
    });
  }
};

class DownloadCsvModal extends Component {
  render() {
    return (
      <GridContainerDiv>
        <Button onClick={handleClick}>Download JSON data as CSV</Button>
      </GridContainerDiv>
    );
  }
}
export default DownloadCsvModal;

const Button = styled.button`
  height: 50px;
  width: 320px;
  background-color: #d6dbe0;
  border-radius: 5px;
  font-size: 18px;
  font-family: Helvetica, sans-serif;
`;

const GridContainerDiv = styled.div`
  grid-column-start: 2;
  grid-row-start: 5;
`;
