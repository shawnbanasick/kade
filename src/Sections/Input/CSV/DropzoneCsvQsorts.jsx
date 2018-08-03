import "./Dropzone.css";
import Papa from "papaparse";
import store from "../../../store";
import Dropzone from "react-dropzone";
import React, { Component } from "react";
import { sortsDisplayText } from "../uploadLogic/sortsDisplayText";
import shiftRawSortsPositive from "../uploadLogic/shiftRawSortsPositive";
import calcMultiplierArrayT2 from "../excelUploadLogic/calcMultiplierArrayT2";
import checkUniqueParticipantNames from '../../SortsList/checkUniqueParticipantName';

const handleDropRejected = (...args) => console.log("reject", args);

class FileUpload extends Component {
    handleDrop(acceptedFiles) {
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const parsedFile = Papa.parse(reader.result);

                    let lines3 = parsedFile.data;

                    let qSortPatternArray;

                    // remove the first (header) line
                    lines3.shift();

                    // parsing first line of PQMethod file to set qav variables
                    let numberSorts = lines3.length;

                    if (lines3[0][1] === "") {
                        throw new Error("Can't find any Q-sorts in the file!");
                    }

                    // remove empty "" strings from array
                    let maxLength = lines3[0].length;
                    for (let i = 0; i < lines3[0].length - 1; i++) {
                        let value1 = lines3[0][i];
                        if (value1 === "") {
                            maxLength = i;
                            break;
                        }
                    }

                    // todo - check if other data import methods check to see if min value is above zero
                    // before doing positive shift for raw sorts
                    let minValue,
                        arrayShiftedPositive;
                    let mainDataObject = [];
                    let respondentNames = [];
                    for (let j = 0; j < lines3.length; j++) {
                        lines3[j].length = maxLength;
                        let tempObj = {};
                        let name = lines3[j].shift();
                        tempObj.name = name;
                        respondentNames.push(name);
                        let asNumbers = lines3[j].map(Number);
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

                    qSortPatternArray.sort(function(a, b) {
                        return a - b;
                    });

                    let multiplierArray = calcMultiplierArrayT2([...qSortPatternArray]);

                    let sortsDisplayTextArray = sortsDisplayText(mainDataObject);

                    let participantNames = checkUniqueParticipantNames(respondentNames);

                    // send data to STATE
                    store.setState({
                        numQsorts: numberSorts,
                        qSortPattern: qSortPatternArray,
                        numStatements: lines3[0].length,
                        respondentNames: participantNames,
                        mainDataObject: mainDataObject,
                        sortsDisplayText: sortsDisplayTextArray,
                        multiplierArray: multiplierArray,
                        dataOrigin: "csv"
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
            <section>
              <Dropzone onDrop={ this.handleDrop } multiple={ false } onDropRejected={ handleDropRejected }>
                Drag a file here or
                <br /> click to load.
              </Dropzone>
            </section>
            );
    }
}

export default FileUpload;
