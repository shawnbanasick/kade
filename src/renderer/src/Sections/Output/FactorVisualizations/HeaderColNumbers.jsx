import vizState from '../../GlobalState/vizState';

const styles = {
  fill: 'black',
  stroke: 'none',
  fontWeight: 'bold',

  // strokeWidth: 1,
  zindex: 99,
};

const widthValue = (props) => {
  const shouldAdjustWidth = props.factorVizOptions.willAdjustCardWidth;
  if (shouldAdjustWidth === true) {
    const cardWidth = props.factorVizOptions.willAdjustCardWidthBy;
    return cardWidth;
  }
  return 110;
};

// eslint-disable-next-line
const renderBaseRectangles = (props) => (coords, index) => {
  const titleHeight = vizState((state) => state.titleHeight);
  const textProps = {
    x: index * widthValue(props) + widthValue(props) / 2,
    y: 20 + titleHeight,
    // width: widthValue(),
    // height: heightValue(),
    key: props.positionData.uniques[index],
    text: props.positionData.uniques[index],
    textAnchor: 'middle',
  };

  return (
    <text fontFamily="arial" {...styles} {...textProps}>
      {textProps.text}
    </text>
  );
};

const BaseRectangles = (props) => (
  <g>{props.positionData.uniques.map(renderBaseRectangles(props))}</g>
);

export default BaseRectangles;
/*
  indexGroup
        .append('rect')
        .attr('width', elementWidth)
        .attr('height', '20')
        .attr('x', function(d) {
          return ((uniques.indexOf(d) * elementWidth) + 5);
        })
        .attr('y', '45')
        .attr('fill', 'white')
        .attr('stroke', 'black');

      // draw column numbers
      indexGroup
        .append('text')
        .attr('x', function(d) {
          return ((uniques.indexOf(d) * elementWidth) + (elementWidth / 2) + 5);
        })
        .attr('y', '58') // was 16
        .style('text-anchor', 'middle')
        .attr('class', 'headerText')
        .attr('font-family', 'Arial')
        .attr('font-size', '14px')
        .attr('font-weight', 'bold')
        .attr('fill', 'black')
        .text(function(d) {
          return d;
        });

        */
