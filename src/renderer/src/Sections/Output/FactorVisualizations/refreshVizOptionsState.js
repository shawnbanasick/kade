import state from '../../../store';

const refreshVizOptionsState = () => {
  const userValues = {
    willAddCustomNames: state.getState('willAddCustomNames'),
    willAdjustCardFontSize: state.getState('willAdjustCardFontSize'),
    willAdjustCardFontSizeBy: state.getState('willAdjustCardFontSizeBy'),
    willAdjustCardHeight: state.getState('willAdjustCardHeight'),
    willAdjustCardHeightBy: state.getState('willAdjustCardHeightBy'),
    willAdjustCardWidth: state.getState('willAdjustCardWidth'),
    willAdjustCardWidthBy: state.getState('willAdjustCardWidthBy'),
    willAdjustDistIndicatorSize: state.getState('willAdjustDistIndicatorSize'),
    willAdjustDistIndicatorSizeBy: state.getState('willAdjustDistIndicatorSizeBy'),
    willAdjustFontSize: state.getState('willAdjustFontSize'),
    willAdjustLineSpacing: state.getState('willAdjustLineSpacing'),
    willAdjustLineSpacingBy: state.getState('willAdjustLineSpacingBy'),
    willAdjustStatementWidth: state.getState('willAdjustStatementWidth'),
    willAdjustStatementWidthBy: state.getState('willAdjustStatementWidthBy'),
    willAdjustWidthAsian: state.getState('willAdjustWidthAsian'),
    willAdjustWidthAsianBy: state.getState('willAdjustWidthAsianBy'),
    willDisplayConsensusStates: state.getState('willDisplayConsensusStates'),
    willDisplayDistingCompareSymbols: state.getState('willDisplayDistingCompareSymbols'),
    willDisplayOnlyStateNums: state.getState('willDisplayOnlyStateNums'),
    willIncludeLegend: state.getState('willIncludeLegend'),
    willIndicateDistinguishing: state.getState('willIndicateDistinguishing'),
    willPrependStateNums: state.getState('willPrependStateNums'),
    willTrimStatement: state.getState('willTrimStatement'),
    willTrimStatementBy: state.getState('willTrimStatementBy'),
    willUseDistingUnicode: state.getState('willUseDistingUnicode'),
    consensusIndicator: state.getState('consensusIndicator'),
    customFactorNames: state.getState('customFactorNames'),
    customFileNameLocation: state.getState('customFileNameLocation'),
  };

  return userValues;
};

export default refreshVizOptionsState;
