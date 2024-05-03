import factorState from "../../../GlobalState/factorState";
import appState from "../../../GlobalState/appState";
import rotationState from "../../../GlobalState/rotationState";
import checkForHeywoodCaseInCommunalities from "./checkForHeywoodCommunalities";

const doHeywoodCheck = (communalityArray, respondentNames, hasHeywoodCase) => {
  const heywoodCaseInCommunalities = checkForHeywoodCaseInCommunalities(
    communalityArray,
    respondentNames
  );

  factorState.heywoodAdjustedMatrix =
    heywoodCaseInCommunalities.communalityArray;

  const heywoodParticipantsTextArray =
    heywoodCaseInCommunalities.heywoodParticipantsTextArray;

  factorState.heywoodParticipantsTextJoin = heywoodParticipantsTextArray.join(
    ", "
  );

  const heywoodParticipants =
    heywoodCaseInCommunalities.heywoodParticipantsArray || [];

  // if heywood present, update state
  if (heywoodParticipants.length > 0) {
    factorState.showHeywoodCaseNotifications = true;

    factorState.heywoodParticipantsArray =
      heywoodCaseInCommunalities.heywoodParticipantsArray;

    factorState.heywoodParticipantsCommunalityArray =
      heywoodCaseInCommunalities.heywoodParticipantsCommunalityArray;

    factorState.showUnrotatedFactorTable = false;
    factorState.showEigenvaluesTable = false;
    factorState.showScreePlot = false;
    factorState.showKeepFacForRotButton = false;
    appState.isFactorsButtonGreen = false;
    rotationState.showKeepFacForRotButton = false;
  } else {
    factorState.showUnrotatedFactorTable = true;
    factorState.showEigenvaluesTable = true;
    factorState.showScreePlot = true;
    factorState.showKeepFacForRotButton = true;
    appState.isFactorsButtonGreen = true;
    rotationState.showKeepFacForRotButton = true;
  }
};

export default doHeywoodCheck;
