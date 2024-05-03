import Dropzone, { FileReader } from "react-dropzone";
import React, { Component } from "react";
import styled from "styled-components";
import state from "../../../store";

const handleDropRejected = (...args) => console.log("reject", args);

function handleDrop(acceptedFiles) {
  acceptedFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const fileAsBinaryString = reader.result;
        // parse blob by new line
        const lines = fileAsBinaryString.split(/[\r\n]+/g);
        // remove empty strings
        const lines2 = lines.filter(e => e === 0 || e);

        if (lines2.length === 0) {
          throw new Error("Can't find any statements in the file!");
          console.log("no statements in the file");
        }

        // send data to STATE
        state.setState({
          statements: lines2
        });
      } catch (error) {
        // set error message
        state.setState({
          csvErrorMessage1: error.message,
          showCsvErrorModal: true
        });
      }
    };
    reader.onabort = () => {
      state.setState({
        excelErrorMessage1: "The file reader aborted the load process!",
        showExcelErrorModal: true
      });
    };
    reader.onerror = () => {
      state.setState({
        excelErrorMessage1: "The file reader encountered an error!",
        showExcelErrorModal: true
      });
    };
    reader.readAsBinaryString(file);
  });
}

const FileUpload = () => {
  return (
    <Section>
      <Dropzone
        onDrop={handleDrop}
        multiple={false}
        onDropRejected={handleDropRejected}
      >
        Drag a file here or
        <br /> click to load.
      </Dropzone>
    </Section>
  );
};

export default FileUpload;

const Section = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 120px;
  width: 280px;

  div {
    border: 2px solid blue;
    height: 60px !important;
    width: 280px;
    padding: 25px 10px 0px 10px;
    text-align: center;
    font-family: Helvetica, sans-serif;
  }
`;
