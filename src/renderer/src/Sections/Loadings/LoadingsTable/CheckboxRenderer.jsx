import React from 'react';
// import { Checkbox } from "semantic-ui-react";
// import outputState from "../../GlobalState/outputState";
// import loadingState from "../../GlobalState/loadingState";
import styled from 'styled-components';

class CheckboxRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange(event) {
    this.props.data[this.props.colDef.field] = !this.props.data[this.props.colDef.field];
    this.setState({
      value: this.props.data[this.props.colDef.field],
    });
  }

  render() {
    return (
      <Holder>
        <StyledInput
          type="checkbox"
          checked={this.state.value}
          onChange={this.handleCheckboxChange}
        />
      </Holder>
    );
  }
}

export default CheckboxRenderer;

const StyledInput = styled.input`
  transform: scale(1.2, 1.2);
`;

const Holder = styled.div`
  height: 20px;
  padding-top: 1px;
`;
