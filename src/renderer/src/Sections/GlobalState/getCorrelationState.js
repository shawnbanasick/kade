import correlationState from './correlationState';
import cloneDeep from 'lodash/cloneDeep';

const getCorrelationState = (key) => {
  try {
    const stateValue = correlationState[key];

    if (stateValue === null || stateValue === undefined) {
      throw new Error(`null or undefined value: ${key}`);
    }

    const returnValue = cloneDeep(stateValue);

    return returnValue;
  } catch (error) {
    const spacing = '3px';
    const styles = `padding: ${spacing}; background-color: darkblue; color: white; font-style: 
     italic; border: ${spacing} solid crimson; font-size: 2em;`;
    console.error('%cError', styles, error.message);
  }
};

export default getCorrelationState;
