import React from "react";
import state from "../../../store";
import Dropdown from "../../../Utils/Dropdown";
import styled from "styled-components";
import CallCentroidFactorButton from "./CallCentroidFactorButton";

const options = [1, 2, 3, 4, 5, 6, 7, 8];

class DropdownMultipleSelection extends React.Component {
  handleMessage(jsonIdSelection) {
    state.setState({
      numCentroidFactors: jsonIdSelection
    });
    console.log(jsonIdSelection);
    // displayJsonData(jsonIdSelection);
  }
  render() {
    return (
      <CentroidSelectDiv>
        <span style={{ marginRight: 10 }}>Extract</span>
        <Dropdown
          id="centroidSelectDropdown"
          onChangeMessageUpTree={this.handleMessage}
          textValue={"? \u25BC"}
          options={options}
          width="38px"
        />
        <CallCentroidFactorButton />
      </CentroidSelectDiv>
    );
  }
}
export default DropdownMultipleSelection;

const CentroidSelectDiv = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  font-size: 20px;
`;

