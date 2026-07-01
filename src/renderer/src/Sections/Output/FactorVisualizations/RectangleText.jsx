import vizState from '../../GlobalState/vizState';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_WIDTH = 110;
const DEFAULT_HEIGHT = 110;
const DEFAULT_TOP_MARGIN = 15;
const DEFAULT_FONT_SIZE = 13;
const DEFAULT_MAX_LINE_LENGTH = 15;
const DEFAULT_DY_VALUE = '1.4em';
const DEFAULT_MAX_LINES = 5;
const MAX_WORDWRAP_ITERATIONS = 15;

const styles = {
  stroke: 'none',
  zindex: 99,
  fontFamily: 'Arial, sans-serif',
  fill: 'black',
};

const widthValue = (factorVizOptions = {}) => {
  const { willAdjustCardWidth, willAdjustCardWidthBy } = factorVizOptions;
  return willAdjustCardWidth === true ? willAdjustCardWidthBy : DEFAULT_WIDTH;
};

const heightValue = (factorVizOptions = {}) => {
  const { willAdjustCardHeight, willAdjustCardHeightBy } = factorVizOptions;
  if (willAdjustCardHeight === true) {
    const cardHeight =
      isNaN(willAdjustCardHeightBy) || willAdjustCardHeightBy < 60 ? 60 : willAdjustCardHeightBy;
    return cardHeight;
  }
  return DEFAULT_HEIGHT;
};

const topMarginValue = (factorVizOptions = {}) => {
  const { willAdjustTopMargin, willAdjustTopMarginBy } = factorVizOptions;
  return willAdjustTopMargin === true ? +willAdjustTopMarginBy : DEFAULT_TOP_MARGIN;
};

const wordwrap = (text, max, factorVizOptions = {}) => {
  if (!text) return [];

  let lines = [];
  let line;
  let counter = 0;

  if (factorVizOptions.willAdjustWidthAsian === true) {
    const newMax = factorVizOptions.willAdjustWidthAsianBy;
    lines = text.match(new RegExp(`.{1,${newMax}}`, 'g')) ?? [];
  } else {
    const regex = new RegExp(`.{0,${max}}(?:\\s|$)`, 'g');
    do {
      line = regex.exec(text);
      lines.push(...line);
      counter += 1;
    } while (line[0].length !== 0 && counter !== MAX_WORDWRAP_ITERATIONS);
  }

  const lines2 = lines.filter(Boolean);

  if (factorVizOptions.willTrimStatement === true) {
    const maxNumberLines = factorVizOptions.willTrimStatementBy || DEFAULT_MAX_LINES;
    lines2.length = maxNumberLines;
  }

  return lines2;
};

function statementList(texts, xCoord, factorVizOptions = {}) {
  const { willAdjustLineSpacing, willAdjustLineSpacingBy } = factorVizOptions;
  const dyValue =
    willAdjustLineSpacing === true ? `${willAdjustLineSpacingBy}em` : DEFAULT_DY_VALUE;

  let mapcounter = 1;
  return texts.map((text) => (
    <tspan key={mapcounter++} dy={dyValue} x={xCoord} textAnchor="middle">
      {text}
    </tspan>
  ));
}

const renderRectangleText = (props) => {
  const { data = [], factorVizOptions = {}, positionData = {} } = props;

  if (!data.length) return null;

  const titleHeight = vizState((state) => state.titleHeight);

  const fontSize =
    factorVizOptions.willAdjustCardFontSize === true
      ? factorVizOptions.willAdjustCardFontSizeBy
      : DEFAULT_FONT_SIZE;

  const width = widthValue(factorVizOptions);
  const height = heightValue(factorVizOptions);
  const topMargin = topMarginValue(factorVizOptions);
  const { xPosLoop = [], yPosLoop = [] } = positionData;

  return (coords, index) => {
    const entry = data[index] ?? {};

    const maxLineLength =
      factorVizOptions.willAdjustStatementWidth === true
        ? factorVizOptions.willAdjustStatementWidthBy
        : DEFAULT_MAX_LINE_LENGTH;

    const { willDisplayOnlyStateNums, willPrependStateNums } = factorVizOptions;

    let rawText;
    if (willDisplayOnlyStateNums === true) {
      rawText = entry.statement;
    } else if (willPrependStateNums === true) {
      rawText = entry.sortStatementAndNums;
    } else {
      rawText = entry.sortStatement;
    }

    const texts = wordwrap(rawText ?? '', maxLineLength, factorVizOptions);
    const xCoord = (xPosLoop[index] ?? 0) * width + width / 2;

    const textProps = {
      x: xCoord,
      y: (yPosLoop[index] ?? 0) * height + 20 + topMargin + titleHeight,
      textAnchor: 'left',
      fontSize,
    };

    return (
      <text {...styles} {...textProps} key={uuidv4()}>
        {statementList(texts, xCoord, factorVizOptions)}
      </text>
    );
  };
};

export default function RectangleText(props) {
  const { data = [], factorVizOptions, positionData } = props;

  if (!data.length) return <g />;

  const renderer = renderRectangleText({ data, factorVizOptions, positionData });
  if (!renderer) return <g />;

  return <g>{data.map(renderer)}</g>;
}
