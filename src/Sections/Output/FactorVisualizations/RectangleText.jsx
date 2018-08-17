import React from "react";
import store from "../../store";

const styles = {
    stroke: "black",
    zindex: 99,
    fontFamily: "Verdana, sans-serif"
};

const widthValue = props => {
    let shouldAdjustWidth = props.factorVizOptions.willAdjustCardWidth;
    if (shouldAdjustWidth === true) {
        let cardWidth = props.factorVizOptions.willAdjustCardWidthBy;
        return cardWidth;
    }
    return 110;
};

const headerHeight = () => {
    return 20;
};

const heightValue = props => {
    let shouldAdjustHeight = props.factorVizOptions.willAdjustCardHeight;
    if (shouldAdjustHeight === true) {
        let cardHeight = props.factorVizOptions.willAdjustCardHeightBy;
        return cardHeight;
    }
    return 110;
};

const titleHeight = store.getState("titleHeight");

const wordwrap = (text, max) => {
    let lines = [];
    let line;
    let counter = 0;
    let maxIterations = 15;
    // special adjustments for asian text because no spaces between words
    if (store.getState("willAdjustWidthAsian") === true) {
        max = store.getState("willAdjustWidthAsianBy");
        lines = text.match(new RegExp(".{1," + max + "}", "g"));
    } else {
        let regex = new RegExp(".{0," + max + "}(?:\\s|$)", "g");
        do {
            line = regex.exec(text);
            lines.push(...line);
            counter = counter + 1;
        } while (line[0].length !== 0 && counter !== maxIterations);
    }
    let lines2 = lines.filter(String);

    if (store.getState("willTrimStatement") === true) {
        let maxNumberLines = store.getState("willTrimStatementBy") || 5;
        lines2.length = maxNumberLines;
    }
    return lines2;
};

function statementList(texts, xCoord) {
    // default value
    let dyValue = "1.4em";
    // user set custom value for line spacing
    let shouldUseCustomDyValue = store.getState("willAdjustLineSpacing");
    if (shouldUseCustomDyValue === true) {
        let dyValueNum = store.getState("willAdjustLineSpacingBy");
        dyValue = dyValueNum + "em";
    }
    // map out locations for multi-line text
    const textItems = texts.map((text, index) => (
        <tspan key={ text + index } dy={ dyValue } x={ xCoord } textAnchor={ "middle" }>
          { text }
        </tspan>
    ));
    return textItems;
}

const renderRectangleText = props => {
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
        let willDisplayOnlyStateNums = props.factorVizOptions.willDisplayOnlyStateNums;
        if (willDisplayOnlyStateNums === true) {
            texts = wordwrap(props.data[index].statement, maxLineLength);
        } else {
            texts = wordwrap(props.data[index].sortStatement, maxLineLength);
        }

        let xCoord = props.positionData.xPosLoop[index] * widthValue(props) +
            widthValue(props) / 2;
        // set up statement object
        const textProps = {
            x: props.positionData.xPosLoop[index] * widthValue(props) +
                widthValue(props) / 2, // (index * widthValue()) + (widthValue() / 2),
            y: props.positionData.yPosLoop[index] * heightValue(props) +
                headerHeight() +
                15 +
                titleHeight,
            key: props.positionData.numRectsArray[index],
            text: statementList(texts, xCoord),
            textAnchor: "left",
            fontSize: fontSize
        };
        return (
            <text {...styles} {...textProps}>
              { textProps.text }
            </text>
            );
    };
};

export default props => {
    return <g>
             { props.data.map(renderRectangleText(props)) }
           </g>;
};
