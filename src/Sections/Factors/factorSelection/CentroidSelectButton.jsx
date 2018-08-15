import React from "react";
import store from "../../store";
import { Button } from "semantic-ui-react";

const styles = {
  // marginRight: 100,
  alignSelf: "flexStart",
  backgroundColor: "#49769c !important"
};

let isActive = store.getState("activeCentroidFactorsButton");

const CentroidSelectButton = () => (
  <div>
    <Button id="centroidSelectButton" className="instagram" size={ "big" } toggle active={ isActive } style={ styles }>
      Centroid Factors
    </Button>
  </div>
);

export default CentroidSelectButton;
