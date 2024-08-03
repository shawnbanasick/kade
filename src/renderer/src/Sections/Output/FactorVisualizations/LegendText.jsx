import { useTranslation } from 'react-i18next';
import vizState from '../../GlobalState/vizState';

const LegendText = (props) => {
  const { t } = useTranslation();
  const maxColumnHeight = vizState((state) => state.maxColumnHeight);
  const factorVizOptions = vizState((state) => state.factorVizOptions);

  function getXCoords() {
    let totalWidth = props.positionData.instances.length * 110;
    if (factorVizOptions.willAdjustCardWidth === true) {
      totalWidth = props.positionData.instances.length * factorVizOptions.willAdjustCardWidthBy;
    }
    const halfWidth = totalWidth / 2;
    const xCoord = halfWidth;
    return xCoord;
  }

  function getYValue() {
    const defaultHeight = maxColumnHeight * 110 + 100;

    const shouldAdjustHeight = factorVizOptions.willAdjustCardHeight;

    if (shouldAdjustHeight === true) {
      const cardHeight = factorVizOptions.willAdjustCardHeightBy;
      const yValue = maxColumnHeight * cardHeight + 100;
      return yValue;
    }
    return defaultHeight;
  }

  const renderLegendRectangleText = (props) => {
    const displayColor = factorVizOptions.consensusIndicator;
    const distinguishingIndicator05 = factorVizOptions.distinguishingIndicator05;
    const distinguishingIndicator01 = factorVizOptions.distinguishingIndicator01;
    const showDistinguishingAs = factorVizOptions.showDistinguishingAs;
    const shouldDisplayConsensus = factorVizOptions.willDisplayConsensusStates;
    const willIndicateDistinguishing = factorVizOptions.willIndicateDistinguishing;
    let willDisplayDistingCompareSymbols = factorVizOptions.willDisplayDistingCompareSymbols;

    const xLocation = getXCoords(props);
    const yLocation = getYValue(props) + 5;

    // hide the comparison symbols if distinguishing is not displayed
    if (willIndicateDistinguishing === false) {
      willDisplayDistingCompareSymbols = false;
    }
    let consensusYLocation = 170;
    if (willIndicateDistinguishing === false) {
      consensusYLocation -= 55;
    }
    if (willDisplayDistingCompareSymbols === false) {
      consensusYLocation -= 60;
    }

    // let symbol05 = "*";
    // let symbol01 = "**";
    // let arrowLeft = "\u003C\u003C";
    // let arrowRight = "\u003E\u003E";
    // if (useUnicode) {
    // symbol05 =  `* `; // "\u25CE";
    const symbol05 = `*`; // "\u26B9\u0020\u0020";
    // symbol01 = "\u25C9";
    const symbol01 = `**`; // "\u26B9\u26B9";
    const arrowLeft = '\u25C4\u0020';
    const arrowRight = '\u25BA\u0020';
    // }
    const additionalXLocationValue = 260;

    const titleStyles = {
      x: xLocation,
      y: yLocation + 30,
      fontSize: 26,
      fontWeight: 'normal',
      textAnchor: 'middle',
      fontFamily: 'Arial, sans-serif',
    };

    const astrick05Style = {
      x: xLocation - additionalXLocationValue + 12,
      y: yLocation + 65,
      fontSize: 20,
      fontFamily: 'Arial, sans-serif',
    };

    const astrick01Style = {
      x: xLocation - additionalXLocationValue + 12,
      y: yLocation + 95,
      fontSize: 20,
      fontFamily: 'Arial, sans-serif',
    };

    const sigSymbolTextStyle1 = {
      x: xLocation - additionalXLocationValue + 30,
      y: yLocation + 65,
      fontSize: 16,
      fontFamily: 'Arial, sans-serif',
    };

    const sigSymbolTextStyle2 = {
      x: xLocation - additionalXLocationValue + 30,
      y: yLocation + 95,
      fontSize: 16,
      fontFamily: 'Arial, sans-serif',
    };

    const zScoreTextHigherStyle3 = {
      x: xLocation - additionalXLocationValue + 30,
      y: yLocation + 125,
      fontSize: 16,
      fontFamily: 'Arial, sans-serif',
    };

    const arrowLeftStyle4 = {
      x: xLocation - additionalXLocationValue + 9,
      y: yLocation + 155,
      fontSize: 16,
      fontFamily: 'Arial, sans-serif',
    };

    const zScoreTextLowerStyle5 = {
      x: xLocation - additionalXLocationValue + 30,
      y: yLocation + 155,
      fontSize: 16,
      fontFamily: 'Arial, sans-serif',
    };

    const arrowRightStyle6 = {
      x: xLocation - additionalXLocationValue + 9,
      y: yLocation + 125,
      fontSize: 16,
      fontFamily: 'Arial, sans-serif',
    };

    const consensusRectStyles = {
      x: xLocation - additionalXLocationValue + 9,
      y: yLocation + consensusYLocation,
      width: 15,
      height: 15,
      fill: displayColor,
      stroke: 'black',
      strokeWidth: 1,
    };

    const distingRectStyles01 = {
      x: xLocation - additionalXLocationValue + 9,
      y: yLocation + 81,
      width: 15,
      height: 15,
      fill: distinguishingIndicator01,
      stroke: 'black',
      strokeWidth: 1,
    };

    const distingRectStyles05 = {
      x: xLocation - additionalXLocationValue + 9,
      y: yLocation + 51,
      width: 15,
      height: 15,
      fill: distinguishingIndicator05,
      stroke: 'black',
      strokeWidth: 1,
    };

    const consensusStatementStyle = {
      x: xLocation - additionalXLocationValue + 30,
      y: yLocation + 14 + consensusYLocation,
      fontSize: 16,
      fontFamily: 'Arial, sans-serif',
    };

    if (showDistinguishingAs === 'symbol') {
      return (
        <g>
          <text {...titleStyles}>{t('Legend')}</text>
          {willIndicateDistinguishing && (
            <g>
              <text {...astrick05Style}>{symbol05}</text>
              <text {...sigSymbolTextStyle1}>
                {t('Distinguishing statement at')} P{'\u003C'} 0.05
              </text>
              <text {...astrick01Style}>{symbol01}</text>
              <text {...sigSymbolTextStyle2}>
                {t('Distinguishing statement at')} P{'\u003C'} 0.01
              </text>
            </g>
          )}
          {willDisplayDistingCompareSymbols && (
            <g>
              <text {...arrowRightStyle6}>{arrowRight}</text>
              <text {...zScoreTextHigherStyle3}>
                {t('zScore for the statement is higher than in all other factors')}
              </text>
              <text {...arrowLeftStyle4}>{arrowLeft}</text>
              <text {...zScoreTextLowerStyle5}>
                {t('zScore for the statement is lower than in all other factors')}
              </text>
            </g>
          )}
          {shouldDisplayConsensus && <rect {...consensusRectStyles} />}
          {shouldDisplayConsensus && (
            <text {...consensusStatementStyle}>{t('Consensus Statements')}</text>
          )}
        </g>
      );
    }
    return (
      <g>
        <text {...titleStyles}>Legend </text>
        {willIndicateDistinguishing && (
          <g>
            <rect {...distingRectStyles05} />
            <text {...sigSymbolTextStyle1}>
              {t('Distinguishing statement at')} P{'\u003C'} 0.05
            </text>
            <rect {...distingRectStyles01} />
            <text {...sigSymbolTextStyle2}>
              {t('Distinguishing statement at')} P{'\u003C'} 0.01
            </text>
          </g>
        )}
        {willDisplayDistingCompareSymbols && (
          <g>
            <text {...arrowRightStyle6}>{arrowRight}</text>
            <text {...zScoreTextHigherStyle3}>
              {t('zScore for the statement is higher than in all other factors')}
            </text>
            <text {...arrowLeftStyle4}>{arrowLeft}</text>
            <text {...zScoreTextLowerStyle5}>
              {t('zScore for the statement is lower than in all other factors')}
            </text>
          </g>
        )}
        {shouldDisplayConsensus && <rect {...consensusRectStyles} />}
        {shouldDisplayConsensus && (
          <text {...consensusStatementStyle}>{t('Consensus Statements')}</text>
        )}
      </g>
    );
  };

  return <g>{renderLegendRectangleText(props)}</g>;
};

export default LegendText;
