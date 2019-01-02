import React, { Component } from "react";
import { view } from "react-easy-state";
import { Transition } from "semantic-ui-react";
import DownloadsPanel from "./DownloadsPanel";
import state from "../../../store";
import CardSettingsPanel from "./CardSettingsPanel";
import DistinguishingPanel from "./DistinguishingPanel";
import GeneralOptionsPanel from "./GeneralOptionsPanel";
import StatementsSettingsPanel from "./StatementsSettingsPanel";

const styles = {
  width: "90%",
  maxWidth: 1200,
  height: 1500,
  border: "2px solid #666",
  padding: 30
};

class FactorVizOptions extends Component {
  render() {
    const shouldDisplayFactorVizOptions = state.getState(
      "shouldDisplayFactorVizOptions"
    );
    return (
      <Transition
        visible={shouldDisplayFactorVizOptions}
        animation="fade"
        duration={1000}
      >
        <div style={styles} className="FactorVizDiv">
          <GeneralOptionsPanel />
          <CardSettingsPanel />
          <StatementsSettingsPanel />
          <DistinguishingPanel />
          <DownloadsPanel />
        </div>
      </Transition>
    );
  }
}

export default view(FactorVizOptions);
