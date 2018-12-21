import React, { Component } from "react";
import { view } from "react-easy-state";
import UserSelectionSwitch from "./UserSelectionSwitch";
import UserTextInput from "./UserTextInput";
import ColorSelector from "./ColorSelector2";
import styled from "styled-components";

const styles = {
  // marginLeft: 10,
  // marginTop: 8,
  width: 150
  // marginBottom: 1,
  // height: 15
};

class DistinguishingPanel extends Component {
  render() {
    return (
      <div style={{ marginTop: 40 }}>
        <span style={{ fontSize: 32 }}>
          Distinguishing and Consensus Statements
        </span>
        <hr style={{ width: "100%", marginBottom: 15 }} />
        <OptionStatementRow>
          <OptionStatementText>
            13. Indicate distinguishing statements?
          </OptionStatementText>
          <UserSelectionSwitch
            name="willIndicateDistinguishing"
            value="willIndicateDistinguishing"
            toggle
          />
        </OptionStatementRow>
        <OptionStatementRow>
          <OptionStatementText>
            -- Adjust distinguishing statement indicator size?
          </OptionStatementText>
          <UserSelectionSwitch
            name="willAdjustDistIndicatorSize"
            value="willAdjustDistIndicatorSize"
            toggle={false}
          />
          <div style={styles}>
            <UserTextInput
              name={"willAdjustDistIndicatorSizeBy"}
              placeholder={"12"}
              width={8}
              styles={{ height: 20 }}
            />
          </div>
        </OptionStatementRow>
        <OptionStatementRow>
          <OptionStatementText>
            14. Display distinguishing statement comparison triangles?
          </OptionStatementText>
          <UserSelectionSwitch
            name="willDisplayDistingCompareSymbols"
            value="willDisplayDistingCompareSymbols"
            toggle
          />
        </OptionStatementRow>
        <OptionStatementRow>
          <OptionStatementText>
            15. Display consensus statement indicator color?
          </OptionStatementText>
          <UserSelectionSwitch
            name="willDisplayConsensusStates"
            value="willDisplayConsensusStates"
            toggle={false}
          />
          <OptionStatementText style={{ marginRight: 10 }}>
            Color:{" "}
          </OptionStatementText>
          <ColorSelector id="consensusIndicator" />
        </OptionStatementRow>
      </div>
    );
  }
}

export default view(DistinguishingPanel);

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
