import vizState from "../GlobalState/vizState";

const initializeVizState = () => {
  vizState.consensusIndicator = false;
  vizState.customFactorNames = false;
  vizState.customFileNameLocation = "";

  vizState.factorVizOptions = {};
  vizState.facVizContainerHeight = 600;
  vizState.facVizContainerWidth = 1000;
  vizState.factorVizOptionsHolder = {};
  vizState.maxColumnHeight = 0;

  vizState.numbersHaveBeenAppended = false;

  vizState.positionData = {};

  vizState.stateFrag = {};

  vizState.titleHeight = 30;

  vizState.updateFactorVisualizationsButtonColor = "";

  vizState.willAddCustomNames = false;

  vizState.willAdjustCardFontSize = false;
  vizState.willAdjustCardFontSizeBy = 5;

  vizState.willAdjustCardHeight = false;
  vizState.willAdjustCardHeightBy = 5;

  vizState.willAdjustCardWidth = false;
  vizState.willAdjustCardWidthBy = 5;

  vizState.willAdjustFontSize = false;

  vizState.willAdjustDistIndicatorSize = false;
  vizState.willAdjustDistIndicatorSizeBy = 5;

  vizState.willAdjustLineSpacing = false;
  vizState.willAdjustLineSpacingBy = 0;

  vizState.willAdjustStatementWidth = false;
  vizState.willAdjustStatementWidthBy = 5;

  vizState.willAdjustWidthAsian = false;
  vizState.willAdjustWidthAsianBy = 0;

  vizState.willDisplayDistingCompareSymbols = false;

  vizState.willDisplayConsensusStates = false;

  vizState.willDisplayOnlyStateNums = false;

  vizState.willIncludeLegend = true;

  vizState.willIndicateDistinguishing = false;

  vizState.willPrependStateNums = false;

  vizState.willTrimStatement = true;
  vizState.willTrimStatementBy = 5;

  vizState.willUseDistingUnicode = false;

  vizState.factorVizOptions = {
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
  };

  return;
};

export default initializeVizState;
