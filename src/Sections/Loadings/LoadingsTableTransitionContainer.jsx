import React, { Component } from "react";
import { Transition } from "semantic-ui-react";
import { view } from "react-easy-state";
import store from "../../store";
import LoadingsTable from "./LoadingsTable/LoadingsTable";

class LoadingsTableTransitionContainer extends Component {
  render() {
    const showLoadingsTable = store.getState("showLoadingsTable");
    return (
      <Transition visible={showLoadingsTable} animation="fade" duration={1000}>
        <div>
          <LoadingsTable />
        </div>
      </Transition>
    );
  }
}

export default view(LoadingsTableTransitionContainer);
