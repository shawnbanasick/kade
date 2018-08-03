import Dropzone, { FileReader } from "react-dropzone";
import React, { Component } from "react";
import styled from "styled-components";
import store from "../../../store";

const handleDropRejected = (...args) => console.log("reject", args);

// var FileReader =

class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop(acceptedFiles) {
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
          }

          // send data to STATE
          store.setState({
            statements: lines2
          });
        } catch (error) {
          // set error message
          store.setState({
            csvErrorMessage1: error.message,
            showCsvErrorModal: true
          });
        }
      };
      reader.onabort = () => {
        console.log("file reading was aborted");
        store.setState({
          excelErrorMessage1: "The file reader aborted the load process!",
          showExcelErrorModal: true
        });
      };
      reader.onerror = () => {
        console.log("The file reader encountered an error");
        store.setState({
          excelErrorMessage1: "The file reader encountered an error!",
          showExcelErrorModal: true
        });
      };
      reader.readAsBinaryString(file);
    });
  }

  render() {
    // const {handleDrop} = this.actions;
    return (
      <Section>
        <Dropzone
          onDrop={() => this.handleDrop}
          multiple={false}
          onDropRejected={handleDropRejected}
        >
          Drag a file here or
          <br /> click to load.
        </Dropzone>
      </Section>
    );
  }
}

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

//   section div {
//     height: 100px !important;
//     padding: 25px 10px 0px 10px;
//     text-align: center;
//   }

//   .jsonSection {
//     padding: 0px 0px 0px 0px !important;
//     height: 90px;
//     width: 180px;
//     background-color: #21ba45;
//     color: white;
//     font-size: 18px;
//     margin-top: -20px;
//     margin-left: -3px;
//   }
