import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import inputState from '../GlobalState/inputState';

import quinceImage1 from '../../Sections/images/quince-input-1.png';
import quinceImage2 from '../../Sections/images/quince-input-2.png';
import quinceImage3 from '../../Sections/images/quince-input-3.png';
import quinceImage4 from '../../Sections/images/pqMethod-input-sta.png';
import quinceImage5 from '../../Sections/images/Excel2.png';
import LoadQuinceQsorts from './Quince/LoadQuinceQsorts';
import IdRadioButtons from './Quince/IdRadioButtons';
import QuinceForcedUnforcedRadio from './Quince/QuinceForcedUnforcedRadio';
import ForcedInput from './Quince/ForcedInput';
import ExportQuinceData from './Quince/ExportQuinceData';
import LoadConfigXml from './Quince/LoadConfigXml';
import LoadQuinceStatements from './Quince/LoadQuinceStatements';
// import SubmitQuinceButton from './Quince/SubmitQuinceButton';
// import RadioExampleRadioGroup from './CSV/ForcedUnforcedRadio';
// import QsortDesignInputElement from './CSV/QsortDesignInputElement';

const JsonPanel = () => {
  const { t } = useTranslation();

  const quinceForcedUnforcedState = inputState((state) => state.quinceForcedUnforcedState);
  console.log('quinceForcedUnforcedState', quinceForcedUnforcedState);

  // Index of the step whose image is enlarged, or null when the modal is closed.
  const [activeIndex, setActiveIndex] = useState(null);

  let step7Text = t('This step is not required for forced Q Sorts.');
  let step7ImageArea = (
    <div className="flex flex-col gap-4 items-center justify-center bg-gray-50 p-2 h-[205px] w-[250px]">
      <div>Not Required</div>
      <div>Skip this step</div>
    </div>
  );

  if (quinceForcedUnforcedState === 'unforced') {
    step7Text = t(
      'Input the sort pattern for the study. This is the number of statements per column, from left to right.'
    );
  }

  // Replace the boilerplate below with real instructions.
  // To localize later, swap each string for t('your.translation.key').
  // todo - add translations
  const steps = [
    {
      image: quinceImage1,
      alt: 'Excel Type 2 sample - step 1',
      title: 'Step 1: Log in to Baserow',
      text: '(CLICK IMAGE TO ENLARGE) Log in to Baserow and open the project you want to export data from. Click on the three dots that become visible when you hover over the database name. Then select "Export table" from the menu.',
    },
    {
      image: quinceImage2,
      alt: 'Excel Type 2 sample - step 2',
      title: 'Step 2: Select format',
      text: 'Click on the "Column separator" dropdown and select "record separator". Then click on the "Export" button.',
    },
    {
      image: quinceImage3,
      alt: 'Excel Type 2 sample - step 3',
      title: 'Step 3: Download data',
      text: 'After a few moments, the button text will change from Export to Download. Click on the Download button to download the CSV file.',
    },
    {
      image: quinceImage4,
      alt: 'Excel Type 2 sample - step 4',
      title: 'Step 4: Import statements.xml data',
      text: 'Import the same statements.xml file that you used in your Quince project.',
    },
    {
      // image: quinceImage5,
      alt: 'Choose ID - step 5',
      title: 'Step 5: Set ID Value',
      text: 'Select an ID for participants in the study.Not all studies will have a Participant ID  or URL usercode value, but if your study does, select the appropriate column from the dropdown.',
    },
    {
      // image: quinceImage5,
      alt: 'Forced - step 6',
      title: 'Step 6: Are Q Sorts Forced?',
      text: 'Indicate whether the participants were forced to place statements in a specific pattern, or if they were allowed to place them freely.',
    },
    {
      // image: quinceImage5,
      alt: 'Input Sort Pattern - step 7',
      title: 'Step 7: Q Sort Pattern',
      text: 'Input the sort pattern for the study. This is the number of statements per column, from left to right.',
    },
    {
      image: quinceImage5,
      alt: 'Excel Type 2 sample - step 8',
      title: 'Step 8: Import the Quince Data',
      text: 'Load the Baserow CSV file you downloaded in Step 3.',
    },
    {
      // image: quinceImage5,
      alt: 'Export Project Data - step 9',
      title: 'Step 9: Export the project data',
      text: '(OPTIONAL) Export the other project data (comments, survey question answers, etc.).',
    },
  ];

  const activeStep = activeIndex !== null ? steps[activeIndex] : null;
  const closeModal = () => setActiveIndex(null);

  // While the modal is open: close on Escape and lock background scrolling.
  useEffect(() => {
    if (activeIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveIndex(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex]);

  return (
    <div id="quinceDataWindow" className="overflow-y-auto h-full mb-10 pb-8">
      <div className="text-4xl mt-2 mb-10">{t('Quince Data Import')}</div>
      <p
        id="pqmethodDataWindowHeader"
        className="mb-6 font-['Helvetica'] text-xl leading-relaxed text-black"
      >
        {t('Quince is free software for  Q sorting on desktops, notebooks, and mobile phones')}
        {' - '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://quince-config.netlify.app/"
          className="!font-semibold !text-[#ee975c] !underline underline-offset-4 decoration-2 transition-colors hover:!text-blue-600 focus:outline-none focus-visible:rounded-sm focus-visible:ring-2 !focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          {t('Home page')}
        </a>
      </p>

      <div className="flex flex-row flex-wrap gap-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex w-[300px] min-h-[400px] flex-col items-center rounded-lg border border-gray-200 bg-white shadow-sm"
          >
            {/* Image area (click to enlarge) */}
            <div className="bg-gray-50 p-2">
              {step.image && (
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
              )}
              {index === 4 && <IdRadioButtons />}
              {index === 5 && <QuinceForcedUnforcedRadio />}
              {index === 6 &&
                (quinceForcedUnforcedState === 'unforced' ? <ForcedInput /> : step7ImageArea)}
              {index === 8 && <ExportQuinceData />}
            </div>

            {/* Text area */}
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center justify-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-button text-sm font-bold text-black">
                  {index + 1}
                </span>
                <h3 className="text-sm font-semibold text-gray-900">{step.title}</h3>
              </div>
              <div className="text-sm text-balanced leading-relaxed text-gray-600">
                {index === 6 ? step7Text : step.text}
              </div>
            </div>
            {index === 3 && <LoadQuinceStatements />}
            {index === 7 && <LoadQuinceQsorts />}
            {index === 8 && <LoadConfigXml />}
          </div>
        ))}
        {/* <div className="flex flex-row flex-wrap gap-4"> */}
        {/* <QsortDesignInputElement numbering="9" /> */}
        {/* </div> */}
      </div>

      {/* Modal */}
      {activeStep && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={activeStep.title}
        >
          <div
            className="relative flex max-h-full max-w-[80rem] flex-col overflow-hidden rounded-lg bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-lg leading-none text-white hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              autoFocus
            >
              &times;
            </button>

            <div className="min-h-0 overflow-auto bg-gray-50 p-4">
              <img
                className="mx-auto max-h-[94vh] w-[600px] max-w-full object-contain"
                alt={activeStep.alt}
                src={activeStep.image}
              />
            </div>

            <div className="border-t border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900">{activeStep.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{activeStep.text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JsonPanel;
