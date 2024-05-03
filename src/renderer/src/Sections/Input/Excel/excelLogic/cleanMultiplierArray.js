// import S1DataSlice from "../../State/S1DataSlice";

const cleanMultiplierArray = multiplierArray => {
  let multiplierArray2 = multiplierArray.split(",").filter(item => item);
  let newMultiplierArray = multiplierArray2.map(item => {
    return parseInt(item, 10);
  });

  return newMultiplierArray;
};

export default cleanMultiplierArray;
