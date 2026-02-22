import Papa from 'papaparse';
import Dropzone from 'react-dropzone';
import state from '../../../store';
import { sortsDisplayText } from '../logic/sortsDisplayText';
import shiftRawSortsPositive from '../logic/shiftRawSortsPositive';
import calcMultiplierArrayT2 from '../Excel/excelLogic/calcMultiplierArrayT2';
import checkUniqueParticipantNames from '../logic/checkUniqueParticipantNames';

const handleDropRejected = (...args) => console.log('reject', args);

function handleDrop(acceptedFiles) {
  acceptedFiles.forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsedFile = Papa.parse(reader.result);
        const lines3 = parsedFile.data;
        let qSortPatternArray;

        lines3.shift();

        const numberSorts = lines3.length;
        if (lines3[0][1] === '') {
          throw new Error("Can't find any Q-sorts in the file!");
        }

        let maxLength = lines3[0].length;
        for (let i = 0; i < lines3[0].length - 1; i += 1) {
          const value1 = lines3[0][i];
          if (value1 === '') {
            maxLength = i;
            break;
          }
        }

        let minValue;
        let arrayShiftedPositive;
        const mainDataObject = [];
        const respondentNames = [];
        for (let j = 0; j < lines3.length; j += 1) {
          lines3[j].length = maxLength;
          const tempObj = {};
          const name = lines3[j].shift();
          tempObj.name = name;
          respondentNames.push(name);
          const asNumbers = lines3[j].map(Number);
          if (j === 0) {
            minValue = Math.min(...asNumbers);
          }
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

        state.setState({
          numQsorts: numberSorts,
          qSortPattern: qSortPatternArray,
          numStatements: lines3[0].length,
          respondentNames: participantNames,
          mainDataObject,
          sortsDisplayText: sortsDisplayTextArray,
          multiplierArray,
          dataOrigin: 'csv',
        });
      } catch (error) {
        state.setState({
          csvErrorMessage1: error.message,
          showCsvErrorModal: true,
        });
      }
    };
    reader.onabort = () => {
      state.setState({
        excelErrorMessage1: 'The file reader aborted the load process!',
        showExcelErrorModal: true,
      });
    };
    reader.onerror = () => {
      state.setState({
        excelErrorMessage1: 'The file reader encountered an error!',
        showExcelErrorModal: true,
      });
    };
    reader.readAsBinaryString(file);
  });
}

const CsvQsortsDropzone = () => {
  return (
    <div className="grid items-center justify-items-center h-[120px] w-[280px]">
      <Dropzone onDrop={handleDrop} multiple={false} onDropRejected={handleDropRejected}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="border-2 border-blue-600 h-[60px] w-[280px] px-[10px] pt-[25px] pb-0 text-center font-[Helvetica,sans-serif]"
          >
            <input {...getInputProps()} />
            Drag a file here or
            <br /> click to load.
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default CsvQsortsDropzone;
