import styled from 'styled-components';
import TraditionalCentroidButton from './factorSelection/TraditionalCentroidButton';
import Horst55CentroidModal from './factorSelection/Horst55CentroidModal';
// import TuckerMacCallumButton from "./factorSelection/TuckerMacCallumCentroidButton";
import factorState from '../GlobalState/factorState';

const TypeOfCentroidTransitionContainer = () => {
  const showCentroidSelection = factorState.getState().showCentroidSelection;
  if (showCentroidSelection) {
    return (
      <TypeOfAnalysisTransitionContainerDiv>
        <TraditionalCentroidButton />
        {/* <TuckerMacCallumButton /> */}
        <Horst55CentroidModal />
      </TypeOfAnalysisTransitionContainerDiv>
    );
  } else {
    return null;
  }
};

export default TypeOfCentroidTransitionContainer;

const TypeOfAnalysisTransitionContainerDiv = styled.div`
  display: flex;
  margin-top: 25px;
  width: 800px;
  justify-content: flex-start;
`;
