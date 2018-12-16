import styled from "styled-components";
import { view } from "react-easy-state";
import React, { Component } from "react";
import UserTextInput from "./UserTextInput";
import UserSelectionSwitch from "./UserSelectionSwitch";

const styles = {
  width: 150
};

class CardSettingsPanel extends Component {
  render() {
    return (
      <div style={{ marginTop: 40 }}>
        <span style={{ fontSize: 32 }}>Cards</span>
        <hr style={{ width: "100%", marginBottom: 15 }} />
        <OptionStatementRow>
          <OptionStatementText>5. Adjust card height?</OptionStatementText>
          <UserSelectionSwitch
            name="willAdjustCardHeight"
            value="willAdjustCardHeight"
            toggle={false}
          />
          <div style={styles}>
            <UserTextInput
              name={"willAdjustCardHeightBy"}
              placeholder={"110"}
              width={8}
            />
          </div>
        </OptionStatementRow>
        <OptionStatementRow>
          <OptionStatementText>6. Adjust card width?</OptionStatementText>
          <UserSelectionSwitch
            name="willAdjustCardWidth"
            value="willAdjustCardWidth"
            toggle={false}
          />
          <div style={styles}>
            <UserTextInput
              name={"willAdjustCardWidthBy"}
              placeholder={"110"}
              width={8}
            />
          </div>
        </OptionStatementRow>
        <OptionStatementRow>
          <OptionStatementText>7. Adjust font size?</OptionStatementText>
          <UserSelectionSwitch
            name="willAdjustCardFontSize"
            value="willAdjustCardFontSize"
            toggle={false}
          />
          <div style={styles}>
            <UserTextInput
              name={"willAdjustCardFontSizeBy"}
              placeholder={"13"}
              width={8}
            />
          </div>
        </OptionStatementRow>
      </div>
    );
  }
}

export default view(CardSettingsPanel);

const OptionStatementRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding-left: 10px;
`;

const OptionStatementText = styled.div`
  font-size: 20px;
`;

// import styled from "styled-components";
