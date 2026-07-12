import { update } from 'lodash';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

//   distStateListSortKey: "",

const outputState = create(
  immer((set, get) => ({
    displayFactorVisualizations: true,
    distStateLowerValueText: `p<0.05`,
    distStateUpperValueText: `p<0.01`,
    factorsWithoutLoading: [],

    notifyOutputDistStateError: false,

    highlightFactor1: false,
    highlightFactor2: false,
    highlightFactor3: false,
    highlightFactor4: false,
    highlightFactor5: false,
    highlightFactor6: false,
    highlightFactor7: false,
    highlightFactor8: false,

    sigDropdownValue1: '2.575',
    sigDropdownValue2: '1.96',

    outputActiveTabIndex: 'tab1',
    outputButtonsArray: [],
    outputFactorSelectButtonsDisabled: false,
    outputForDataViz: [],
    outputForDataViz2: [],

    selectAllClicked: false,

    shouldDisplayFactorVizOptions: false,

    showDocxOptions: false,
    downloadDocxButtonActive: false,
    showDownloadOutputButtons: false,

    showFactorCharacteristicsTable: false,
    showFactorCorrelationsTable: false,
    showMultipleFactorsFlaggedWarningModal: false,
    showNoLoadingsFlaggedWarningModal: false,
    showTableDataNotSentWarning: true,
    showOutputFactorSelection: false,
    showStandardErrorsDifferences: false,

    sliceValueDistStateSigLevelDrop1: 1.96,
    sortsFlaggedOnTwoFactors: [],

    thresholdButtonActive: false,
    qSortValueButtonActive: false,
    statementNumButtonActive: true,
    zScoreButtonActive: false,
    distStateListSortKey: 'statementNum',

    threshold: 3,
    stephensonsThreshold: 0.01,
    cohensThreshold: 0.3,
    sortCohensBy: 'cohenLevel',
    cohenSortByCohensButtonActive: true,
    cohenSortBySortValueButtonActive: false,
    cohenSortByStatementNumButtonActive: false,
    userSelectedFactors: [],

    // DOCX options
    willIncludeThreshold: false,
    correlationThreshold: 40,
    useClipped: true,
    useClippedButtonActive: true,
    useTables: false,
    useTablesButtonActive: false,
    useZebra: true,
    willIncludeToc: false,
    willUseHyperlinks: false,
    willIncludeDataFiles: false,

    // DOCX sections
    willIncludeOverview: true,
    willIncludeStatements: true,
    willIncludeQsorts: true,
    willIncludeCorrMatrix: true,
    willIncludeUnrotFacMatrix: true,
    willIncludeCumulComm: true,
    willIncludeFacLoadings: true,
    willIncludeFacLoadingsTable: true,
    willIncludeFreeDist: true,
    willIncludeFacScoreRanks: true,
    willIncludeFacScoreCorr: true,
    willIncludeFactors: true,
    willIncludeFacDiffs: true,
    willIncludeConDis: true,
    willIncludeFacChar: true,
    willIncludeDist: true,
    willIncludeConsensus: true,
    willIncludeRelRanks: true,

    partNumArray: [
      '1 - 15',
      '16 - 30',
      '31 - 45',
      '46 - 60',
      '61 - 75',
      '76 - 90',
      '91 - 105',
      '106 - 120',
      '121 - 135',
      '136 - 150',
      '151 - 165',
      '166 - 180',
      '181 - 195',
      '196 - 210',
      '211 - 225',
      '226 - 240',
      '241 - 255',
      '256 - 270',
      '271 - 285',
      '286 - 300',
      '301 - 315',
      '316 - 330',
      '331 - 345',
      '346 - 360',
      '361 - 375',
      '376 - 390',
      '391 - 405',
      '406 - 420',
      '421 - 435',
      '436 - 450',
      '451 - 465',
      '466 - 480',
      '481 - 495',
      '496 - 510',
    ],
    cohens10: {},
    cohens10ButtonActive: false,
    cohens20: {},
    cohens20ButtonActive: false,
    cohens30: {},
    cohens30ButtonActive: false,
    cohens40: {},
    cohens40ButtonActive: false,
    cohens50: {},
    cohens50ButtonActive: false,
    cohens60: {},
    cohens60ButtonActive: false,
    cohens70: {},
    cohens70ButtonActive: false,
    cohens80: {},
    cohens80ButtonActive: false,
    cohens90: {},
    cohens90ButtonActive: false,
    cohens100: {},
    cohens100ButtonActive: false,
    stephensonMethodButtonActive: true,
    cohenMethodButtonActive: false,
    resultsStephensonMethodButtonActive: true,
    resultsCohenMethodButtonActive: false,
    distIdentType: 'stephensonMethod',
    resultsDistIdentType: 'stephensonMethod',
    consensusDisagreeArray: [],
    p0001Active: false,
    p0005Active: false,
    p001Active: false,
    p005Active: false,
    p01Active: false,
    p05Active: true,
    p1Active: false,
    p15Active: false,
    p2Active: false,
    ConThresholdButtonActive: false,
    ConNumberButtonActive: false,
    conStephensonSortBy: 'threshold',
    conStephensonDataForExport: [],
    conCohenDataForExport: [],
    resultsCohenButtons1Value: 0.5,
    resultsCohenButtons2Value: 0.8,
    resultsCohen10Button1Active: false,
    resultsCohen20Button1Active: false,
    resultsCohen30Button1Active: false,
    resultsCohen40Button1Active: false,
    resultsCohen50Button1Active: true,
    resultsCohen60Button1Active: false,
    resultsCohen70Button1Active: false,
    resultsCohen80Button1Active: false,
    resultsCohen90Button1Active: false,
    resultsCohen100Button1Active: false,
    resultsCohen10Button2Active: false,
    resultsCohen20Button2Active: false,
    resultsCohen30Button2Active: false,
    resultsCohen40Button2Active: false,
    resultsCohen50Button2Active: false,
    resultsCohen60Button2Active: false,
    resultsCohen70Button2Active: false,
    resultsCohen80Button2Active: true,
    resultsCohen90Button2Active: false,
    resultsCohen100Button2Active: false,
    displayOutputTabContent: false,
    buttonFactorLabels: [
      { show: true, id: 'factor 1', isActive: false, key: 'factor1', label: '1' },
      { show: true, id: 'factor 2', isActive: false, key: 'factor2', label: '2' },
      { show: true, id: 'factor 3', isActive: false, key: 'factor3', label: '3' },
      { show: true, id: 'factor 4', isActive: false, key: 'factor4', label: '4' },
      { show: true, id: 'factor 5', isActive: false, key: 'factor5', label: '5' },
      { show: true, id: 'factor 6', isActive: false, key: 'factor6', label: '6' },
      { show: true, id: 'factor 7', isActive: false, key: 'factor7', label: '7' },
      { show: true, id: 'factor 8', isActive: false, key: 'factor8', label: '8' },
    ],
    highlightedFactors: {},

    // for factorSelectionForOutputButtons.jsx
    toggleUserSelectedFactor: (factor) =>
      set((state) => {
        const exists = state.userSelectedFactors.includes(factor);
        const userSelectedFactors = exists
          ? state.userSelectedFactors.filter((f) => f !== factor)
          : [...state.userSelectedFactors, factor].sort();

        return {
          userSelectedFactors,
          highlightedFactors: {
            ...state.highlightedFactors,
            [factor.replace('factor ', '')]: !exists,
          },
        };
      }),

    selectAllFactors: (btnId) =>
      set((state) => {
        const userSelectedFactors = btnId.map((n) => `factor ${n}`);
        const highlightedFactors = { ...state.highlightedFactors };
        btnId.forEach((n) => {
          highlightedFactors[n] = true;
        });
        return { userSelectedFactors, highlightedFactors };
      }),

    clearAllFactors: () =>
      set((state) => {
        const highlightedFactors = {};
        Object.keys(state.highlightedFactors).forEach((n) => {
          highlightedFactors[n] = false;
        });
        return { userSelectedFactors: [], highlightedFactors };
      }),
    updateButtonFactorLabels: (inputValue) => set({ buttonFactorLabels: [...inputValue] }),
    updateResultsDistIdentType: (inputValue) => set({ resultsDistIdentType: inputValue }),
    updateDisplayOutputTabContent: (inputValue) => set({ displayOutputTabContent: inputValue }),
    updateResultsCohenButtons1Active: (buttonId, isActive) => {
      const buttonKey = `resultsCohen${buttonId}Button1Active`;
      set({ [buttonKey]: isActive });
    },
    updateResultsCohenButtons2Active: (buttonId, isActive) => {
      const buttonKey = `resultsCohen${buttonId}Button2Active`;
      set({ [buttonKey]: isActive });
    },
    updateResultsCohenButtons1Value: (inputValue) => set({ resultsCohenButtons1Value: inputValue }),
    updateResultsCohenButtons2Value: (inputValue) => set({ resultsCohenButtons2Value: inputValue }),
    updateConStephensonDataForExport: (inputValue) =>
      set({ conStephensonDataForExport: inputValue }),
    updateConCohenDataForExport: (inputValue) => set({ conCohenDataForExport: inputValue }),
    updateConStephensonSortBy: (inputValue) => set({ conStephensonSortBy: inputValue }),
    updateConThresholdButtonActive: (inputValue) => set({ ConThresholdButtonActive: inputValue }),
    updateConNumberButtonActive: (inputValue) => set({ ConNumberButtonActive: inputValue }),
    updateP0001Active: (inputValue) => set({ p0001Active: inputValue }),
    updateP0005Active: (inputValue) => set({ p0005Active: inputValue }),
    updateP001Active: (inputValue) => set({ p001Active: inputValue }),
    updateP005Active: (inputValue) => set({ p005Active: inputValue }),
    updateP01Active: (inputValue) => set({ p01Active: inputValue }),
    updateP05Active: (inputValue) => set({ p05Active: inputValue }),
    updateP1Active: (inputValue) => set({ p1Active: inputValue }),
    updateP15Active: (inputValue) => set({ p15Active: inputValue }),
    updateP2Active: (inputValue) => set({ p2Active: inputValue }),

    updateStephensonsThreshold: (inputValue) => set({ stephensonsThreshold: inputValue }),
    updateCohenSortByCohensButtonActive: (inputValue) =>
      set({ cohenSortByCohensButtonActive: inputValue }),
    updateCohenSortBySortValueButtonActive: (inputValue) =>
      set({ cohenSortBySortValueButtonActive: inputValue }),
    updateCohenSortByStatementNumButtonActive: (inputValue) =>
      set({ cohenSortByStatementNumButtonActive: inputValue }),
    updateSortCohensBy: (inputValue) => set({ sortCohensBy: inputValue }),
    updateConsensusDisagreeArray: (inputValue) => set({ consensusDisagreeArray: inputValue }),
    updateCohensThreshold: (inputValue) => set({ cohensThreshold: inputValue }),
    updateCohens10: (inputValue) => set({ cohens10: inputValue }),
    updateCohens20: (inputValue) => set({ cohens20: inputValue }),
    updateCohens30: (inputValue) => set({ cohens30: inputValue }),
    updateCohens40: (inputValue) => set({ cohens40: inputValue }),
    updateCohens50: (inputValue) => set({ cohens50: inputValue }),
    updateCohens60: (inputValue) => set({ cohens60: inputValue }),
    updateCohens70: (inputValue) => set({ cohens70: inputValue }),
    updateCohens80: (inputValue) => set({ cohens80: inputValue }),
    updateCohens90: (inputValue) => set({ cohens90: inputValue }),
    updateCohens100: (inputValue) => set({ cohens100: inputValue }),
    updateCohens10ButtonActive: (inputValue) => set({ cohens10ButtonActive: inputValue }),
    updateCohens20ButtonActive: (inputValue) => set({ cohens20ButtonActive: inputValue }),
    updateCohens30ButtonActive: (inputValue) => set({ cohens30ButtonActive: inputValue }),
    updateCohens40ButtonActive: (inputValue) => set({ cohens40ButtonActive: inputValue }),
    updateCohens50ButtonActive: (inputValue) => set({ cohens50ButtonActive: inputValue }),
    updateCohens60ButtonActive: (inputValue) => set({ cohens60ButtonActive: inputValue }),
    updateCohens70ButtonActive: (inputValue) => set({ cohens70ButtonActive: inputValue }),
    updateCohens80ButtonActive: (inputValue) => set({ cohens80ButtonActive: inputValue }),
    updateCohens90ButtonActive: (inputValue) => set({ cohens90ButtonActive: inputValue }),
    updateCohens100ButtonActive: (inputValue) => set({ cohens100ButtonActive: inputValue }),
    updateSigDropdownValue1: (inputValue) => set({ sigDropdownValue1: inputValue }),
    updateSigDropdownValue2: (inputValue) => set({ sigDropdownValue2: inputValue }),
    updateHighlightFactor1: (inputValue) => set({ highlightFactor1: inputValue }),
    updateHighlightFactor2: (inputValue) => set({ highlightFactor2: inputValue }),
    updateHighlightFactor3: (inputValue) => set({ highlightFactor3: inputValue }),
    updateHighlightFactor4: (inputValue) => set({ highlightFactor4: inputValue }),
    updateHighlightFactor5: (inputValue) => set({ highlightFactor5: inputValue }),
    updateHighlightFactor6: (inputValue) => set({ highlightFactor6: inputValue }),
    updateHighlightFactor7: (inputValue) => set({ highlightFactor7: inputValue }),
    updateHighlightFactor8: (inputValue) => set({ highlightFactor8: inputValue }),

    updateDisplayFactorVisualizations: (inputValue) =>
      set({ displayFactorVisualizations: inputValue }),
    updateDistStateLowerValueText: (inputValue) => set({ distStateLowerValueText: inputValue }),
    updateDistStateUpperValueText: (inputValue) => set({ distStateUpperValueText: inputValue }),
    updateFactorsWithoutLoading: (inputValue) => set({ factorsWithoutLoading: inputValue }),
    updateNotifyOutputDistStateError: (inputValue) =>
      set({ notifyOutputDistStateError: inputValue }),
    updateOutputActiveTabIndex: (inputValue) => set({ outputActiveTabIndex: inputValue }),
    updateOutputButtonsArray: (inputValue) => set({ outputButtonsArray: inputValue }),
    updateOutputFactorSelectButtonsDisabled: (inputValue) =>
      set({ outputFactorSelectButtonsDisabled: inputValue }),
    updateOutputForDataViz: (inputValue) => set({ outputForDataViz: inputValue }),
    updateOutputForDataViz2: (inputValue) => set({ outputForDataViz2: inputValue }),
    updateSelectAllClicked: (inputValue) => set({ selectAllClicked: inputValue }),
    updateShouldDisplayFactorVizOptions: (inputValue) =>
      set({ shouldDisplayFactorVizOptions: inputValue }),
    updateShowDocxOptions: (inputValue) => set({ showDocxOptions: inputValue }),
    updateDownloadDocxButtonActive: (inputValue) => set({ downloadDocxButtonActive: inputValue }),
    updateShowDownloadOutputButtons: (inputValue) => set({ showDownloadOutputButtons: inputValue }),
    updateShowFactorCharacteristicsTable: (inputValue) =>
      set({ showFactorCharacteristicsTable: inputValue }),
    updateShowFactorCorrelationsTable: (inputValue) =>
      set({ showFactorCorrelationsTable: inputValue }),
    updateShowMultipleFactorsFlaggedWarningModal: (inputValue) =>
      set({ showMultipleFactorsFlaggedWarningModal: inputValue }),
    updateShowNoLoadingsFlaggedWarningModal: (inputValue) =>
      set({ showNoLoadingsFlaggedWarningModal: inputValue }),
    updateShowTableDataNotSentWarning: (inputValue) =>
      set({ showTableDataNotSentWarning: inputValue }),
    updateShowOutputFactorSelection: (inputValue) => set({ showOutputFactorSelection: inputValue }),
    updateShowStandardErrorsDifferences: (inputValue) =>
      set({ showStandardErrorsDifferences: inputValue }),
    updateSliceValueDistStateSigLevelDrop1: (inputValue) =>
      set({ sliceValueDistStateSigLevelDrop1: inputValue }),
    updateSortsFlaggedOnTwoFactors: (inputValue) => set({ sortsFlaggedOnTwoFactors: inputValue }),
    updateThresholdButtonActive: (inputValue) => set({ thresholdButtonActive: inputValue }),
    updateQSortValueButtonActive: (inputValue) => set({ qSortValueButtonActive: inputValue }),
    updateStatementNumButtonActive: (inputValue) => set({ statementNumButtonActive: inputValue }),
    updateZScoreButtonActive: (inputValue) => set({ zScoreButtonActive: inputValue }),
    updateDistStateListSortKey: (inputValue) => set({ distStateListSortKey: inputValue }),
    updateThreshold: (inputValue) => set({ threshold: inputValue }),
    updateUserSelectedFactors: (inputValue) => set({ userSelectedFactors: inputValue }),
    updateWillIncludeThreshold: (inputValue) => set({ willIncludeThreshold: inputValue }),
    updateCorrelationThreshold: (inputValue) => set({ correlationThreshold: inputValue }),
    updateUseClipped: (inputValue) => set({ useClipped: inputValue }),
    updateUseClippedButtonActive: (inputValue) => set({ useClippedButtonActive: inputValue }),
    updateUseTables: (inputValue) => set({ useTables: inputValue }),
    updateUseTablesButtonActive: (inputValue) => set({ useTablesButtonActive: inputValue }),
    updateUseZebra: (inputValue) => set({ useZebra: inputValue }),
    updateWillIncludeToc: (inputValue) => set({ willIncludeToc: inputValue }),
    updateWillUseHyperlinks: (inputValue) => set({ willUseHyperlinks: inputValue }),
    updateWillIncludeDataFiles: (inputValue) => set({ willIncludeDataFiles: inputValue }),
    updateWillIncludeOverview: (inputValue) => set({ willIncludeOverview: inputValue }),
    updateWillIncludeStatements: (inputValue) => set({ willIncludeStatements: inputValue }),
    updateWillIncludeQsorts: (inputValue) => set({ willIncludeQsorts: inputValue }),
    updateWillIncludeCorrMatrix: (inputValue) => set({ willIncludeCorrMatrix: inputValue }),
    updateWillIncludeUnrotFacMatrix: (inputValue) => set({ willIncludeUnrotFacMatrix: inputValue }),
    updateWillIncludeCumulComm: (inputValue) => set({ willIncludeCumulComm: inputValue }),
    updateWillIncludeFacLoadings: (inputValue) => set({ willIncludeFacLoadings: inputValue }),
    updateWillIncludeFacLoadingsTable: (inputValue) =>
      set({ willIncludeFacLoadingsTable: inputValue }),
    updateWillIncludeFreeDist: (inputValue) => set({ willIncludeFreeDist: inputValue }),
    updateWillIncludeFacScoreRanks: (inputValue) => set({ willIncludeFacScoreRanks: inputValue }),
    updateWillIncludeFacScoreCorr: (inputValue) => set({ willIncludeFacScoreCorr: inputValue }),
    updateWillIncludeFactors: (inputValue) => set({ willIncludeFactors: inputValue }),
    updateWillIncludeFacDiffs: (inputValue) => set({ willIncludeFacDiffs: inputValue }),
    updateWillIncludeConDis: (inputValue) => set({ willIncludeConDis: inputValue }),
    updateWillIncludeFacChar: (inputValue) => set({ willIncludeFacChar: inputValue }),
    updateWillIncludeDist: (inputValue) => set({ willIncludeDist: inputValue }),
    updateWillIncludeConsensus: (inputValue) => set({ willIncludeConsensus: inputValue }),
    updateWillIncludeRelRanks: (inputValue) => set({ willIncludeRelRanks: inputValue }),
    updatePartNumArray: (inputValue) => set({ partNumArray: inputValue }),
  }))
);

export default outputState;
