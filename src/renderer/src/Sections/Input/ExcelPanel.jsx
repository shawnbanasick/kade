import { useState } from 'react';
import ExcelT1Card from './Excel/ExcelT1Card';
import ExcelT2Card from './Excel/ExcelT2Card';
import { useTranslation } from 'react-i18next';
import DownloadExampleT1 from './Excel/DownloadExampleT1';
import DownloadExampleT2 from './Excel/DownloadExampleT2';
import excel1 from '../../Sections/images/Excel1.png';
import excel2 from '../../Sections/images/Excel2.png';
import LoadExcelT1 from './Excel/LoadExcelT1';
import parseExcelType2 from './Excel/parseExcelType2';
import NewLoadButton from '../../Utils/NewLoadButton';
import inputState from '../GlobalState/inputState';

const ExcelPanel = () => {
  const [t] = useTranslation();

  const steps = [
    {
      image: excel1,
      alt: 'Excel Type 1 sample data',
      title: 'Data organized in columns (Q sorts in columns)',
      text: t('Export the Type 1 template, input your data, and import it into the application.'),
    },
    {
      image: excel2,
      alt: 'Excel Type 2 sample data',
      title: 'Data organized in rows (Q sorts in rows)',
      text: t('Export the Type 2 template, input your data, and import it into the application.'),
    },
  ];

  const [isLoadExcelT2ButtonGreen, setIsLoadExcelT2ButtonGreen] = useState(false);

  const handleClick = async () => {
    const isDataAlreadyLoaded = inputState.getState().isDataAlreadyLoaded;
    if (isDataAlreadyLoaded) {
      throwDataAlreadyLoadedInputErrorModal();
    } else {
      try {
        await window.electronAPI.openExcelFile();
        window.bridge.excelData((event, excelData) => {
          parseExcelType2(excelData);
          revertLoadButtonsColors('excelT2');
        });
      } catch (error) {
        // catch unknown input error
        inputState.errorMessage = t('There was an unexpected XSLX data input error');
        inputState.extendedErrorMessage = t('Check the format of the file and try again');
        inputState.errorStackTrace = t('no stack trace available');
        inputState.showErrorMessageBar = true;
      }
    }
  };

  return (
    <div id="excelPanelContainer" className="flex flex-col h-full overflow-y-auto pb-10">
      <div className="text-4xl mt-2 mb-10">{t('Excel File Input')}</div>

      <div
        id="excelPanelHeader"
        className="font-['Helvetica'] text-black text-xl font-bold h-7.5 mb-5 "
      >
        {t('Load a Type 1 OR Type 2 Spreadsheet (XLSX) File')}
      </div>

      <div className="flex flex-row flex-wrap gap-34">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex w-[282px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
          >
            {/* Image area (click to enlarge) */}
            <div className="bg-gray-50 p-4">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Enlarge image: ${step.title}`}
                className="block cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <img
                  className="h-[205px] w-[250px] outline outline-1 outline-gray-300"
                  alt={step.alt}
                  src={step.image}
                />
              </button>
            </div>

            {/* Text area */}
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-14 shrink-0 items-center justify-center font-extrabold rounded-md bg-primary-button text-sm text-black">
                  {`Type ${index + 1}`}
                </span>
                <h3 className="text-sm font-semibold text-gray-900">{step.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">{step.text}</p>
              {index === 0 && (
                <div className="flex flex-col gap-4 mt-2">
                  <DownloadExampleT1 />
                  <LoadExcelT1 />
                </div>
              )}
              {index === 1 && (
                <div className="flex flex-col gap-4 mt-2">
                  <DownloadExampleT2 />
                  <NewLoadButton
                    className={`${isLoadExcelT2ButtonGreen ? 'bg-primary-button' : 'bg-grey-button'} `}
                    onClick={handleClick}
                  >
                    {' '}
                    <div
                      id="ExcelT2LineContainer"
                      className="flex flex-row justify-center items-center h-full w-full gap-3"
                    >
                      <svg
                        id="ExcelT2SvgContainer"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        className="rotate-180  h-[17px] w-[17px] fill-current"
                      >
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                      </svg>
                      <div className="font-sans text-sm font-bold">
                        {t('Load Type 2 XLSX File')}
                      </div>
                    </div>
                  </NewLoadButton>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  /*
  return (
    <div id="ExcelDataWindow">
      <div className="text-4xl mt-2 mb-10">{t('Excel File Input')}</div>

      <div
        id="excelPanelHeader"
        className="font-['Helvetica'] text-black text-xl font-bold h-7.5 mb-5 "
      >
        {t('Load a Type 1 OR Type 2 Spreadsheet (XLSX) File')}
      </div>
      <div
        id="excelPanelWindow"
        className="grid grid-cols-[350px_350px] grid-rows-[450px_75px_120px_1fr] select-none ml-10"
      >
        <div className="flex flex-col gap-3 justify-center items-center">
          <ExcelT1Card />
          <DownloadExampleT1 />
        </div>
        <div className="flex flex-col gap-3 justify-center items-center">
          <ExcelT2Card />
          <DownloadExampleT2 />
        </div>
      </div>
    </div>
  );
  */
};

export default ExcelPanel;
