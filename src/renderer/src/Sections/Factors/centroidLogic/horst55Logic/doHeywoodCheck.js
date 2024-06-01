import factorState from '../../../GlobalState/factorState';
import appState from '../../../GlobalState/appState';
import rotationState from '../../../GlobalState/rotationState';
import checkForHeywoodCaseInCommunalities from './checkForHeywoodCommunalities';

const doHeywoodCheck = (communalityArray, respondentNames, hasHeywoodCase) => {
  const heywoodCaseInCommunalities = checkForHeywoodCaseInCommunalities(
    communalityArray,
    respondentNames
  );

  factorState.setState({ heywoodAdjustedMatrix: heywoodCaseInCommunalities.communalityArray });

  const heywoodParticipantsTextArray = heywoodCaseInCommunalities.heywoodParticipantsTextArray;

  factorState.setState({ heywoodParticipantsTextJoin: heywoodParticipantsTextArray.join(', ') });

  const heywoodParticipants = heywoodCaseInCommunalities.heywoodParticipantsArray || [];

  // if heywood present, update state
  if (heywoodParticipants.length > 0) {
    factorState.setState({ showHeywoodCaseNotifications: true });

    factorState.setState({
      heywoodParticipantsArray: heywoodCaseInCommunalities.heywoodParticipantsArray,
    });

    factorState.setState({
      heywoodParticipantsCommunalityArray:
        heywoodCaseInCommunalities.heywoodParticipantsCommunalityArray,
    });

    factorState.setState({ showUnrotatedFactorTable: false });
    factorState.setState({ showEigenvaluesTable: false });
    factorState.setState({ showScreePlot: false });
    factorState.setState({ showKeepFacForRotButton: false });
    appState.setState({ isFactorsButtonGreen: false });
    rotationState.setState({ showKeepFacForRotButton: false });
  } else {
    factorState.setState({ showUnrotatedFactorTable: true });
    factorState.setState({ showEigenvaluesTable: true });
    factorState.setState({ showScreePlot: true });
    factorState.setState({ showKeepFacForRotButton: true });
    appState.setState({ isFactorsButtonGreen: true });
    rotationState.setState({ showKeepFacForRotButton: true });
  }
};

export default doHeywoodCheck;
