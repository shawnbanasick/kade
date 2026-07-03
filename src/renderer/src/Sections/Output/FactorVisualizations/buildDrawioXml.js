const buildDrawioXml = (
  data,
  positionData,
  factorVizOptions,
  titleHeight = 0,
  showSymbols = false
) => {
  const {
    willAdjustCardWidth,
    willAdjustCardWidthBy,
    willAdjustCardHeight,
    willAdjustCardHeightBy,
    willAdjustCardFontSize,
    willAdjustCardFontSizeBy,
    willAdjustDistIndicatorSizeBy = 0,
    willDisplayConsensusStates,
    willIndicateDistinguishing,
    showDistinguishingAs,
    consensusIndicator,
    distinguishingIndicator01,
    distinguishingIndicator05,
    willDisplayOnlyStateNums,
    willPrependStateNums,
    willDisplayDistingCompareSymbols,
  } = factorVizOptions;

  if (willDisplayDistingCompareSymbols) {
    showSymbols = true;
  }

  const cardWidth = willAdjustCardWidth ? +willAdjustCardWidthBy : 110;
  const cardHeight = willAdjustCardHeight
    ? isNaN(willAdjustCardHeightBy) || willAdjustCardHeightBy < 60
      ? 60
      : +willAdjustCardHeightBy
    : 110;
  const fontSize = willAdjustCardFontSize ? +willAdjustCardFontSizeBy : 13;
  const HEADER_H = 26;

  const { xPosLoop = [], yPosLoop = [], uniques = [], instances = [] } = positionData;

  let cellId = 2;
  const cells = [];

  const esc = (str) =>
    String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  // ── 1. COLUMN HEADER RECTANGLES + LABELS ──────────────────────────────────
  uniques.forEach((label, index) => {
    const x = index * cardWidth;
    const y = titleHeight;

    cells.push(`
        <mxCell id="${cellId++}" value="" style="shape=mxgraph.basic.rect;fillColor=#ffffff;strokeColor=#000000;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="${x}" y="${y}" width="${cardWidth}" height="${HEADER_H}" as="geometry" />
        </mxCell>`);

    cells.push(`
        <mxCell id="${cellId++}" value="${esc(label)}" style="text;html=0;align=center;verticalAlign=middle;fontStyle=1;fontSize=14;fontFamily=Arial;fontColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${x}" y="${y}" width="${cardWidth}" height="${HEADER_H}" as="geometry" />
        </mxCell>`);
  });

  // ── 2. CARD RECTANGLES + LABELS + SIGNIFICANCE SYMBOLS ────────────────────
  data.forEach((entry, index) => {
    let fillColor = '#ffffff';
    if (willIndicateDistinguishing && showDistinguishingAs === 'distinguishingColor') {
      if (entry.isDistinguishing01) fillColor = distinguishingIndicator01 ?? fillColor;
      if (entry.isDistinguishing05) fillColor = distinguishingIndicator05 ?? fillColor;
    }
    if (willDisplayConsensusStates) {
      if (entry.isConsensus01State || entry.isConsensus05State) {
        fillColor = consensusIndicator ?? fillColor;
      }
    }

    let rawText;
    if (willDisplayOnlyStateNums) rawText = entry.statement;
    else if (willPrependStateNums) rawText = entry.sortStatementAndNums;
    else rawText = entry.sortStatement;

    const x = (xPosLoop[index] ?? 0) * cardWidth;
    const y = (yPosLoop[index] ?? 0) * cardHeight + HEADER_H + titleHeight;

    const cardStyle = [
      'shape=mxgraph.basic.rect',
      'whiteSpace=wrap',
      'html=0',
      `fillColor=${fillColor}`,
      'strokeColor=#000000',
      'strokeWidth=0.5',
      `fontSize=${fontSize}`,
      'fontFamily=Arial',
      'fontColor=#000000',
      'verticalAlign=top',
      'align=center',
      'spacingTop=20',
    ].join(';');

    cells.push(`
        <mxCell id="${cellId++}" value="${esc(rawText)}" style="${cardStyle}" vertex="1" parent="1">
          <mxGeometry x="${x}" y="${y}" width="${cardWidth}" height="${cardHeight}" as="geometry" />
        </mxCell>`);

    // significance symbols — mirrors SigSortsIndicators
    if (willIndicateDistinguishing && showDistinguishingAs !== 'distinguishingColor') {
      const symbol = entry.sigVisualizationUni ?? '';
      const arrow = willDisplayDistingCompareSymbols ? (entry.directionSymbolUni ?? '') : '';
      const sigText = `${symbol}${arrow ? ' ' + arrow : ''}`.trim();

      if (sigText) {
        const sigFontSize = Math.max(+willAdjustDistIndicatorSizeBy + 6, 9);
        const sigX = x + 4;
        const sigY = y + 2; // just inside the top edge of the card

        cells.push(`
        <mxCell id="${cellId++}" value="${esc(sigText)}" style="text;html=0;align=left;verticalAlign=top;fontSize=${sigFontSize - 3};fontFamily=Arial;fontColor=#000000;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="${sigX}" y="${sigY}" width="${cardWidth - 8}" height="16" as="geometry" />
        </mxCell>`);
      }
    }
  });

  // ── 3. LEGEND ──────────────────────────────────────────────────────────────
  // Mirrors LegendRectangle.getHeight(), LegendText, and LegendRectangle positioning

  // legend box height — mirrors LegendRectangle.getHeight()
  let legendBoxHeight = 32;
  if (willIndicateDistinguishing) legendBoxHeight += 100;
  if (showSymbols) legendBoxHeight += 50;
  if (willDisplayConsensusStates) legendBoxHeight += 35;
  if (!willIndicateDistinguishing && willDisplayConsensusStates) legendBoxHeight += 40;

  // legend X — mirrors LegendRectangle.getXCoords()
  const totalWidth = instances.length * cardWidth;
  const legendX = totalWidth / 2 - 278;

  // legend Y — mirrors LegendRectangle.yValue() / LegendText.getYValue()
  const maxColumnHeight = Math.max(...yPosLoop, 0) + 1;
  const legendY = maxColumnHeight * cardHeight + 100;

  // inner content offset — matches LegendText which uses yLocation = legendY + 5
  const yLoc = legendY + 5;
  const xLoc = totalWidth / 2; // LegendText xLocation (center of grid)
  let additionalX = 230; // LegendText additionalXLocationValue

  const symbol05 = '\uFF0A';
  const symbol01 = '\uFF0A\uFF0A';
  const arrowLeft = '\u25C4 ';
  const arrowRight = '\u25BA ';

  // legend border rect (mirrors LegendRectangle, width=560)
  cells.push(`
        <mxCell id="${cellId++}" value="" style="shape=mxgraph.basic.rect;fillColor=#ffffff;strokeColor=#000000;strokeWidth=0.5;" vertex="1" parent="1">
          <mxGeometry x="${legendX}" y="${legendY}" width="560" height="${legendBoxHeight}" as="geometry" />
        </mxCell>`);

  // "Legend" title (mirrors titleStyles: fontSize=26, textAnchor=middle, y=yLoc+30)
  cells.push(`
        <mxCell id="${cellId++}" value="Legend" style="text;html=0;align=center;verticalAlign=middle;fontSize=26;fontFamily=Arial;fontColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${legendX}" y="${yLoc + 8}" width="560" height="32" as="geometry" />
        </mxCell>`);

  if (willIndicateDistinguishing) {
    if (showDistinguishingAs === 'symbol') {
      // symbol05 asterisk (astrick05Style: x=xLoc-additionalX+12, y=yLoc+65)
      cells.push(`
        <mxCell id="${cellId++}" value="${esc(symbol05)}" style="text;html=0;align=left;verticalAlign=top;fontSize=14;fontFamily=Arial;fontColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${xLoc - additionalX + 12}" y="${yLoc + 53}" width="30" height="20" as="geometry" />
        </mxCell>`);

      cells.push(`
        <mxCell id="${cellId++}" value="Distinguishing statement at P&lt; 0.05" style="text;html=0;align=left;verticalAlign=top;fontSize=16;fontFamily=Arial;fontColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${xLoc - additionalX + 50}" y="${yLoc + 53}" width="260" height="20" as="geometry" />
        </mxCell>`);

      // symbol01 (astrick01Style: y=yLoc+95)
      cells.push(`
        <mxCell id="${cellId++}" value="${esc(symbol01)}" style="text;html=0;align=left;verticalAlign=top;fontSize=14;fontFamily=Arial;fontColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${xLoc - additionalX + 12}" y="${yLoc + 83}" width="30" height="20" as="geometry" />
        </mxCell>`);

      cells.push(`
        <mxCell id="${cellId++}" value="Distinguishing statement at P&lt; 0.01" style="text;html=0;align=left;verticalAlign=top;fontSize=16;fontFamily=Arial;fontColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${xLoc - additionalX + 50}" y="${yLoc + 83}" width="260" height="20" as="geometry" />
        </mxCell>`);
    } else {
      // color swatches (distingRectStyles05: y=yLoc+51, distingRectStyles01: y=yLoc+81)
      cells.push(`
        <mxCell id="${cellId++}" value="" style="shape=mxgraph.basic.rect;fillColor=${distinguishingIndicator05 ?? '#ffffff'};strokeColor=#000000;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="${xLoc - additionalX + 9}" y="${yLoc + 61}" width="15" height="15" as="geometry" />
        </mxCell>`);

      cells.push(`
        <mxCell id="${cellId++}" value="Distinguishing statement at P&lt; 0.05" style="text;html=0;align=left;verticalAlign=top;fontSize=16;fontFamily=Arial;fontColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${xLoc - additionalX + 50}" y="${yLoc + 53}" width="260" height="20" as="geometry" />
        </mxCell>`);

      cells.push(`
        <mxCell id="${cellId++}" value="" style="shape=mxgraph.basic.rect;fillColor=${distinguishingIndicator01 ?? '#ffffff'};strokeColor=#000000;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="${xLoc - additionalX + 9}" y="${yLoc + 91}" width="15" height="15" as="geometry" />
        </mxCell>`);

      cells.push(`
        <mxCell id="${cellId++}" value="Distinguishing statement at P&lt; 0.01" style="text;html=0;align=left;verticalAlign=top;fontSize=16;fontFamily=Arial;fontColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${xLoc - additionalX + 50}" y="${yLoc + 83}" width="260" height="20" as="geometry" />
        </mxCell>`);
    }
  }

  // z-score direction symbols (showSymbols prop — mirrors props.showSymbols in LegendText)
  if (showDistinguishingAs === 'symbol') {
    // consensusYLocation shifts depending on flags — mirrors LegendText logic
    let consensusYLocation = 170;
    if (!willIndicateDistinguishing) consensusYLocation -= 55;
    if (!showSymbols) consensusYLocation -= 60; // won't apply here but kept for parity

    // arrowRight / higher (arrowRightStyle6: y=yLoc+125)
    cells.push(`
        <mxCell id="${cellId++}" value="${esc(arrowRight)}" style="text;html=0;align=left;verticalAlign=top;fontSize=16;fontFamily=Arial;fontColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${xLoc - additionalX + 13}" y="${yLoc + 113}" width="30" height="20" as="geometry" />
        </mxCell>`);

    cells.push(`
        <mxCell id="${cellId++}" value="zScore for the statement is higher than in all other factors" style="text;html=0;align=left;verticalAlign=top;fontSize=16;fontFamily=Arial;fontColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${xLoc - additionalX + 50}" y="${yLoc + 113}" width="420" height="20" as="geometry" />
        </mxCell>`);

    // arrowLeft / lower (arrowLeftStyle4: y=yLoc+155)
    cells.push(`
        <mxCell id="${cellId++}" value="${esc(arrowLeft)}" style="text;html=0;align=left;verticalAlign=top;fontSize=16;fontFamily=Arial;fontColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${xLoc - additionalX + 13}" y="${yLoc + 143}" width="30" height="20" as="geometry" />
        </mxCell>`);

    cells.push(`
        <mxCell id="${cellId++}" value="zScore for the statement is lower than in all other factors" style="text;html=0;align=left;verticalAlign=top;fontSize=16;fontFamily=Arial;fontColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${xLoc - additionalX + 50}" y="${yLoc + 143}" width="420" height="20" as="geometry" />
        </mxCell>`);
  }

  // consensus rect + label (consensusRectStyles uses dynamic consensusYLocation)
  if (willDisplayConsensusStates) {
    let consensusYLocation = 170;
    if (!willIndicateDistinguishing) consensusYLocation -= 55;
    if (showDistinguishingAs !== 'symbol') {
      additionalX += 7; // shift left for color swatches
      consensusYLocation -= 60;
    }

    cells.push(`
        <mxCell id="${cellId++}" value="" style="shape=mxgraph.basic.rect;fillColor=${consensusIndicator ?? '#ffffff'};strokeColor=#000000;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="${xLoc - additionalX + 16}" y="${yLoc + consensusYLocation + 10}" width="15" height="15" as="geometry" />
        </mxCell>`);

    cells.push(`
        <mxCell id="${cellId++}" value="Consensus Statements" style="text;html=0;align=left;verticalAlign=top;fontSize=16;fontFamily=Arial;fontColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${xLoc - additionalX + 50}" y="${yLoc + consensusYLocation + 2}" width="260" height="20" as="geometry" />
        </mxCell>`);
  }

  // ── canvas bounds ──────────────────────────────────────────────────────────
  const maxX = Math.max(...xPosLoop) * cardWidth + cardWidth + 40;
  const maxY = legendY + legendBoxHeight + 40;

  return `<mxfile host="app.diagrams.net" type="embed" version="26.0.0">
  <diagram id="diagram-1" name="Page-1">
    <mxGraphModel dx="1422" dy="762" grid="1" gridSize="10" guides="1"
      tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1"
      pageWidth="${Math.max(maxX, 850)}" pageHeight="${Math.max(maxY, 1100)}"
      math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        ${cells.join('')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
};

export default buildDrawioXml;
