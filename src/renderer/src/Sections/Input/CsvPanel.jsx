import { useTranslation } from 'react-i18next';
import ProjectNameInput from './CSV/ProjectNameInput';
import statementsTextImage from '../images/statementsTextImage.png';
import excel2Image from '../images/Excel2.png';
import LoadCsvStatements from './CSV/LoadCsvStatements';
import LoadCsvQsorts from './CSV/LoadCsvQsorts';
import ReuseableForcedUnforcedRadio from '../../Utils/ReusableForcedUnforced';
import inputState from '../GlobalState/inputState';
import CsvForcedInput from './CSV/CsvForcedInput';

const CsvPanel = () => {
  const { t } = useTranslation();
  const isForced = inputState((s) => s.csvUnforcedRadioButtonState);
  const setPattern = inputState((s) => s.updateIsForcedQsortPattern);
  const updateCsvUnforcedRadioButtonState = inputState((s) => s.updateCsvUnforcedRadioButtonState);
  const isPatternInputComplete = inputState((s) => s.isPatternInputComplete);
  const updateIsPatternInputComplete = inputState((s) => s.updateIsPatternInputComplete);

  let step4Text = t('This step is not required for forced Q Sorts.');
  let step4ImageArea = (
    <div className="flex flex-col gap-4 items-center justify-center bg-gray-50 p-2 h-[205px] w-[250px]">
      <div>Not Required</div>
      <div>Skip this step</div>
    </div>
  );

  let buttonDisabled = false;
  if (isForced === 'unforced') {
    step4Text = t(
      'Input the sort pattern for the project. This is the number of statements per column, from left to right.'
    );
    buttonDisabled = !isPatternInputComplete;
  }

  const handleChange = (selected) => {
    setPattern(selected);
    if (selected === 'forced') {
      updateCsvUnforcedRadioButtonState('forced');
    }
    updateCsvUnforcedRadioButtonState(selected);
  };

  return (
    <div id="csvPanelContainer" className="flex flex-col gap-4 h-full overflow-y-auto pb-10">
      <div id="csvDataWindow" className="flex flex-col gap-4">
        <div className="text-4xl mt-2 mb-10">{t('CSV File Input')}</div>

        <div
          id="csvPanelHeader"
          className="font-['Helvetica'] text-black text-xl font-bold h-7.5 mb-5"
        >
          {t('Load both a statements text file and a Q sorts CSV file')}
        </div>
      </div>

      <div className="flex flex-col gap-5 ml-10 outline-offset-0 p-4 rounded-lg ">
        <div className="flex flex-row flex-wrap gap-4">
          {/* -- PROJECT NAME CARD -- */}
          <div className="flex w-[282px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            {/* Image area (click to enlarge) */}
            <div className="bg-gray-50 p-4">
              <button
                type="button"
                className="block cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <ProjectNameInput id="projectNameInput" numbering="3" />
              </button>
            </div>

            {/* Text area */}
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center  mt-1.5 gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full  bg-primary-button text-sm font-bold text-black">
                  1
                </span>
                <h3 className="text-sm font-semibold text-gray-900">{t('Step 1: Project name')}</h3>
              </div>
              <div className="text-sm text-balanced leading-relaxed text-gray-600">
                {t('Input the name of the project. This will be used to name the output files.')}
              </div>
            </div>
          </div>

          {/* -- IMPORT STATEMENTS CARD -- */}
          <div className="flex w-[282px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            {/* Image area (click to enlarge) */}
            <div className="bg-gray-50 p-4">
              <button
                type="button"
                className="block cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <img
                  className="h-[205px] w-[250px] outline outline-1 outline-gray-300"
                  alt={t('Statements Text File Example')}
                  src={statementsTextImage}
                />
              </button>
            </div>

            {/* Text area */}
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full  bg-primary-button text-sm font-bold text-black">
                  2
                </span>
                <h3 className="text-sm font-semibold text-gray-900">{t('Import Statements')}</h3>
              </div>
              <div className="text-sm text-balanced leading-relaxed text-gray-600">
                {t(
                  'Statements must be saved as plain text (Unicode) with the extension ".txt". One statement per line.'
                )}
              </div>
              <LoadCsvStatements />
            </div>
          </div>
          {/* -- FORCED / UNFORCED CARD -- */}
          <div className="flex w-[282px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="bg-gray-50 p-4">
              <button
                type="button"
                className="block cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <ReuseableForcedUnforcedRadio
                  value={isForced}
                  onChange={handleChange}
                  legend="Q-sort pattern"
                />
              </button>
            </div>

            {/* Text area */}
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full  bg-primary-button text-sm font-bold text-black">
                  3
                </span>
                <h3 className="text-sm font-semibold text-gray-900">
                  {t('Step 3: Are Q sorts forced?')}
                </h3>
              </div>
              <div className="text-sm text-balanced leading-relaxed text-gray-600">
                {t(
                  'Indicate whether the participants were forced to place statements in a specific pattern, or if there were allowed to place them freely..'
                )}
              </div>
            </div>
          </div>
          {/* -- Q SORT PATTERN CARD -- */}
          <div className="flex w-[282px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="bg-gray-50 p-4">
              {isForced === 'forced' ? (
                step4ImageArea
              ) : (
                <CsvForcedInput id="csvForcedInput" numbering="4" />
              )}
            </div>

            {/* Text area */}
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full  bg-primary-button text-sm font-bold text-black">
                  4
                </span>
                <h3 className="text-sm font-semibold text-gray-900">
                  {t('Step 4: Q Sort Pattern')}
                </h3>
              </div>
              <div className="text-sm text-balanced leading-relaxed text-gray-600">{step4Text}</div>
            </div>
          </div>

          {/* -- IMPORT CSV SORTS CARD -- */}
          <div className="flex w-[282px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="bg-gray-50 p-4">
              <button
                type="button"
                className="block cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <img
                  className="h-[205px] w-[250px] outline outline-1 outline-gray-300"
                  alt={t('Q Sorts CSV File Example')}
                  src={excel2Image}
                />
              </button>
            </div>

            {/* Text area */}
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full  bg-primary-button text-sm font-bold text-black">
                  5
                </span>
                <h3 className="text-sm font-semibold text-gray-900">
                  {t(
                    'Q sorts must be saved as a CSV file with the extension ".csv". The participant sorts must be in rows.'
                  )}
                </h3>
              </div>
              <LoadCsvQsorts disabled={buttonDisabled} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CsvPanel;
