import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import rotationState from '../../../GlobalState/rotationState';
import useScatterPlotExport from './useScatterPlotExport';

import ScatterPlot, { LEFT_EXTRA } from './ScatterPlot';
import ParticipantPopUp from './ParticipantPopUp';
import ClockwiseButtons from './ClockwiseButtons';
import RotationTable from '../rotationTable/RotationTable';
import RotationButtons from '../FactorSelect/RotationButtons';
import SaveRotationButton from '../FactorSelect/SaveRotationButton';

function getWidthHeight() {
  let windowWidth = window.innerWidth - 603;
  const windowHeight = window.innerHeight - 345;

  if (windowWidth > windowHeight) {
    return windowHeight;
  }
  if (windowWidth > 1100) {
    windowWidth = 1100;
  }
  return windowWidth;
}

const scatterPlotStyles = {
  padding: 30,
  marginBottom: 10,
};

const ScatterPlotAndTableTransitionContainer = (props) => {
  const { t } = useTranslation();
  const showScatterPlotTableDiv = rotationState((state) => state.showScatterPlotTableDiv);
  const data = rotationState((state) => state.newRotationVectors);
  const colDefs = rotationState((state) => state.rotColDefsFactorTable);
  const rowData = rotationState((state) => state.rotRowDataFactorTable);
  const rotationDegrees = rotationState((state) => state.rotationDegrees);

  const svgRef = useRef(null);

  const [localStore, setLocalStore] = useState({
    width: getWidthHeight(),
    height: getWidthHeight(),
  });

  const { downloadSvg, downloadPng, downloadDrawio, saveToKade } = useScatterPlotExport(svgRef, {
    width: localStore.width,
    height: localStore.height,
    padding: scatterPlotStyles.padding,
  });

  useEffect(() => {
    const size = getWidthHeight();
    setLocalStore({ width: size, height: size });

    const handleResize = () => {
      const size = getWidthHeight();
      setLocalStore({ width: size, height: size });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const degreesText = `${rotationDegrees}\u00B0`;
  const leftContWidth = getWidthHeight();
  const maxTableHeight = window.innerHeight - 374;
  // const maxTableHeight = window.innerHeight / 2 - 120;

  if (showScatterPlotTableDiv) {
    return (
      <React.Fragment>
        <div
          className="flex flex-wrap items-end w-full h-10 flex-row mb-3"
          id="RotPlotFactorsSelectDiv"
        >
          {/* <div className="flex h-[30px] w-[85px] text-[clamp(0.80rem,1.2cqw,2rem)] justify-baseline items-center"> */}
          <div className="flex h-7 w-21.25 text-[22px] justify-baseline items-center">
            {t('Rotate')}:
          </div>
          <RotationButtons />
          <ClockwiseButtons baselineData={props.baselineData} />
          <div className="text-center h-12.5 text-[36px] leading-16 w-30">
            <p>{degreesText}</p>
          </div>
          <SaveRotationButton />
        </div>
        <div id="scatterPlotDiv" className="flex flex-row w-full h-[80%] gap-8 flex-wrap mt-1.25">
          <div style={{ width: leftContWidth + LEFT_EXTRA }} className="flex flex-col h-[75%]">
            <div className="flex flex-row flex-wrap gap-2 ml-auto mr-4 items-end">
              <ParticipantPopUp />
              <button
                onClick={downloadPng}
                className="flex items-center px-4 py-2 h-8 bg-grey-button text-black rounded-md hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent] transition-colors"
              >
                <div className="flex flex-row items-center h-7.5 gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  {t('PNG')}
                </div>
              </button>
              <button
                onClick={downloadSvg}
                className="flex items-center px-4 py-2 h-8 bg-grey-button text-black rounded-md hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent] transition-colors"
              >
                <div className="flex flex-row items-center h-7.5 gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  {t('SVG')}
                </div>
              </button>
              <button
                onClick={downloadDrawio}
                className="flex items-center px-4 py-2 h-8 bg-grey-button text-black rounded-md hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent] transition-colors"
              >
                <div className="flex flex-row items-center h-7.5 gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  {t('draw.io')}
                </div>
              </button>
              <button
                onClick={saveToKade}
                className="flex items-center px-4 py-2 h-8 bg-grey-button text-black rounded-md hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent] transition-colors"
              >
                <div className="flex flex-row items-center h-7.5 gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 20H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10l4 4v3" />
                    <path d="M7 3v4h7V3" />
                    <path d="M7 20v-6h4" />
                    <path d="M18 14v7" />
                    <path d="M14.5 17.5h7" />
                  </svg>
                  {t('KADE Zip')}
                </div>
              </button>
            </div>
            <ScatterPlot
              data={data}
              svgRef={svgRef}
              width={localStore.width}
              height={localStore.height}
              {...props}
              {...scatterPlotStyles}
            />
          </div>
          <div className="flex flex-col h-[75%] mb-12">
            <div id="rotFactorsTableDiv">
              <RotationTable colDefs={colDefs} maxHeight={maxTableHeight} rowData={rowData} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  return null;
};

export default ScatterPlotAndTableTransitionContainer;
