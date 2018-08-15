import { evenRound } from "../../Utils/evenRound";

const divideValuebySqrtTotalSums = (array, totalsSumsSqrt) => {
    let factorLoad1 = array.map(value => evenRound(value / totalsSumsSqrt, 8));

    return factorLoad1;
};

export default divideValuebySqrtTotalSums;
