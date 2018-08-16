import React from "react";
import store from "../../store";
import { Button } from "semantic-ui-react";
import { view } from "react-easy-state";
import { default as pcaDispatch } from "../PcaLogic/pcaDispatch";

const style = {
  // marginLeft: 30,
  // marginTop: 12
};

class PCAButton extends React.Component {
  handleClick() {
    store.setState({
      calculatingPca: true,
      activePcaButton: true,
      disabledCentroidFactorButton: true,
      disabledPcaButton: true,
      showKeepFacForRotButton: true
    });
    // to allow time for the spinner to display
    setTimeout(() => {
      pcaDispatch();
    }, 10);
  }

  render() {
    const isActive = store.getState("activePcaButton");
    const isDisabled = store.getState("disabledPcaButton");
    const isCalculating = store.getState("calculatingPca");
    const pcaButtonText = store.getState("pcaButtonText");
    return (
      <div>
        <Button
          id="extractPrinCompButton"
          className="instagram"
          size={"big"}
          toggle
          active={isActive}
          loading={isCalculating}
          disabled={isDisabled}
          onClick={this.handleClick}
          style={style}
        >
          {pcaButtonText}
        </Button>
      </div>
    );
  }
}
export default view(PCAButton);
