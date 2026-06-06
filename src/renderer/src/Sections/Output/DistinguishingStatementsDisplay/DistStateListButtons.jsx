import { useState } from 'react';
import GeneralButton from '../../../Utils/GeneralButton';
import outputState from '../../GlobalState/outputState';

const DistStateListButtons = ({ label }) => {
  const threshold = outputState((state) => state.threshold);
  const updateThreshold = outputState((state) => state.updateThreshold);
  const p0001Active = outputState((state) => state.p0001Active);
  const p0005Active = outputState((state) => state.p0005Active);
  const p001Active = outputState((state) => state.p001Active);
  const p005Active = outputState((state) => state.p005Active);
  const p01Active = outputState((state) => state.p01Active);
  const p05Active = outputState((state) => state.p05Active);
  const p1Active = outputState((state) => state.p1Active);
  const p15Active = outputState((state) => state.p15Active);
  const p2Active = outputState((state) => state.p2Active);

  const updateP0001Active = (value) => {
    outputState.setState({ p0001Active: value });
  };
  const updateP0005Active = (value) => {
    outputState.setState({ p0005Active: value });
  };
  const updateP001Active = (value) => {
    outputState.setState({ p001Active: value });
  };
  const updateP005Active = (value) => {
    outputState.setState({ p005Active: value });
  };
  const updateP01Active = (value) => {
    outputState.setState({ p01Active: value });
  };
  const updateP05Active = (value) => {
    outputState.setState({ p05Active: value });
  };
  const updateP1Active = (value) => {
    outputState.setState({ p1Active: value });
  };
  const updateP15Active = (value) => {
    outputState.setState({ p15Active: value });
  };
  const updateP2Active = (value) => {
    outputState.setState({ p2Active: value });
  };

  const clearAllButtons = () => {
    outputState.setState((state) => ({
      p0001Active: false,
      p0005Active: false,
      p001Active: false,
      p005Active: false,
      p01Active: false,
      p05Active: false,
      p1Active: false,
      p15Active: false,
      p2Active: false,
    }));
  };

  const handleOnclick = (event) => {
    const buttonId = event.target.id;

    if (buttonId === 'p0001Button') {
      clearAllButtons();
      updateP0001Active(true);
      updateThreshold(8);
    }
    if (buttonId === 'p0005Button') {
      clearAllButtons();
      updateP0005Active(true);
      updateThreshold(7);
    }
    if (buttonId === 'p001Button') {
      clearAllButtons();
      updateP001Active(true);
      updateThreshold(6);
    }
    if (buttonId === 'p005Button') {
      clearAllButtons();
      updateP005Active(true);
      updateThreshold(5);
    }
    if (buttonId === 'p01Button') {
      clearAllButtons();
      updateP01Active(true);
      updateThreshold(4);
    }
    if (buttonId === 'p05Button') {
      clearAllButtons();
      updateP05Active(true);
      updateThreshold(3);
    }
    if (buttonId === 'p1Button') {
      clearAllButtons();
      updateP1Active(true);
      updateThreshold(2);
    }
    if (buttonId === 'p15Button') {
      clearAllButtons();
      updateP15Active(true);
      updateThreshold(1);
    }
    if (buttonId === 'p2Button') {
      clearAllButtons();
      updateP2Active(true);
      updateThreshold(0);
    }
  };

  return (
    <div className="flex items-baseline mt-5 gap-3">
      <div className="text-[18px] font-bold">{label}:</div>
      <GeneralButton
        id="p2Button"
        onClick={handleOnclick}
        className={`min-w-20 ${p2Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f9"
      >
        0.2
      </GeneralButton>
      <GeneralButton
        id="p15Button"
        onClick={handleOnclick}
        className={`min-w-20 ${p15Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f8"
      >
        0.15
      </GeneralButton>
      <GeneralButton
        id="p1Button"
        onClick={handleOnclick}
        className={`min-w-20 ${p1Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f7"
      >
        0.1
      </GeneralButton>
      <GeneralButton
        id="p05Button"
        onClick={handleOnclick}
        className={`min-w-20 ${p05Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f6"
      >
        0.05
      </GeneralButton>
      <GeneralButton
        id="p01Button"
        onClick={handleOnclick}
        className={`min-w-20 ${p01Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f5"
      >
        0.01
      </GeneralButton>
      <GeneralButton
        id="p005Button"
        onClick={handleOnclick}
        className={`min-w-20 ${p005Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f4"
      >
        0.005
      </GeneralButton>
      <GeneralButton
        id="p001Button"
        onClick={handleOnclick}
        className={`min-w-20 ${p001Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f3"
      >
        0.001
      </GeneralButton>
      <GeneralButton
        id="p0005Button"
        onClick={handleOnclick}
        className={`min-w-20 ${p0005Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f2"
      >
        0.0005
      </GeneralButton>
      <GeneralButton
        id="p0001Button"
        onClick={handleOnclick}
        className={`min-w-20 ${p0001Active ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f1"
      >
        0.0001
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
