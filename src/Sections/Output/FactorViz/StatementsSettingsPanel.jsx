import styled from "styled-components";
import { view } from "react-easy-state";
import React, { Component } from "react";
import UserTextInput from "./UserTextInput";
import UserSelectionSwitch from "./UserSelectionSwitch";

const styles = {
  width: 150
};

class StatementsSettingsPanel extends Component {
  render() {
    return (
      <div style={{ marginTop: 40 }}>
        <span style={{ fontSize: 32 }}>Statements</span>
        <hr style={{ width: "100%", marginBottom: 15 }} />
        <OptionStatementRow>
          <OptionStatementText>8. Adjust line spacing?</OptionStatementText>
          <UserSelectionSwitch
            name="willAdjustLineSpacing"
            value="willAdjustLineSpacing"
            toggle={false}
          />
          <div style={styles}>
            <UserTextInput
              name={"willAdjustLineSpacingBy"}
              placeholder={"1.4"}
              width={8}
            />
          </div>
        </OptionStatementRow>
        <OptionStatementRow>
          <OptionStatementText>
            9. Limit number of lines to prevent overflow?
          </OptionStatementText>
          <UserSelectionSwitch
            name="willTrimStatement"
            value="willTrimStatement"
            toggle
          />
          <OptionStatementText>max. number lines =</OptionStatementText>
          <div style={styles}>
            <UserTextInput
              name={"willTrimStatementBy"}
              placeholder={"5"}
              width={6}
            />
          </div>
        </OptionStatementRow>
        <OptionStatementRow>
          <OptionStatementText>10. Adjust statement width?</OptionStatementText>
          <UserSelectionSwitch
            name="willAdjustStatementWidth"
            value="willAdjustStatementWidth"
            toggle={false}
          />
          <div style={styles}>
            <UserTextInput
              name={"willAdjustStatementWidthBy"}
              placeholder={"15"}
              width={8}
            />
          </div>
        </OptionStatementRow>
        <OptionStatementRow>
          <OptionStatementText>
            11. (Asian languages only) Adjust width of statement rows?
          </OptionStatementText>
          <UserSelectionSwitch
            name="willAdjustWidthAsian"
            value="willAdjustWidthAsian"
            toggle={false}
          />
          <div style={styles}>
            <UserTextInput
              name={"willAdjustWidthAsianBy"}
              placeholder={"12"}
              width={8}
            />
          </div>
        </OptionStatementRow>
      </div>
    );
  }
}

export default view(StatementsSettingsPanel);

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
