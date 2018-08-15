import store from "../../store";

const determineNumberPCs = () => {
    let totalNumberSorts = store.getState("respondentNames").length;
    let numStatements = store.getState("numStatements");

    let numFactorsCalcArray = [8, totalNumberSorts, numStatements];

    let numberPCsToExtract = Math.min(...numFactorsCalcArray);

    return numberPCsToExtract;
};

export default determineNumberPCs;
