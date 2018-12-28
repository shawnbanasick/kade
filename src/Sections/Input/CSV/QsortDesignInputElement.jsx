import { view, store } from "react-easy-state";
import styled from "styled-components";
import React from "react";
import state from "../../../store";
import InputDiv from "./InputDiv";
import convertQsortObjectToArray from "./convertQsortObjectToArray";

const localStore = store({
  qSortPatternObject: {},
  "activeValue-6": "",
  "activeValue-5": "",
  "activeValue-4": "",
  "activeValue-3": "",
  "activeValue-2": "",
  "activeValue-1": "",
  activeValue0: "",
  activeValue1: "",
  activeValue2: "",
  activeValue3: "",
  activeValue4: "",
  activeValue5: "",
  activeValue6: "",
  activeValue7: "",
  activeValue8: "",
  activeValue9: "",
  activeValue10: "",
  activeValue11: "",
  activeValue12: "",
  activeValue13: "",
  inputTitle: "Enter the Number of Statements in Each Column",
  inputColor: "white"
});

class QsortDesignInputElement extends React.Component {
  calcQsortDesign(event) {
    localStore[`activeValue${event.target.name}`] = event.target.value;
    const qSortPatternObject = localStore.qSortPatternObject;
    qSortPatternObject[event.target.name] = event.target.value;
    localStore.qSortPatternObject = qSortPatternObject;
    const qSortPattern = convertQsortObjectToArray(qSortPatternObject);
    const enteredStatements = qSortPattern.length;
    const difference = localStore.statementsLength - enteredStatements;

    if (difference === 0) {
      localStore.inputTitle = "All Statements Allocated";
      localStore.inputColor = "rgba(144,	238,	144, .6)";
    }
    if (difference > 0) {
      localStore.inputTitle = `${difference} Statements Left`;
      localStore.inputColor = "white";
    }
    if (difference < 0) {
      localStore.inputTitle = `Over-Allocated: ${-difference}`;
      localStore.inputColor = "lightpink";
    }
    state.setState({ qSortPattern });
  }

  render() {
    const statementsLength = state.getState("statements").length;
    localStore.statementsLength = statementsLength;
    const showForcedInput = state.getState("showForcedInput");
    if (showForcedInput) {
      return (
        <DesignDiv>
          <TitleDiv>
            <TextDiv inputColor={localStore.inputColor}>Q sort Design:</TextDiv>
            {statementsLength ? (
              <TextDiv2>{localStore.inputTitle}</TextDiv2>
            ) : (
              <TextDiv2>No Statements Loaded</TextDiv2>
            )}
          </TitleDiv>
          <InputRow>
            <InputDiv
              label={"-6"}
              name={-6}
              value={localStore["activeValue-6"]}
              onChangeCallback={this.calcQsortDesign}
            />
            <InputDiv
              label={"-5"}
              name={-5}
              value={localStore["activeValue-5"]}
              onChangeCallback={this.calcQsortDesign}
            />
            <InputDiv
              label={"-4"}
              name={-4}
              onChangeCallback={this.calcQsortDesign}
              value={localStore["activeValue-4"]}
            />
            <InputDiv
              label={"-3"}
              name={-3}
              onChangeCallback={this.calcQsortDesign}
              value={localStore["activeValue-3"]}
            />
            <InputDiv
              label={"-2"}
              name={-2}
              onChangeCallback={this.calcQsortDesign}
              value={localStore["activeValue-2"]}
            />
            <InputDiv
              label={"-1"}
              name={-1}
              onChangeCallback={this.calcQsortDesign}
              value={localStore["activeValue-1"]}
            />
            <InputDiv
              label={"0"}
              name={0}
              onChangeCallback={this.calcQsortDesign}
              value={localStore.activeValue0}
            />
            <InputDiv
              label={"1"}
              name={1}
              onChangeCallback={this.calcQsortDesign}
              value={localStore.activeValue1}
            />
            <InputDiv
              label={"2"}
              name={2}
              onChangeCallback={this.calcQsortDesign}
              value={localStore.activeValue2}
            />
            <InputDiv
              label={"3"}
              name={3}
              onChangeCallback={this.calcQsortDesign}
              value={localStore.activeValue3}
            />
            <InputDiv
              label={"4"}
              name={4}
              onChangeCallback={this.calcQsortDesign}
              value={localStore.activeValue4}
            />
            <InputDiv
              label={"5"}
              name={5}
              onChangeCallback={this.calcQsortDesign}
              value={localStore.activeValue5}
            />
            <InputDiv
              label={"6"}
              name={6}
              onChangeCallback={this.calcQsortDesign}
              value={localStore.activeValue6}
            />
            <InputDiv
              label={"7"}
              name={7}
              onChangeCallback={this.calcQsortDesign}
              value={localStore.activeValue7}
            />
            <InputDiv
              label={"8"}
              name={8}
              onChangeCallback={this.calcQsortDesign}
              value={localStore.activeValue8}
            />
            <InputDiv
              label={"9"}
              name={9}
              onChangeCallback={this.calcQsortDesign}
              value={localStore.activeValue9}
            />
            <InputDiv
              label={"10"}
              name={10}
              onChangeCallback={this.calcQsortDesign}
              value={localStore.activeValue10}
            />
            <InputDiv
              label={"11"}
              name={11}
              onChangeCallback={this.calcQsortDesign}
              value={localStore.activeValue11}
            />
            <InputDiv
              label={"12"}
              name={12}
              onChangeCallback={this.calcQsortDesign}
              value={localStore.activeValue12}
            />
            <InputDiv
              label={"13"}
              name={13}
              onChangeCallback={this.calcQsortDesign}
              value={localStore.activeValue13}
            />
          </InputRow>
        </DesignDiv>
      );
    }
    return <div />;
  }
}

export default view(QsortDesignInputElement);

const InputRow = styled.div`
  display: flex;
`;

const DesignDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextDiv = styled.div`
  background-color: ${props => props.inputColor};
  font-size: 20px;
  margin-bottom: 5px;
  width: 140px;
  padding-top: 4px;
  padding-left: 4px;
  height: 25px;
`;

const TextDiv2 = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
  padding-top: 4px;
  padding-left: 4px;
  width: 700px;
  height: 25px;
  margin-left: 15px;
`;

const TitleDiv = styled.div`
  display: flex;
  width: 850px;
`;
