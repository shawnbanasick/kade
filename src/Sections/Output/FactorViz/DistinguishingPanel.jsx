import styled from "styled-components";
import React, { Component } from "react";
import { view, store } from "react-easy-state";
import { Form, Radio } from "semantic-ui-react";
import state from "../../../store";
import UserTextInput from "./UserTextInput";
import ColorSelector from "./ColorSelector2";
import UserSelectionSwitch from "./UserSelectionSwitch";

const styles = {
  // marginLeft: 10,
  // marginTop: 8,
  width: 150
  // marginBottom: 1,
  // height: 15
};

const styles2 = {
  display: "flex",
  marginTop: 20,
  marginRight: 5,
  fontSize: 20
};

const localStore = store({ showDistinguishingAs: "symbol" });

function handleChange(e, { value }) {
  const factorVizOptionsHolder = state.getState("factorVizOptionsHolder");
  localStore.showDistinguishingAs = value;
  factorVizOptionsHolder.showDistinguishingAs = value;
  state.setState({
    factorVizOptionsHolder,
    updateFactorVisualizationsButtonColor: "orange"
  });
}

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
            13. Indicate distinguishing?
          </OptionStatementText>
          <UserSelectionSwitch
            name="willIndicateDistinguishing"
            value="willIndicateDistinguishing"
            toggle
          />
          <HolderDiv>
            <Form style={styles2}>
              <Form.Field>with</Form.Field>
              <Form.Field>
                <Radio
                  style={{ marginLeft: 16, fontSize: 20 }}
                  label="Symbol"
                  name="radioGroup1"
                  value="symbol"
                  checked={localStore.showDistinguishingAs === "symbol"}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  style={{ marginLeft: 16, fontSize: 20 }}
                  label="Color - 05:"
                  name="radioGroup1"
                  value="distinguishingColor"
                  checked={
                    localStore.showDistinguishingAs === "distinguishingColor"
                  }
                  onChange={handleChange}
                />
              </Form.Field>
            </Form>
          </HolderDiv>
          <ColorSelector
            id="distinguishingIndicator05"
            style={{ marginLeft: 5 }}
            defaultColor={"#ededed"}
          />
          <OptionStatementText style={{ marginLeft: 5, marginRight: 5 }}>
            01:
          </OptionStatementText>
          <ColorSelector
            id="distinguishingIndicator01"
            style={{ marginLeft: 5 }}
            defaultColor={"#bdbdbd"}
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
          <ColorSelector id="consensusIndicator" defaultColor={"#d9effe"} />
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

const HolderDiv = styled.div`
  label {
    padding-left: 18px !important;
    padding-top: 3px;
  }
`;
// import styled from "styled-components";
