import { store } from "react-easy-state";

const vizState = store({
  consensusIndicator: false,
  customFactorNames: false,
  customFileNameLocation: "",

  facVizContainerHeight: 600,
  facVizContainerWidth: 1000,
  factorVizOptionsHolder: {},
  maxColumnHeight: 0,

  numbersHaveBeenAppended: false,

  positionData: {},

  stateFrag: {},

  titleHeight: 30,

  updateFactorVisualizationsButtonColor: "",

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
    showDistinguishingAs: "symbol",
    consensusIndicator: "#d9effe",
    distinguishingIndicator05: "#ededed",
    distinguishingIndicator01: "#bdbdbd",
    customFactorNames: [],
    customFileNameLocation: "append"
  }


});

export default vizState;
