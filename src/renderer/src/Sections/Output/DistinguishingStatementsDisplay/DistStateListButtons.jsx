import { useState } from 'react';
import GeneralButton from '../../../Utils/GeneralButton';
import outputState from '../../GlobalState/outputState';

const DistStateListButtons = () => {
  const threshold = outputState((state) => state.threshold);
  const updateThreshold = outputState((state) => state.updateThreshold);

  const [localStore, setLocalStore] = useState({
    rotationDegreeInput: '',
    p0001Active: false,
    p0005Active: false,
    p001Active: false,
    p005Active: false,
    p01Active: false,
    p05Active: true,
    p1Active: false,
    p15Active: false,
    p2Active: false,
    buttonColor: '#d6dbe0',
    pressed: false,
  });

  const clearAllButtons = () => {
    localStore.p0001Active = false;
    localStore.p0005Active = false;
    localStore.p001Active = false;
    localStore.p005Active = false;
    localStore.p01Active = false;
    localStore.p05Active = false;
    localStore.p1Active = false;
    localStore.p15Active = false;
    localStore.p2Active = false;
  };

  const handleOnclick = (event) => {
    const buttonId = event.target.id;

    if (buttonId === 'p0001Button') {
      clearAllButtons();
      setLocalStore((prevState) => ({ ...prevState, p0001Active: true }));
      updateThreshold(8);
    }
    if (buttonId === 'p0005Button') {
      clearAllButtons();
      setLocalStore((prevState) => ({ ...prevState, p0005Active: true }));
      updateThreshold(7);
    }
    if (buttonId === 'p001Button') {
      clearAllButtons();
      setLocalStore((prevState) => ({ ...prevState, p001Active: true }));
      updateThreshold(6);
    }
    if (buttonId === 'p005Button') {
      clearAllButtons();
      setLocalStore((prevState) => ({ ...prevState, p005Active: true }));
      updateThreshold(5);
    }
    if (buttonId === 'p01Button') {
      clearAllButtons();
      setLocalStore((prevState) => ({ ...prevState, p01Active: true }));
      updateThreshold(4);
    }
    if (buttonId === 'p05Button') {
      clearAllButtons();
      setLocalStore((prevState) => ({ ...prevState, p05Active: true }));
      updateThreshold(3);
    }
    if (buttonId === 'p1Button') {
      clearAllButtons();
      setLocalStore((prevState) => ({ ...prevState, p1Active: true }));
      updateThreshold(2);
    }
    if (buttonId === 'p15Button') {
      clearAllButtons();
      setLocalStore((prevState) => ({ ...prevState, p15Active: true }));
      updateThreshold(1);
    }
    if (buttonId === 'p2Button') {
      clearAllButtons();
      setLocalStore((prevState) => ({ ...prevState, p2Active: true }));
      updateThreshold(0);
    }
  };

  return (
    <div className="flex items-baseline mt-5 gap-3">
      <div className="text-[18px] font-bold">Threshold:</div>
      <GeneralButton
        id="p0001Button"
        onClick={handleOnclick}
        className={`min-w-20 ${localStore.p0001Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f1"
      >
        0.0001
      </GeneralButton>
      <GeneralButton
        id="p0005Button"
        onClick={handleOnclick}
        className={`min-w-20 ${localStore.p0005Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f2"
      >
        0.0005
      </GeneralButton>
      <GeneralButton
        id="p001Button"
        onClick={handleOnclick}
        className={`min-w-20 ${localStore.p001Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f3"
      >
        0.001
      </GeneralButton>
      <GeneralButton
        id="p005Button"
        onClick={handleOnclick}
        className={`min-w-20 ${localStore.p005Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f4"
      >
        0.005
      </GeneralButton>
      <GeneralButton
        id="p01Button"
        onClick={handleOnclick}
        className={`min-w-20 ${localStore.p01Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f5"
      >
        0.01
      </GeneralButton>
      <GeneralButton
        id="p05Button"
        onClick={handleOnclick}
        className={`min-w-20 ${localStore.p05Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f6"
      >
        0.05
      </GeneralButton>
      <GeneralButton
        id="p1Button"
        onClick={handleOnclick}
        className={`min-w-20 ${localStore.p1Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f7"
      >
        0.1
      </GeneralButton>
      <GeneralButton
        id="p15Button"
        onClick={handleOnclick}
        className={`min-w-20 ${localStore.p15Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f8"
      >
        0.15
      </GeneralButton>
      <GeneralButton
        id="p2Button"
        onClick={handleOnclick}
        className={`min-w-20 ${localStore.p2Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f9"
      >
        0.2
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
