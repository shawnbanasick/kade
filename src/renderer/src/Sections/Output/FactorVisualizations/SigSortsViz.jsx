import { v4 as uuidv4 } from 'uuid';

const DEFAULT_WIDTH = 110;
const DEFAULT_HEIGHT = 110;
const HEADER_HEIGHT = 26;

const widthValue = (factorVizOptions = {}) => {
  const { willAdjustCardWidth, willAdjustCardWidthBy } = factorVizOptions;
  return willAdjustCardWidth === true ? willAdjustCardWidthBy : DEFAULT_WIDTH;
};

const heightValue = (factorVizOptions = {}) => {
  const { willAdjustCardHeight, willAdjustCardHeightBy } = factorVizOptions;
  if (willAdjustCardHeight === true) {
    return Math.max(willAdjustCardHeightBy, 60);
  }
  return DEFAULT_HEIGHT;
};

const styles = {
  stroke: 'none',
  zindex: 9999,
  fill: 'black',
};

const renderSigSortsIndicators = (props) => {
  const { data = [], factorVizOptions = {}, positionData = {} } = props;

  if (!data.length) return null;

  const {
    willDisplayDistingCompareSymbols,
    willAdjustDistIndicatorSizeBy: willAdjustIndicatorSizeBy = 0,
  } = factorVizOptions;

  const { xPosLoop = [], yPosLoop = [], numRectsArray = [] } = positionData;

  const width = widthValue(factorVizOptions);
  const height = heightValue(factorVizOptions);

  return (coords, index) => {
    const entry = data[index] ?? {};
    let text;
    let symbol;
    let arrow;

    // Always using unicode (matches original hardcoded `shouldUseUnicode = true`)
    if (willDisplayDistingCompareSymbols) {
      symbol = entry.sigVisualizationUni;
      arrow = entry.directionSymbolUni;
      text = `${symbol}${arrow}`;
    } else {
      text = entry.sigVisualizationUni;
    }

    const xBase = (xPosLoop[index] ?? 0) * width;
    const yBase =
      (yPosLoop[index] ?? 0) * height + HEADER_HEIGHT + 22 + 1.7 * willAdjustIndicatorSizeBy;

    const sigSymbolProps = {
      x: xBase + 20,
      y: yBase,
      key: numRectsArray[index + 1],
      textAnchor: 'left',
      fontSize: willAdjustIndicatorSizeBy + 10,
    };

    const sigSymbolProps2 = {
      x: xBase + 10,
      y: yBase,
      textAnchor: 'left',
      fontSize: willAdjustIndicatorSizeBy,
    };

    return (
      <text {...styles} {...sigSymbolProps} {...sigSymbolProps2} key={uuidv4()}>
        {symbol} {arrow}
      </text>
    );
  };
};

export default function SigSortsIndicators(props) {
  const { data = [], factorVizOptions, positionData } = props;

  if (!data.length) return <g />;

  const renderer = renderSigSortsIndicators({ data, factorVizOptions, positionData });
  if (!renderer) return <g />;

  return <g>{data.map(renderer)}</g>;
}
