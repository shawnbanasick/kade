import { useEffect, useRef } from 'react';

import * as d3 from 'd3';

import outputState from '../../GlobalState/outputState';
import coreState from '../../GlobalState/coreState';

import Line from './DataLine';
import XYAxis from './XyAxis';
import DataCircles from './DataCircles';
import AxisTextLabels from './AxisTextLabels';
import ParallelRefLine from './ParallelRefLine';
import serializeSVG from '../../../Utils/serializeSVG';
import svgStringToPngBytes from '../../../Utils/svgStringToPngBytes';
// import buildScreeDrawio from '../../../Utils/buildScreeDrawio';
import buildScreeDrawio from '../FactorScreePlot/downloadScreeDrawIo';
import currentDate1 from '../../../Utils/currentDate1';
import currentTime1 from '../../../Utils/currentTime1';

const dateTime = () => {
  const date = currentDate1();
  const time = currentTime1();
  return `${date}_${time}`;
};

const styles = {
  container: {
    textAlign: 'center',
    width: '100%',
    height: '82%',
    display: 'flex',
    alignItems: 'left',
  },
  svg: {
    position: 'relative',
  },
  XYAxis: {
    marginBottom: 40,
  },
};

// Returns the largest X coordinate from the data set
const xMax = (props) => {
  let maxValue = props.numFacs;
  if (maxValue < 3) {
    maxValue = 3;
  } else if (maxValue > 8) {
    maxValue = 8;
  }
  return maxValue;
};

// Returns the higest Y coordinate from the data set
const yMax = (data) => {
  const maxValue2 = Math.ceil(d3.max(data, (d) => d[1]));
  const maxValue = maxValue2;
  return maxValue;
};

// Returns a function that "scales" X coordinates from the data to fit the chart
const xScale = (props) =>
  d3
    .scaleLinear()
    .domain([0, xMax(props)])
    .range([props.padding, props.width - props.padding * 2]);

// Returns a function that "scales" Y coordinates from the data to fit the chart
const yScale = (props) =>
  d3
    .scaleLinear()
    .domain([0, yMax(props.data)])
    .range([props.height - props.padding, props.padding]);

const ScreePlot = (props) => {
  const { showMeans = false, showP95 = false, means, p95, padding } = props;
  const updateSerializedSVGScree1 = outputState((s) => s.updateSerializedSVGScree1);
  const updateSerializedPNGScree1 = outputState((s) => s.updateSerializedPNGScree1);
  const updateSerializedDrawioScree1 = outputState((s) => s.updateSerializedDrawioScree1);
  const projectName = coreState((state) => state.projectName) ?? 'myProject';

  const yMax_ = yMax(props.data);
  const yTickValues = Array.from({ length: yMax_ + 1 }, (_, i) => i);

  const scales = {
    xScale: xScale(props),
    yScale: yScale(props),
  };

  // Integer ticks 0..xMax, matching the visible axis domain
  const xTicks = Array.from({ length: scales.xScale.domain()[1] + 1 }, (_, i) => i);

  const svgW = props.width + 20; // same as the <svg width>
  const svgH = props.height;

  const svgRef = useRef(null);

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    let cancelled = false;

    const run = async () => {
      try {
        const svg = await serializeSVG(svgEl);
        const png = await svgStringToPngBytes(svg, svgW, svgH); // base64 version if you switched
        const drawio = await buildScreeDrawio({
          data: props.data,
          means: props.means,
          p95: props.p95,
          showMeans: true,
          showP95: true,
          numFacs: props.numFacs,
        });

        const drawio2 = await buildScreeDrawio({
          data: props.data,
          means: props.means,
          p95: props.p95,
          showMeans: false,
          showP95: false,
          numFacs: props.numFacs,
        });

        const screePlotDrawioArray = [
          {
            drawio: drawio2,
            name: `KADE_Results_${projectName}_${dateTime()}_Scree.drawio`,
          },
          {
            drawio: drawio,
            name: `KADE_Results_${projectName}_${dateTime()}_Scree_with_PA.drawio`,
          },
        ];

        if (cancelled) return;
        updateSerializedSVGScree1(svg);
        updateSerializedPNGScree1(png);
        updateSerializedDrawioScree1(screePlotDrawioArray);
      } catch (err) {
        console.error('scree export serialization failed:', err);
      }
    };
    run();

    return () => {
      cancelled = true;
    };
  }, [
    props.data,
    props.width,
    props.height,
    props.numFacs,
    padding,
    means,
    p95,
    showMeans,
    showP95,
  ]);

  const refLineProps = { ...scales, width: props.width, padding };

  return (
    <div style={styles.container} className="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="screePlot"
        ref={svgRef}
        style={styles.svg}
        width={props.width + 20}
        height={props.height}
      >
        <XYAxis {...props} {...scales} yTickValues={yTickValues} {...styles.XYAxis} />
        <AxisTextLabels />
        <Line {...props} {...scales} />
        <DataCircles {...props} {...scales} />
        <ParallelRefLine
          {...refLineProps}
          data={means}
          label="PA Mean"
          show={showMeans}
          variant="means"
        />
        <ParallelRefLine
          {...refLineProps}
          data={p95}
          label="PA 95th Percentile"
          show={showP95}
          variant="p95"
        />
      </svg>
    </div>
  );
};

export default ScreePlot;
