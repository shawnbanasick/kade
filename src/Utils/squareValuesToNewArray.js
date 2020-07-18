import evenRound from "../Utils/evenRound";

const squareValuesToNewArray = array => {
    let newArray = array.map(value => evenRound(value * value, 8));
    return newArray;
};

export default squareValuesToNewArray;
