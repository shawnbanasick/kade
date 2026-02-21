import getDateTime from './getDateTime';
import outputState from '../../GlobalState/outputState';
import newSaveDocumentToFile from './newSaveDocumentToFile';
import coreState from '../../GlobalState/coreState';

// import saveDocumentToZip from './saveDocumentToZip';

// tableCompat = MS Word, LibreOffice Writer
// padCompat = Google Docs, Apple Pages
// let filetype = "tableCompat";
// let filetype = "plainText";

const generateOutputDoc = (translatedTextObj) => {
  // const useZip = outputState((state) => state.willIncludeDataFiles);

  const docOptions = {
    saveAsZip: outputState.getState().willIncludeDataFiles,
    willUseHyperlinks: outputState.getState().willUseHyperlinks,
    willIncludeOverview: outputState.getState().willIncludeOverview,
    willIncludeStatements: outputState.getState().willIncludeStatements,
    willIncludeQsorts: outputState.getState().willIncludeQsorts,
    useTables: outputState.getState().useTables,
    useZebra: outputState.getState().useZebra,
    willIncludeCorrMatrix: outputState.getState().willIncludeCorrMatrix,
    willIncludeThreshold: outputState.getState().willIncludeThreshold,
    correlationThreshold: outputState.getState().correlationThreshold,
    useHyperlinks: outputState.getState().useHyperlinks,
    willIncludeUnrotFacMatrix: outputState.getState().willIncludeUnrotFacMatrix,
    willIncludeCumulComm: outputState.getState().willIncludeCumulComm,
    willIncludeFacLoadings: outputState.getState().willIncludeFacLoadings,
    willIncludeFacLoadingsTable: outputState.getState().willIncludeFacLoadingsTable,
    willIncludeFreeDist: outputState.getState().willIncludeFreeDist,
    willIncludeFacScoreRanks: outputState.getState().willIncludeFacScoreRanks,
    willIncludeFacScoreCorr: outputState.getState().willIncludeFacScoreCorr,
    willIncludeFactors: outputState.getState().willIncludeFactors,
    willIncludeFacDiffs: outputState.getState().willIncludeFacDiffs,
    willIncludeConDis: outputState.getState().willIncludeConDis,
    willIncludeFacChar: outputState.getState().willIncludeFacChar,
    willIncludeDist: outputState.getState().willIncludeDist,
    willIncludeConsensus: outputState.getState().willIncludeConsensus,
    willIncludeRelRanks: outputState.getState().willIncludeRelRanks,
    dateTime: getDateTime(),
    statements: coreState.getState().statements,
    sorts: coreState.getState().mainDataObject,
    projectName: coreState.getState().projectName,
    multiplierArray: coreState.getState().multiplierArray,
  };

  console.log(JSON.stringify(docOptions.sorts, null, 2));

  //let data = dataSource();
  // const data = cloneDeep(calcState.getState().outputData);

  // let projectName = data[0][2][1];
  // let version = data[0][19][1];
  // let dateTime = getDateTime();

  newSaveDocumentToFile(docOptions, translatedTextObj);
};

export default generateOutputDoc;
