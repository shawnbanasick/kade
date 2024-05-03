import projectHistoryState from "./projectHistoryState";
const clone = require("rfdc")();

const getProjectHistoryState = key => {
  try {
    const stateValue = projectHistoryState[key];

    if (stateValue === null || stateValue === undefined) {
      throw new Error(`null or undefined value: ${key}`);
    }

    const returnValue = clone(stateValue);

    return returnValue;
  } catch (error) {
    const spacing = "5px";
    const styles = `padding: ${spacing}; background-color: darkblue; color: white; font-style: 
     italic; border: ${spacing} solid crimson; font-size: 2em;`;
    console.error("%cError", styles, error.message);
  }
};

export default getProjectHistoryState;
