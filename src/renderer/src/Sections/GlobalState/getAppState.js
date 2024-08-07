import appState from './appState';
import cloneDeep from 'lodash/cloneDeep';

const getAppState = (key) => {
  try {
    const stateValue = appState[key];

    if (stateValue === null || stateValue === undefined) {
      throw new Error(`null or undefined value: ${key}`);
    }

    const returnValue = cloneDeep(stateValue);

    return returnValue;
  } catch (error) {
    const spacing = '5px';
    const styles = `padding: ${spacing}; background-color: darkblue; color: white; font-style: 
     italic; border: ${spacing} solid crimson; font-size: 2em;`;
    console.error('%cError', styles, error.message);
  }
};

export default getAppState;
