import Papa from "papaparse";
import styled from "styled-components";
import React, { Component } from "react";
import Dropzone, { FileReader } from "react-dropzone";
import store from "../../../store";
import { sortsDisplayText } from "../logic/sortsDisplayText.js";
import shiftRawSortsPositive from "../logic/shiftRawSortsPositive.js";
import calcMultiplierArrayT2 from "../logic/excelLogic/calcMultiplierArrayT2.js";
import checkUniqueParticipantNames from "../logic/checkUniqueParticipantName.js";

const handleDropRejected = (...args) => console.log("reject", args);

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
          const parsedFile = Papa.parse(reader.result);

          const lines3 = parsedFile.data;

          let qSortPatternArray;

          // remove the first (header) line
          lines3.shift();

          // parsing first line of PQMethod file to set qav variables
          const numberSorts = lines3.length;

          if (lines3[0][1] === "") {
            throw new Error("Can't find any Q-sorts in the file!");
          }

          // remove empty "" strings from array
          let maxLength = lines3[0].length;
          for (let i = 0; i < lines3[0].length - 1; i++) {
            const value1 = lines3[0][i];
            if (value1 === "") {
              maxLength = i;
              break;
            }
          }

          // todo - check if other data import methods check to see if min value is above zero
          // before doing positive shift for raw sorts
          let minValue;
          let arrayShiftedPositive;
          const mainDataObject = [];
          const respondentNames = [];
          for (let j = 0; j < lines3.length; j++) {
            lines3[j].length = maxLength;
            const tempObj = {};
            const name = lines3[j].shift();
            tempObj.name = name;
            respondentNames.push(name);
            const asNumbers = lines3[j].map(Number);
            if (j === 0) {
              minValue = Math.min(...asNumbers);
            }
            // grab last for for qSortPattern
            qSortPatternArray = asNumbers;

            if (minValue < 1) {
              arrayShiftedPositive = shiftRawSortsPositive(asNumbers, minValue);
            } else {
              arrayShiftedPositive = [...asNumbers];
            }
            tempObj.posShiftSort = arrayShiftedPositive;
            tempObj.rawSort = asNumbers;
            tempObj.displaySort = lines3[j].toString();
            mainDataObject.push(tempObj);
          }

          qSortPatternArray.sort((a, b) => a - b);

          const multiplierArray = calcMultiplierArrayT2([...qSortPatternArray]);

          const sortsDisplayTextArray = sortsDisplayText(mainDataObject);

          const participantNames = checkUniqueParticipantNames(respondentNames);

          // send data to STATE
          store.setState({
            numQsorts: numberSorts,
            qSortPattern: qSortPatternArray,
            numStatements: lines3[0].length,
            respondentNames: participantNames,
            mainDataObject,
            sortsDisplayText: sortsDisplayTextArray,
            multiplierArray,
            dataOrigin: "csv"
          });
          console.log(JSON.stringify(qSortPatternArray));
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
          onDrop={this.handleDrop}
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