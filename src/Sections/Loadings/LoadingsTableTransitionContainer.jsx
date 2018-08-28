import React, { Component } from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import store from "../../store";
import LoadingsTable from "./LoadingsTable/LoadingsTable";

class LoadingsTableTransitionContainer extends Component {
  render() {
    const showLoadingsTable = store.getState("showLoadingsTable");
    if (showLoadingsTable) {
      return (
        <div>
          <LoadingsTable />
        </div>
        );
    }
    return (
      <DefaultMessage>No loadings calculated.</DefaultMessage>
    )

  }
}

export default view(LoadingsTableTransitionContainer);

const DefaultMessage = styled.div`
  height: 150px;
  margin-top: 50px;
  font-size: 22px;
`;