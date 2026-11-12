import { useEffect, useRef } from 'react';

import * as d3 from 'd3';

import outputState from '../../GlobalState/outputState';

import Line from './DataLine';
import XYAxis from './XyAxis';
import DataCircles from './DataCircles';
import AxisTextLabels from './AxisTextLabels';
import ParallelRefLine from './ParallelRefLine';
import serializeSVG from '../../../Utils/serializeSVG';
import svgStringToPngBytes from '../../../Utils/svgStringToPngBytes';

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
  const { showMeans = false, showP95 = false, means, p95 } = props;
  const updateSerializedSVGScree1 = outputState((state) => state.updateSerializedSVGScree1);
  const updateSerializedPNGScree1 = outputState((state) => state.updateSerializedPNGScree1);

  const yMax_ = yMax(props.data);
  // Generate an array of every integer from 0 to yMax
  const yTickValues = Array.from({ length: yMax_ + 1 }, (_, i) => i);

  const svgRef = useRef(null);

  useEffect(() => {
    console.log('1. effect fired', { data: props.data, w: props.width, h: props.height });

    // const svgEl = document.getElementById('screePlot');
    const svgEl = svgRef.current;

    console.log('2. svgEl:', svgEl);
    if (!svgEl) {
      console.warn('svgEl not found, bailing out');
      return;
    }

    const run = async () => {
      try {
        const { width, height } = svgEl.getBoundingClientRect();
        console.log('3. size:', width, height);

        const svg = await serializeSVG(svgEl);
        console.log('4. serialized SVG length:', svg?.length, typeof svg);

        const pngBytes = await svgStringToPngBytes(svg, width, height);
        console.log('5. png bytes:', pngBytes?.length ?? pngBytes);

        updateSerializedSVGScree1(svg);
        updateSerializedPNGScree1(pngBytes);
        console.log('6. outputState updated');
      } catch (err) {
        console.error('failed:', err);
      }
    };
    run();
  }, [props.data, props.width, props.height]);

  // useEffect(() => {
  //   const svgEl = svgRef.current;
  //   if (!svgEl) return;

  //   let cancelled = false;

  //   const run = async () => {
  //     try {
  //       console.log('Serializing SVG and converting to PNG...');
  //       const { width, height } = svgEl.getBoundingClientRect();
  //       const svg = await serializeSVG(svgEl);
  //       const pngBytes = await svgStringToPngBytes(svg, width, height);
  //       if (cancelled) return;
  //       outputState.updateSerializedSVGScree1(svg);
  //       outputState.updateSerializedPNGScree1(pngBytes);
  //     } catch (err) {
  //       console.error('SVG serialization failed:', err);
  //     }
  //   };

  //   run();
  //   return () => {
  //     cancelled = true;
  //   };
  // }, [props.data, props.width, props.height]);

  const scales = {
    xScale: xScale(props),
    yScale: yScale(props),
  };

  const refLineProps = { ...scales, width: props.width, padding: props.padding };

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
