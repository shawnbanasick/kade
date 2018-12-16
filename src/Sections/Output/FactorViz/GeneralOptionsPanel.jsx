import styled from "styled-components";
import { view } from "react-easy-state";
import React, { Component } from "react";
import UserTextInput from "./UserTextInput";
import UserSelectionSwitch from "./UserSelectionSwitch";


const styles = {
  fontSize: 32
};

class GeneralOptionsPanel extends Component {
  render() {
    return (
      <div>
        <span style={styles}>General</span>
        <hr style={{ width: "100%", marginBottom: 15 }} />
        <OptionStatementRow>
          <OptionStatementText>1. Include legend with image?</OptionStatementText>
          <UserSelectionSwitch
            name="willIncludeLegend"
            value="willIncludeLegend"
            toggle
          />
        </OptionStatementRow>
        <OptionStatementRow>
          <OptionStatementText>2. Prepend statement numbers?</OptionStatementText>
          <UserSelectionSwitch
            name="willPrependStateNums"
            value="willPrependStateNums"
            toggle={false}
          />
        </OptionStatementRow>
        <OptionStatementRow>
          <OptionStatementText>3. Display only statement numbers?</OptionStatementText>
          <UserSelectionSwitch
            name="willDisplayOnlyStateNums"
            value="willDisplayOnlyStateNums"
            toggle={false}
          />
        </OptionStatementRow>
        <OptionStatementRow>
          <OptionStatementText>
            4. Add custom names to factor images?
          </OptionStatementText>
          <UserSelectionSwitch
            name="willAddCustomNames"
            value="willAddCustomNames"
            toggle={false}
          />
        </OptionStatementRow>
        <div style={{ marginTop: 10 }}>
          <UserTextInput
            name={"customFactorNames"}
            label="names"
            placeholder={"Input custom factor names separated by commas"}
            width={15}
          />
        </div>
      </div>
    );
  }
}

export default view(GeneralOptionsPanel);



const OptionStatementRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding-left:10px;
`;

const OptionStatementText = styled.div`
  font-size: 20px;
`;

// import styled from "styled-components";
