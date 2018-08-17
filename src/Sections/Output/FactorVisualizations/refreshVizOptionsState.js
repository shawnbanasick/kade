import store from "../../store";

const refreshVizOptionsState = () => {
    let userValues = {
        willAddCustomNames: store.getState("willAddCustomNames"),
        willAdjustCardFontSize: store.getState("willAdjustCardFontSize"),
        willAdjustCardFontSizeBy: store.getState("willAdjustCardFontSizeBy"),
        willAdjustCardHeight: store.getState("willAdjustCardHeight"),
        willAdjustCardHeightBy: store.getState("willAdjustCardHeightBy"),
        willAdjustCardWidth: store.getState("willAdjustCardWidth"),
        willAdjustCardWidthBy: store.getState("willAdjustCardWidthBy"),
        willAdjustDistIndicatorSize: store.getState("willAdjustDistIndicatorSize"),
        willAdjustDistIndicatorSizeBy: store.getState(
            "willAdjustDistIndicatorSizeBy"
        ),
        willAdjustFontSize: store.getState("willAdjustFontSize"),
        willAdjustLineSpacing: store.getState("willAdjustLineSpacing"),
        willAdjustLineSpacingBy: store.getState("willAdjustLineSpacingBy"),
        willAdjustStatementWidth: store.getState("willAdjustStatementWidth"),
        willAdjustStatementWidthBy: store.getState("willAdjustStatementWidthBy"),
        willAdjustWidthAsian: store.getState("willAdjustWidthAsian"),
        willAdjustWidthAsianBy: store.getState("willAdjustWidthAsianBy"),
        willDisplayConsensusStates: store.getState("willDisplayConsensusStates"),
        willDisplayDistingCompareSymbols: store.getState(
            "willDisplayDistingCompareSymbols"
        ),
        willDisplayOnlyStateNums: store.getState("willDisplayOnlyStateNums"),
        willIncludeLegend: store.getState("willIncludeLegend"),
        willIndicateDistinguishing: store.getState("willIndicateDistinguishing"),
        willPrependStateNums: store.getState("willPrependStateNums"),
        willTrimStatement: store.getState("willTrimStatement"),
        willTrimStatementBy: store.getState("willTrimStatementBy"),
        willUseDistingUnicode: store.getState("willUseDistingUnicode"),
        consensusIndicator: store.getState("consensusIndicator"),
        customFactorNames: store.getState("customFactorNames"),
        customFileNameLocation: store.getState("customFileNameLocation")
    };

    return userValues;
};

export default refreshVizOptionsState;

