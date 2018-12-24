import evenRound from "../Utils/evenRound";

const squareValuesToNewArray = array => {
  const newArray = array.map(value => evenRound(value * value, 8));
  return newArray;
};

export default squareValuesToNewArray;
