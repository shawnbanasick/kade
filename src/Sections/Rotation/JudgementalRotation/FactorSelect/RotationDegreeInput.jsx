import { view } from "react-easy-state";
import styled from "styled-components";
import React from "react";

class RotationDegreeInput extends React.Component {
    constructor() {
        super();
        this.saveInputValueToState = this.saveInputValueToState.bind(this);
    }

    saveInputValueToState(event) {
        this.props.onChangeCallback(event);
    }

    render() {
        return (
            <InputColumn buttonColor={ this.props.buttonColor } pressed={this.props.pressed}>
              <StyledInput type="text" name={ this.props.name } onChange={ this.saveInputValueToState } value={ this.props.value } />
            </InputColumn>
            );
    }
}

export default view(RotationDegreeInput);

// 0 2px 2px 0 black
const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  font-size: 18px;
  width: 55px;
  height: 40px;
  border: 1px solid darkgray;
  background-color: ${props => props.buttonColor};
  padding-right: 1px;
  box-shadow: ${props => props.pressed ? "0 0 1px 0 black inset" : "0 2px 2px 0 black"};
  border: 1px solid black;
`;

const StyledInput = styled.input`
  width: 40px;
  text-align: right;
  margin: 6px;
  outline: none;
`;

// const StyledLabel = styled.label`
//   margin-left: 4px;
//   text-align: center;
//   padding-right: 1px;
// `;
