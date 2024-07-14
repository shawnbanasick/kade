import rotationState from './rotationState';
import cloneDeep from 'lodash.clonedeep';

const getRotationState = (key) => {
  try {
    const stateValue = rotationState[key];

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

export default getRotationState;
