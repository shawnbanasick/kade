import React from 'react';
import styled from 'styled-components';
import factorState from '../../GlobalState/factorState';
import GeneralButton from '../../../Utils/GeneralButton';

// getState
const isActive = factorState((state) => state.activeCentroidRevealButton);
const CentroidSelectButton = () => (
  <div>
    <StyledWrapper>
      <GeneralButton
        id="centroidSelectButton"
        size={'big'}
        toggle
        className={'wrapper1'}
        active={isActive}
      >
        Centroid Factors 2
      </GeneralButton>
    </StyledWrapper>
  </div>
);

export default CentroidSelectButton;

const StyledWrapper = styled.div`
  .wrapper1 {
    box-shadow: 0 2px 2px 0 black;

    &:hover {
      box-shadow: 0 2px 2px 0 black;
    }

    &:active {
      box-shadow: 0 1px 1px 0 black;
      margin-left: 3px;
      transform: translateY(1px);
    }
  }
`;
