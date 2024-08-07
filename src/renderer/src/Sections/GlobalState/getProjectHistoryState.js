import projectHistoryState from './projectHistoryState';
import cloneDeep from 'lodash/cloneDeep';

const getProjectHistoryState = (key) => {
  try {
    const stateValue = projectHistoryState[key];

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

export default getProjectHistoryState;
