import React from "react";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import store from "../../../store";

const styles = {
  // marginRight: 100,
  alignSelf: "flexStart",
  backgroundColor: "#49769c !important"
};

const isActive = store.getState("activeCentroidFactorsButton");

const CentroidSelectButton = () => (
  <div>
    <StyledWrapper>
      <Button
        id="centroidSelectButton"
        className="wrapper1"
        size={"big"}
        toggle
        active={isActive}
        style={styles}
      >
        Centroid Factors
      </Button>
    </StyledWrapper>
  </div>
);

export default CentroidSelectButton;

const StyledWrapper = styled.div`
  .wrapper1 {
    border: 1px solid black;
    box-shadow: 0 2px 2px 0 black;

    &:hover {
      border: 1px solid black;
      box-shadow: 0 2px 2px 0 black;
    }

    &:active {
      box-shadow: 0 0 1px 0 black inset;
      margin-left: 3px;
      margin-top: 3px;
    }
  }
`;
