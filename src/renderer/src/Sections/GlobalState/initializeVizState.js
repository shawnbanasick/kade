import vizState from '../GlobalState/vizState';

const initializeVizState = () => {
  const updateConsensusIndicator = vizState((state) => state.updateConsensusIndicator);
  const updateCustomFactorNames = vizState((state) => state.updateCustomFactorNames);
  const updateCustomFileNameLocation = vizState((state) => state.updateCustomFileNameLocation);

  const updateFacVisContainerHeight = vizState((state) => state.updateFacVisContainerHeight);
  const updateFacVisContainerWidth = vizState((state) => state.updateFacVisContainerWidth);
  const updateFactorVizOptionsHolder = vizState((state) => state.updateFactorVizOptionsHolder);
  const updateMaxColumnHeight = vizState((state) => state.updateMaxColumnHeight);

  const updateNumbersHaveBeenAppended = vizState((state) => state.updateNumbersHaveBeenAppended);

  const updatePositionData = vizState((state) => state.updatePositionData);

  const updateStateFrag = vizState((state) => state.updateStateFrag);

  const updateTitleHeight = vizState((state) => state.updateTitleHeight);

  const updateFactorVisualizationsButtonColor = vizState(
    (state) => state.updateFactorVisualizationsButtonColor
  );

  const updateWillAddCustomNames = vizState((state) => state.updateWillAddCustomNames);

  const updateWillAdjustCardFontSize = vizState((state) => state.updateWillAdjustCardFontSize);
  const updateWillAdjustCardFontSizeBy = vizState((state) => state.updateWillAdjustCardFontSizeBy);

  const updateWillAdjustCardHeight = vizState((state) => state.updateWillAdjustCardHeight);
  const updateWillAdjustCardHeightBy = vizState((state) => state.updateWillAdjustCardHeightBy);

  const updateWillAdjustCardWidth = vizState((state) => state.updateWillAdjustCardWidth);
  const updateWillAdjustCardWidthBy = vizState((state) => state.updateWillAdjustCardWidthBy);

  const updateWillAdjustFontSize = vizState((state) => state.updateWillAdjustFontSize);

  const updateWillAdjustDistIndicatorSize = vizState(
    (state) => state.updateWillAdjustDistIndicatorSize
  );
  const updateWillAdjustDistIndicatorSizeBy = vizState(
    (state) => state.updateWillAdjustDistIndicatorSizeBy
  );

  const updateWillAdjustLineSpacing = vizState((state) => state.updateWillAdjustLineSpacing);
  const updateWillAdjustLineSpacingBy = vizState((state) => state.updateWillAdjustLineSpacingBy);

  const updateWillAdjustStatementWidth = vizState((state) => state.updateWillAdjustStatementWidth);
  const updateWillAdjustStatementWidthBy = vizState(
    (state) => state.updateWillAdjustStatementWidthBy
  );

  const updateWillAdjustWidthAsian = vizState((state) => state.updateWillAdjustWidthAsian);
  const updateWillAdjustWidthAsianBy = vizState((state) => state.updateWillAdjustWidthAsianBy);

  const updateWillDisplayDistingCompareSymbols = vizState(
    (state) => state.updateWillDisplayDistingCompareSymbols
  );

  const updateWillDisplayConsensusStates = vizState(
    (state) => state.updateWillDisplayConsensusStates
  );

  const updateWillDisplayOnlyStateNums = vizState((state) => state.updateWillDisplayOnlyStateNums);

  const updateWillIncludeLegend = vizState((state) => state.updateWillIncludeLegend);

  const updateWillIndicateDistinguishing = vizState(
    (state) => state.updateWillIndicateDistinguishing
  );

  const updateWillPrependStateNums = vizState((state) => state.updateWillPrependStateNums);

  const updateWillTrimStatement = vizState((state) => state.updateWillTrimStatement);
  const updateWillTrimStatementBy = vizState((state) => state.updateWillTrimStatementBy);

  const updateWillUseDistingUnicode = vizState((state) => state.updateWillUseDistingUnicode);

  const updateFactorVizOptions = vizState((state) => state.updateFactorVizOptions);

  updateConsensusIndicator(false);
  updateCustomFactorNames(false);
  updateCustomFileNameLocation('');

  updateFacVisContainerHeight(600);
  updateFacVisContainerWidth(1000);
  updateFactorVizOptionsHolder({});
  updateMaxColumnHeight(0);

  updateNumbersHaveBeenAppended(false);

  updatePositionData({});

  updateStateFrag({});

  updateTitleHeight(30);

  updateFactorVisualizationsButtonColor('');

  updateWillAddCustomNames(false);

  updateWillAdjustCardFontSize(false);
  updateWillAdjustCardFontSizeBy(5);

  updateWillAdjustCardHeight(false);
  updateWillAdjustCardHeightBy(5);

  updateWillAdjustCardWidth(false);
  updateWillAdjustCardWidthBy(5);

  updateWillAdjustFontSize(false);

  updateWillAdjustDistIndicatorSize(false);
  updateWillAdjustDistIndicatorSizeBy(5);

  updateWillAdjustLineSpacing(false);
  updateWillAdjustLineSpacingBy(0);

  updateWillAdjustStatementWidth(false);
  updateWillAdjustStatementWidthBy(5);

  updateWillAdjustWidthAsian(false);
  updateWillAdjustWidthAsianBy(0);

  updateWillDisplayDistingCompareSymbols(false);

  updateWillDisplayConsensusStates(false);

  updateWillDisplayOnlyStateNums(false);

  updateWillIncludeLegend(true);

  updateWillIndicateDistinguishing(false);

  updateWillPrependStateNums(false);

  updateWillTrimStatement(true);
  updateWillTrimStatementBy(5);

  updateWillUseDistingUnicode(false);

  updateFactorVizOptions({
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
  });

  return;
};

export default initializeVizState;
