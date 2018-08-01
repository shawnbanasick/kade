import cloneDeep from "lodash/cloneDeep";
import { store } from "react-easy-state";


export default store({
    setState(update) {
        for (const property in update) {
            if (update.hasOwnProperty(property)) {
                this[property] = update[property];
            }
        }
    },
    getState(value) {
        const returnValue = this[value];
        const newReturnValue = cloneDeep(returnValue);
        return newReturnValue;
    },


});

