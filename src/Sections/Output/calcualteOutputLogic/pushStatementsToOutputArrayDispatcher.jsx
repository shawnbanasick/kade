import coreState from "../../GlobalState/coreState";
import calcState from "../../GlobalState/calcState";
import pushStatementsToOutputArray from "./2_pushStatementsToOutputArray";
import i18n from "i18next";
const clone = require("rfdc")();

const pushStatementsToOutputArrayDispatcher = (
  outputData,
  sheetNamesXlsx,
  colSizes
) => {
  // get translations
  const statementsTrans = i18n.t("Statements");
  const statementNumTrans = i18n.t("Statement Number");
  const stateTranslations = { statementsTrans, statementNumTrans };

  // getState
  const statements = clone(coreState.statements);

  const pushStatements = pushStatementsToOutputArray(
    outputData,
    sheetNamesXlsx,
    colSizes,
    statements,
    stateTranslations
  );

  calcState.maxStatementLength = pushStatements[1]; // maxStatementLength;

  return pushStatements[0];
};

export default pushStatementsToOutputArrayDispatcher;
