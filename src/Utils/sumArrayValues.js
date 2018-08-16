import reduce from 'lodash/reduce';
import evenRound from "../Utils/evenRound";


const sumArrayValues = array => {
    let totalsSums = reduce(array, function(sum, num) {
        return evenRound(sum + num, 8);
    });
    return totalsSums;
};

export default sumArrayValues;
