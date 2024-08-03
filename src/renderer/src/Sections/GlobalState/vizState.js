import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const vizState = create(
  immer((set, get) => ({
    consensusIndicator: false,
    customFactorNames: false,
    customFileNameLocation: '',

    facVizContainerHeight: 600,
    facVizContainerWidth: 1000,
    factorVizOptionsHolder: {},
    maxColumnHeight: 0,

    numbersHaveBeenAppended: false,

    positionData: {},

    refreshFactorData: {},

    stateFrag: {},

    titleHeight: 30,

    factorVisualizationsButtonColor: '#d6dbe0',

    willAddCustomNames: false,

    willAdjustCardFontSize: false,
    willAdjustCardFontSizeBy: 5,

    willAdjustCardHeight: false,
    willAdjustCardHeightBy: 5,

    willAdjustCardWidth: false,
    willAdjustCardWidthBy: 5,

    willAdjustFontSize: false,

    willAdjustDistIndicatorSize: false,
    willAdjustDistIndicatorSizeBy: 5,

    willAdjustLineSpacing: false,
    willAdjustLineSpacingBy: 0,

    willAdjustStatementWidth: false,
    willAdjustStatementWidthBy: 5,

    willAdjustWidthAsian: false,
    willAdjustWidthAsianBy: 0,

    willDisplayDistingCompareSymbols: false,

    willDisplayConsensusStates: false,

    willDisplayOnlyStateNums: false,

    willIncludeLegend: true,

    willIndicateDistinguishing: false,

    willPrependStateNums: false,

    willTrimStatement: true,
    willTrimStatementBy: 5,

    willUseDistingUnicode: false,

    factorVizOptions: {
      willAddCustomNames: false,
      willAddCustomNameToDownload: false,
      willAdjustCardFontSize: false,
      willAdjustCardFontSizeBy: 13,
      willAdjustCardHeight: false,
      willAdjustCardHeightBy: 110,
      willAdjustCardWidth: false,
      willAdjustCardWidthBy: 110,
      willAdjustDistIndicatorSize: false,
      willAdjustDistIndicatorSizeBy: 12,
      willAdjustIndicatorSize: false,
      willAdjustIndicatorSizeBy: 12,
      willAdjustFontSize: false,
      willAdjustFontSizeBy: 14,
      willAdjustLineSpacing: false,
      willAdjustLineSpacingBy: 1.4,
      willAdjustStatementWidth: false,
      willAdjustStatementWidthBy: 15,
      willAdjustWidthAsian: false,
      willAdjustWidthAsianBy: 12,
      willAdjustTopMargin: false,
      willAdjustTopMarginBy: 5,
      willDisplayConsensusStates: false,
      willDisplayDistingCompareSymbols: true,
      willDisplayOnlyStateNums: false,
      willIncludeLegend: true,
      willIndicateDistinguishing: true,
      willPrependStateNums: false,
      willTrimStatement: true,
      willTrimStatementBy: 5,
      willUseDistingUnicode: true,
      showDistinguishingAs: 'symbol',
      consensusIndicator: '#d9effe',
      distinguishingIndicator05: '#ededed',
      distinguishingIndicator01: '#bdbdbd',
      customFactorNames: [],
      customFileNameLocation: 'append',
    },

    updateRefreshFactorData: (inputValue) => set({ refreshFactorData: inputValue }),
    updateConsensusIndicator: (inputValue) => set({ consensusIndicator: inputValue }),
    updateCustomFactorNames: (inputValue) => set({ customFactorNames: inputValue }),
    updateCustomFileNameLocation: (inputValue) => set({ customFileNameLocation: inputValue }),
    updateFacVizContainerHeight: (inputValue) => set({ facVizContainerHeight: inputValue }),
    updateFacVizContainerWidth: (inputValue) => set({ facVizContainerWidth: inputValue }),
    updateFactorVizOptionsHolder: (inputValue) => set({ factorVizOptionsHolder: inputValue }),
    updateMaxColumnHeight: (inputValue) => set({ maxColumnHeight: inputValue }),
    updateNumbersHaveBeenAppended: (inputValue) => set({ numbersHaveBeenAppended: inputValue }),
    updatePositionData: (inputValue) => set({ positionData: inputValue }),
    updateStateFrag: (inputValue) => set({ stateFrag: inputValue }),
    updateTitleHeight: (inputValue) => set({ titleHeight: inputValue }),
    updateFactorVisualizationsButtonColor: (inputValue) =>
      set({ factorVisualizationsButtonColor: inputValue }),
    updateWillAddCustomNames: (inputValue) => set({ willAddCustomNames: inputValue }),
    updateWillAdjustCardFontSize: (inputValue) => set({ willAdjustCardFontSize: inputValue }),
    updateWillAdjustCardFontSizeBy: (inputValue) => set({ willAdjustCardFontSizeBy: inputValue }),
    updateWillAdjustCardHeight: (inputValue) => set({ willAdjustCardHeight: inputValue }),
    updateWillAdjustCardHeightBy: (inputValue) => set({ willAdjustCardHeightBy: inputValue }),
    updateWillAdjustCardWidth: (inputValue) => set({ willAdjustCardWidth: inputValue }),
    updateWillAdjustCardWidthBy: (inputValue) => set({ willAdjustCardWidthBy: inputValue }),
    updateWillAdjustFontSize: (inputValue) => set({ willAdjustFontSize: inputValue }),
    updateWillAdjustDistIndicatorSize: (inputValue) =>
      set({ willAdjustDistIndicatorSize: inputValue }),
    updateWillAdjustDistIndicatorSizeBy: (inputValue) =>
      set({ willAdjustDistIndicatorSizeBy: inputValue }),
    updateWillAdjustLineSpacing: (inputValue) => set({ willAdjustLineSpacing: inputValue }),
    updateWillAdjustLineSpacingBy: (inputValue) => set({ willAdjustLineSpacingBy: inputValue }),
    updateWillAdjustStatementWidth: (inputValue) => set({ willAdjustStatementWidth: inputValue }),
    updateWillAdjustStatementWidthBy: (inputValue) =>
      set({ willAdjustStatementWidthBy: inputValue }),
    updateWillAdjustWidthAsian: (inputValue) => set({ willAdjustWidthAsian: inputValue }),
    updateWillAdjustWidthAsianBy: (inputValue) => set({ willAdjustWidthAsianBy: inputValue }),
    updateWillDisplayDistingCompareSymbols: (inputValue) =>
      set({ willDisplayDistingCompareSymbols: inputValue }),
    updateWillDisplayConsensusStates: (inputValue) =>
      set({ willDisplayConsensusStates: inputValue }),
    updateWillDisplayOnlyStateNums: (inputValue) => set({ willDisplayOnlyStateNums: inputValue }),
    updateWillIncludeLegend: (inputValue) => set({ willIncludeLegend: inputValue }),
    updateWillIndicateDistinguishing: (inputValue) =>
      set({ willIndicateDistinguishing: inputValue }),
    updateWillPrependStateNums: (inputValue) => set({ willPrependStateNums: inputValue }),
    updateWillTrimStatement: (inputValue) => set({ willTrimStatement: inputValue }),
    updateWillTrimStatementBy: (inputValue) => set({ willTrimStatementBy: inputValue }),
    updateWillUseDistingUnicode: (inputValue) => set({ willUseDistingUnicode: inputValue }),
    updateFactorVizOptions: (inputValue) => set({ factorVizOptions: inputValue }),
  }))
);

export default vizState;
