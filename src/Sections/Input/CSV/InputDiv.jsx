import { view } from "react-easy-state";
import styled from "styled-components";
import React from "react";

class InputDiv extends React.Component {
  constructor() {
    super();
    this.saveInputValueToState = this.saveInputValueToState.bind(this);
  }

  saveInputValueToState(event) {
    this.props.onChangeCallback(event);
  }

  render() {
    return (
      <InputColumn>
        <StyledLabel>{this.props.label}</StyledLabel>
        <StyledInput
          type="text"
          name={this.props.name}
          onChange={this.saveInputValueToState}
          value={this.props.value}
        />
      </InputColumn>
    );
  }
}

export default view(InputDiv);

const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  width: 35px;
  height: 50px;
  border: 1px solid darkgray;
  background-color: #d6dbe0;
  padding-right: 1px;
`;

const StyledInput = styled.input`
  width: 26px;
  text-align: right;
  margin-left: 2px;
`;

const StyledLabel = styled.label`
  margin-left: 4px;
  text-align: center;
  padding-right: 1px;
`;
