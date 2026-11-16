import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import rotationState from '../../../GlobalState/rotationState';
import useScatterPlotExport from './useScatterPlotExport';

import ScatterPlot, { LEFT_EXTRA } from './ScatterPlot';
import ParticipantPopUp from './ParticipantPopUp';
import ClockwiseButtons from './ClockwiseButtons';
import RotationTable from '../rotationTable/RotationTable';
import RotationButtons from '../FactorSelect/RotationButtons';
import SaveRotationButton from '../FactorSelect/SaveRotationButton';

const scatterPlotStyles = {
  padding: 30,
  marginBottom: 10,
};

const MIN_SIZE = 180;
const MAX_SIZE = 1100;

const ScatterPlotAndTableTransitionContainer = (props) => {
  const { t } = useTranslation();
  const showScatterPlotTableDiv = rotationState((state) => state.showScatterPlotTableDiv);
  const data = rotationState((state) => state.newRotationVectors);
  const colDefs = rotationState((state) => state.rotColDefsFactorTable);
  const rowData = rotationState((state) => state.rotRowDataFactorTable);
  const rotationDegrees = rotationState((state) => state.rotationDegrees);

  const svgRef = useRef(null);
  const plotColRef = useRef(null);

  const [localStore, setLocalStore] = useState({
    width: 600,
    height: 600,
  });

  const notify = async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    await toast.success(
      <div>
        {/* {t('Data Loaded Successfully!')}
        <br /> */}
        {t('Current image saved to KADE zip')}
      </div>,
      {
        autoClose: true,
        position: 'bottom-right',
        closeOnClick: true,
        draggable: true,
        theme: 'light',
        style: {
          background: '#fff',
          color: 'dark-gray',
          outline: '1px solid #ccc',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
      }
    );
  };

  const { downloadSvg, downloadPng, downloadDrawio, saveToKade } = useScatterPlotExport(
    svgRef,
    {
      width: localStore.width,
      height: localStore.height,
      padding: scatterPlotStyles.padding,
      leftOffset: LEFT_EXTRA,
    },
    notify,
    rotationDegrees
  );

  useEffect(() => {
    const el = plotColRef.current;
    if (!el) return;

    const update = () => {
      const availableW = el.clientWidth - LEFT_EXTRA;
      const availableH = window.innerHeight - 345;
      const size = Math.round(Math.max(MIN_SIZE, Math.min(availableW, availableH, MAX_SIZE)));
      setLocalStore((prev) => (prev.width === size ? prev : { width: size, height: size }));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener('resize', update); // height changes don't resize the column
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [showScatterPlotTableDiv]);

  const degreesText = `${rotationDegrees}\u00B0`;
  const maxTableHeight = window.innerHeight - 340;

  if (showScatterPlotTableDiv) {
    return (
      <React.Fragment>
        <ToastContainer transition={Zoom} />
        <div
          className="flex flex-wrap items-end w-full h-10 flex-row mb-3"
          id="RotPlotFactorsSelectDiv"
        >
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
        <div id="scatterPlotDiv" className="flex flex-row w-full h-[80%] gap-2 mt-1.25">
          <div
            ref={plotColRef}
            className="flex flex-col flex-1 max-w-[48%] h-[75%]"
            style={{ minWidth: MIN_SIZE + LEFT_EXTRA }}
          >
            <div className="flex flex-row flex-wrap gap-2 ml-2 mt-2 mr-4 items-end ">
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
            <div>
              <ScatterPlot
                data={data}
                svgRef={svgRef}
                width={localStore.width}
                height={localStore.height}
                {...props}
                {...scatterPlotStyles}
              />
            </div>
          </div>

          <div className="flex flex-col mb-12 mt-4 shrink-0">
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
