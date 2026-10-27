// import inputState from '../GlobalState/inputState';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import quinceImage1 from '../../Sections/images/quince-input-1.png';
import quinceImage2 from '../../Sections/images/quince-input-2.png';
import quinceImage3 from '../../Sections/images/quince-input-3.png';
import quinceImage4 from '../../Sections/images/pqMethod-input-sta.png';
import quinceImage5 from '../../Sections/images/Excel2.png';
import ProjectNameInput from './CSV/ProjectNameInput';
import RadioExampleRadioGroup from './CSV/ForcedUnforcedRadio';
import QsortDesignInputElement from './CSV/QsortDesignInputElement';
import LoadCsvStatements from './CSV/LoadCsvStatements';
import LoadJsonQsorts from './JSON/LoadJsonQsorts';

const JsonPanel = () => {
  const { t } = useTranslation();

  // Index of the step whose image is enlarged, or null when the modal is closed.
  const [activeIndex, setActiveIndex] = useState(null);

  // Replace the boilerplate below with real instructions.
  // To localize later, swap each string for t('your.translation.key').
  const steps = [
    {
      image: quinceImage1,
      alt: 'Excel Type 2 sample - step 1',
      title: 'Step 1: Log in to Baserow and select your database',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      image: quinceImage2,
      alt: 'Excel Type 2 sample - step 2',
      title: 'Step 2: Select format and prepare download',
      text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      image: quinceImage3,
      alt: 'Excel Type 2 sample - step 3',
      title: 'Step 3: Download the file',
      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      image: quinceImage4,
      alt: 'Excel Type 2 sample - step 4',
      title: 'Step 4: Load statemens text file',
      text: 'Load your statements as a .txt file, with each statement on a separate line.',
    },
    {
      image: quinceImage5,
      alt: 'Excel Type 2 sample - step 5',
      title: 'Step 5: Load the Q sorts data file',
      text: 'Load the CSV Baserow file you downloaded here.',
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
    <div id="jsonDataWindow" className="overflow-y-auto h-full mb-10 pb-8">
      <div className="text-4xl mt-2 mb-10">{t('Quince Data Import')}</div>
      <p
        id="pqmethodDataWindowHeader"
        className="mb-6 font-['Helvetica'] text-xl leading-relaxed text-black"
      >
        {t('Quince is free Q sorting software for desktop and mobile devices')}
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
            className="flex w-[282px] flex-col items-center rounded-lg border border-gray-200 bg-white shadow-sm"
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
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-button text-sm font-bold text-black">
                  {index + 1}
                </span>
                <h3 className="text-sm font-semibold text-gray-900">{step.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">{step.text}</p>
            </div>
            {index === 3 && <LoadCsvStatements />}
            {index === 4 && <LoadJsonQsorts />}
          </div>
        ))}
        <div className="flex flex-row flex-wrap gap-4">
          <ProjectNameInput numbering="6" />
          <RadioExampleRadioGroup numbering="7" />
          <QsortDesignInputElement numbering="8" />
        </div>
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
