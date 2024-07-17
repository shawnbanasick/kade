import vizState from '../../GlobalState/vizState';

const styles = {
  stroke: 'none',
  zindex: 99,
  fontFamily: 'Arial, sans-serif',
  fill: 'black',
};

const widthValue = (props) => {
  const shouldAdjustWidth = props.factorVizOptions.willAdjustCardWidth;
  if (shouldAdjustWidth === true) {
    const cardWidth = props.factorVizOptions.willAdjustCardWidthBy;
    return cardWidth;
  }
  return 110;
};

// const headerHeight = () => {return 20};

const heightValue = (props) => {
  const shouldAdjustHeight = props.factorVizOptions.willAdjustCardHeight;
  if (shouldAdjustHeight === true) {
    let cardHeight = props.factorVizOptions.willAdjustCardHeightBy;
    if (isNaN(cardHeight || cardHeight < 60)) {
      cardHeight = 60;
    }
    return cardHeight;
  }
  return 110;
};

const topMarginValue = (props) => {
  const willAdjustTopMargin = props.factorVizOptions.willAdjustTopMargin;
  if (willAdjustTopMargin === true) {
    const newMargin = +props.factorVizOptions.willAdjustTopMarginBy;
    return newMargin;
  }
  return 15;
};

const wordwrap = (text, max, factorVizOptions) => {
  let lines = [];
  let line;
  let counter = 0;
  const maxIterations = 15;
  // special adjustments for asian text because no spaces between words
  if (factorVizOptions.willAdjustWidthAsian === true) {
    const newMax = factorVizOptions.willAdjustWidthAsianBy;
    lines = text.match(new RegExp(`.{1,${newMax}}`, 'g'));
  } else {
    const regex = new RegExp(`.{0,${max}}(?:\\s|$)`, 'g');
    do {
      line = regex.exec(text);
      lines.push(...line);
      counter += 1;
    } while (line[0].length !== 0 && counter !== maxIterations);
  }
  const lines2 = lines.filter(String);

  if (factorVizOptions.willTrimStatement === true) {
    const maxNumberLines = factorVizOptions.willTrimStatementBy || 5;
    lines2.length = maxNumberLines;
  }
  return lines2;
};

function statementList(texts, xCoord, factorVizOptions) {
  // default value
  let dyValue = '1.4em';
  // user set custom value for line spacing
  const shouldUseCustomDyValue = factorVizOptions.willAdjustLineSpacing;
  if (shouldUseCustomDyValue === true) {
    const dyValueNum = factorVizOptions.willAdjustLineSpacingBy;
    dyValue = `${dyValueNum}em`;
  }
  // map out locations for multi-line text
  let mapcounter = 1;
  const textItems = texts.map((text) => (
    <tspan key={mapcounter++} dy={dyValue} x={xCoord} textAnchor={'middle'}>
      {text}
    </tspan>
  ));
  return textItems;
}

const renderRectangleText = (props) => {
  const titleHeight = vizState((state) => state.titleHeight);

  // set default size
  let fontSize = 13;
  // set custom fontSize by user selection
  if (props.factorVizOptions.willAdjustCardFontSize === true) {
    fontSize = props.factorVizOptions.willAdjustCardFontSizeBy;
  }

  // return a function that returns a props object
  return (coords, index) => {
    let texts;
    let maxLineLength = 15;
    // set custom line length
    if (props.factorVizOptions.willAdjustStatementWidth === true) {
      maxLineLength = props.factorVizOptions.willAdjustStatementWidthBy;
    }
    // check if sentences or statement numbers only
    const willDisplayOnlyStateNums = props.factorVizOptions.willDisplayOnlyStateNums;
    const willPrependStateNums = props.factorVizOptions.willPrependStateNums;

    if (willDisplayOnlyStateNums === true) {
      texts = wordwrap(props.data[index].statement, maxLineLength, props.factorVizOptions);
    } else if (willPrependStateNums === true) {
      texts = wordwrap(
        props.data[index].sortStatementAndNums,
        maxLineLength,
        props.factorVizOptions
      );
    } else {
      texts = wordwrap(props.data[index].sortStatement, maxLineLength, props.factorVizOptions);
    }

    const xCoord = props.positionData.xPosLoop[index] * widthValue(props) + widthValue(props) / 2;
    // set up statement object
    const textProps = {
      x: props.positionData.xPosLoop[index] * widthValue(props) + widthValue(props) / 2, // (index * widthValue()) + (widthValue() / 2),
      y:
        props.positionData.yPosLoop[index] * heightValue(props) +
        20 +
        topMarginValue(props) +
        titleHeight,
      key: props.positionData.numRectsArray[index],
      text: statementList(texts, xCoord, props.factorVizOptions),
      textAnchor: 'left',
      fontSize,
    };
    return (
      <text {...styles} {...textProps}>
        {textProps.text}
      </text>
    );
  };
};

export default (props) => <g>{props.data.map(renderRectangleText(props))}</g>;
