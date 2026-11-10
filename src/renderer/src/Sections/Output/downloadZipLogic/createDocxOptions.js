import outputState from '../../GlobalState/outputState';
import coreState from '../../GlobalState/coreState';
import i18n from 'i18next';
// import getDateTime from '../downloadDocxLogic/getDateTime';

const createDocxOptions = (dataContent) => {
  const translatedTextObj = {
    projectOverTxt: i18n.t('Project Overview'),
    projectLogTxt: i18n.t('Project Log'),
    downloadTxt: i18n.t('Analysis results downloaded on'),
    correlationMatrixTxt: i18n.t('Correlation Matrix'),
    diagonalText: i18n.t('Diagonal Entries are Standard Errors within Factors'),
    contributingText: i18n.t('Contributing Q Sorts'),
    relativeWeightsText: i18n.t('Relative Weights'),
    factorZScoresTxt: i18n.t("Factor Z-scores, Q sort values, and contributors' raw sort values"),
    flaggedFactorLoadingsText: i18n.t(
      'Flagged factor loadings are listed using bold font and orange highlighting'
    ),
    contTxt: i18n.t('cont'),
    noDistinguishingText: i18n.t('No distinguishing statements for this factor'),
  };

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
    // dateTime: getDateTime(),
    dateTime: 'test',
    statements: coreState.getState().statements,
    sorts: coreState.getState().mainDataObject,
    projectName: coreState.getState().projectName,
    multiplierArray: coreState.getState().multiplierArray,
  };

  return { translatedTextObj, docOptions };
};

export default createDocxOptions;
