import coreState from '../../GlobalState/coreState';
import inputState from '../../GlobalState/inputState';
import parseKade from './parseKade';
import createMainDataObject from '../Excel/excelLogic/createMainDataObject';
import sortsDisplayText from '../logic/sortsDisplayText';
import createParticipantNameArray from './createParticipantNameArray';
import createRawSorts from './createRawSorts';
import createStatementNumArray from './createStatementNumArray';
import calcQsortPatternArray from './calcQsortPatternArray';
import modifySortPattern from './modifySortPattern';
import JSZip from 'jszip';

function processKadeZip(data) {
  if (inputState.isDataAlreadyLoaded) {
    inputState.setState({ excelErrorMessage1: 'Data are already loaded.' });
    return;
  }

  let statementNumArray = [];
  let numberSorts = 0;
  let qSortPatternArray = [];
  let participantNames = [];
  let sortDisplayText = [];
  let multiplierArray = [];
  let mainDataObject = [];

  try {
    JSZip.loadAsync(data).then(function (zip) {
      Object.keys(zip.files).forEach(function (filename) {
        inputState.setState({ dataOrigin: 'zip' });

        // HANDLE STATEMENTS
        if (filename === 'statements.txt') {
          zip.files['statements.txt'].async('string').then(function (fileData) {
            const result = fileData
              .split(/\r?\n/)
              .filter((element) => element)
              .map((element) => element.trim());

            coreState.setState({ numStatements: result.length });

            statementNumArray = createStatementNumArray(result.length);

            coreState.setState({ statementNumArray: statementNumArray });
            coreState.setState({ statements: result });
            inputState.setState({ areStatementsLoaded: true });
          });
        }

        // HANDLE SORTS
        if (filename === 'sorts.txt') {
          zip.files['sorts.txt']
            .async('string')
            .then(function (fileData) {
              const result = parseKade(fileData);
              numberSorts = result.length;

              participantNames = createParticipantNameArray(result);
              let rawSorts = createRawSorts(result);
              mainDataObject = createMainDataObject(participantNames, rawSorts);
              sortDisplayText = sortsDisplayText(mainDataObject);
            })
            .then(function () {
              coreState.setState({ respondentNames: participantNames });
              coreState.setState({ numQsorts: numberSorts });
              coreState.setState({ mainDataObject: mainDataObject });
              coreState.setState({ sortsDisplayText: sortDisplayText });
              inputState.setState({ areQsortsLoaded: true });
            });
        }

        // HANDLE PATTERN
        if (filename === 'pattern.txt') {
          let sortPattern = [];
          zip.files['pattern.txt'].async('string').then(function (fileData) {
            sortPattern = parseKade(fileData);
            multiplierArray = modifySortPattern(sortPattern);
            qSortPatternArray = calcQsortPatternArray(multiplierArray);
            coreState.setState({ multiplierArray: multiplierArray });
            coreState.setState({ qSortPattern: qSortPatternArray });
            inputState.setState({ isQsortPatternLoaded: true });
          });
        }

        // HANDLE NAME
        if (filename === 'name.txt') {
          zip.files['name.txt'].async('string').then(function (fileData) {
            coreState.setState({ projectName: fileData });
          });
        }
      });
    });

    inputState.setState({ isDataAlreadyLoaded: true });
  } catch (error) {
    console.log(error.message);
  }
}

export default processKadeZip;
