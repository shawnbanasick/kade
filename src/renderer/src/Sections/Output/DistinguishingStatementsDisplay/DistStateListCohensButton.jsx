import { useState } from 'react';
import GeneralButton from '../../../Utils/GeneralButton';
import outputState from '../../GlobalState/outputState';
import { useTranslation } from 'react-i18next';

const DistStateListButtons = () => {
  const threshold = outputState((state) => state.threshold);
  const updateCohensThreshold = outputState((state) => state.updateCohensThreshold);
  const { t } = useTranslation();

  const [localStore, setLocalStore] = useState({
    cohen10Active: false,
    cohen20Active: false,
    cohen30Active: false,
    cohen40Active: false,
    cohen50Active: false,
    cohen60Active: true,
    cohen70Active: false,
    cohen80Active: false,
    cohen90Active: false,
    cohen100Active: false,
    buttonColor: '#d6dbe0',
    pressed: false,
  });

  const clearAllButtons = () => {
    localStore.cohen10Active = false;
    localStore.cohen20Active = false;
    localStore.cohen30Active = false;
    localStore.cohen40Active = false;
    localStore.cohen50Active = false;
    localStore.cohen60Active = false;
    localStore.cohen70Active = false;
    localStore.cohen80Active = false;
    localStore.cohen90Active = false;
    localStore.cohen100Active = false;
  };

  const handleOnclick = (event) => {
    const buttonId = event.target.id;

    if (buttonId === 'cohen10Button') {
      clearAllButtons();
      setLocalStore((prevState) => ({ ...prevState, cohen10Active: true }));
      updateCohensThreshold(0.1);
    }
    if (buttonId === 'cohen20Button') {
      clearAllButtons();
      setLocalStore((prevState) => ({ ...prevState, cohen20Active: true }));
      updateCohensThreshold(0.2);
    }
    if (buttonId === 'cohen30Button') {
      clearAllButtons();
      setLocalStore((prevState) => ({ ...prevState, cohen30Active: true }));
      updateCohensThreshold(0.3);
    }
    if (buttonId === 'cohen40Button') {
      clearAllButtons();
      setLocalStore((prevState) => ({ ...prevState, cohen40Active: true }));
      updateCohensThreshold(0.4);
    }
    if (buttonId === 'cohen50Button') {
      clearAllButtons();
      setLocalStore((prevState) => ({ ...prevState, cohen50Active: true }));
      updateCohensThreshold(0.5);
    }
    if (buttonId === 'cohen60Button') {
      clearAllButtons();
      setLocalStore((prevState) => ({ ...prevState, cohen60Active: true }));
      updateCohensThreshold(0.6);
    }
    if (buttonId === 'cohen70Button') {
      clearAllButtons();
      setLocalStore((prevState) => ({ ...prevState, cohen70Active: true }));
      updateCohensThreshold(0.7);
    }
    if (buttonId === 'cohen80Button') {
      clearAllButtons();
      setLocalStore((prevState) => ({ ...prevState, cohen80Active: true }));
      updateCohensThreshold(0.8);
    }
    if (buttonId === 'cohen90Button') {
      clearAllButtons();
      setLocalStore((prevState) => ({ ...prevState, cohen90Active: true }));
      updateCohensThreshold(0.9);
    }
    if (buttonId === 'cohen100Button') {
      clearAllButtons();
      setLocalStore((prevState) => ({ ...prevState, cohen100Active: true }));
      updateCohensThreshold(1.0);
    }
  };

  return (
    <div className="flex items-baseline mt-5 gap-3">
      <div className="text-[18px] font-bold">
        {t('cohens')} <i>d</i> {t('level')}:
      </div>
      <GeneralButton
        id="cohen10Button"
        onClick={handleOnclick}
        className={`min-w-20 ${localStore.cohen10Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f1"
      >
        0.10
      </GeneralButton>
      <GeneralButton
        id="cohen20Button"
        onClick={handleOnclick}
        className={`min-w-20 ${localStore.cohen20Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f2"
      >
        0.20
      </GeneralButton>
      <GeneralButton
        id="cohen30Button"
        onClick={handleOnclick}
        className={`min-w-20 ${localStore.cohen30Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f3"
      >
        0.30
      </GeneralButton>
      <GeneralButton
        id="cohen40Button"
        onClick={handleOnclick}
        className={`min-w-20 ${localStore.cohen40Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f4"
      >
        0.40
      </GeneralButton>
      <GeneralButton
        id="cohen50Button"
        onClick={handleOnclick}
        className={`min-w-20 ${localStore.cohen50Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f5"
      >
        0.50
      </GeneralButton>
      <GeneralButton
        id="cohen60Button"
        onClick={handleOnclick}
        className={`min-w-20 ${localStore.cohen60Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f6"
      >
        0.60
      </GeneralButton>
      <GeneralButton
        id="cohen70Button"
        onClick={handleOnclick}
        className={`min-w-20 ${localStore.cohen70Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f7"
      >
        0.70
      </GeneralButton>
      <GeneralButton
        id="cohen80Button"
        onClick={handleOnclick}
        className={`min-w-20 ${localStore.cohen80Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f8"
      >
        0.80
      </GeneralButton>
      <GeneralButton
        id="cohen90Button"
        onClick={handleOnclick}
        className={`min-w-20 ${localStore.cohen90Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f9"
      >
        0.90
      </GeneralButton>
      <GeneralButton
        id="cohen100Button"
        onClick={handleOnclick}
        className={`min-w-20 ${localStore.cohen100Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f10"
      >
        1.00
      </GeneralButton>
    </div>
  );
};

export default DistStateListButtons;

/* 
  begin comparisons
    const lookupArray = [3.891, 3.481, 3.291, 2.807, 2.575, 1.96, 1.645, 1.44, 1.28];
  
    const pValuesTextArray = [
    "P < 0.0001",
    "P < 0.0005",
    "P < 0.001",
    "P < 0.005"
    "P < 0.01",
    "P < 0.05",
    "P < 0.1",
    "P < 0.15"
    "P < 0.2"
  ];
  */
