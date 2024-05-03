import React from "react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";

import factorState from "../../GlobalState/factorState";
import getFactorState from "../../GlobalState/getFactorState";

const styles = {
  // marginRight: 100,
};

// getState
const isActive = getFactorState("activeCentroidRevealButton");

/*

not in use


*/

const CentroidSelectButton = () => (
  <div>
    <StyledWrapper>
      <Button
        id="centroidSelectButton"
        size={"big"}
        toggle
        className={"wrapper1"}
        active={isActive}
        style={styles}
      >
        Centroid Factors 2
      </Button>
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

// const StyledButton1 = styled.button`
//   display: grid;
//   align-self: "flexStart";
//   align-items: center;
//   justify-items: center;
//   background-color: #d6dbe0;
//   height: 40px;
//   width: 200px;
//   border: 1px solid black;
//   text-align: center;
//   font-size: 16px;
//   font-family: Helvetica, sans-serif;
//   font-weight: normal;
//   border-radius: 4px;
//   margin-right: 3px;
//   margin-bottom: 3px;
//   box-shadow: 0 2px 2px 0 black;
//   outline: none;

//   &:hover {
//     font-weight: 900;
//   }

//   &:active {
//     box-shadow: 0 0 1px 0 black inset;
//     margin-left: 3px;
//   }
// `;
