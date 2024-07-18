import React from 'react';
import styled from 'styled-components';

class CheckboxRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange() {
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

/*
import { useState } from 'react';
import styled from 'styled-components';

const CheckboxRenderer = (props) => {
  const [state, setState] = useState({ value: props.value });

  const handleCheckboxChange = () => {
    console.log('clicked');
    props.data[props.colDef.field] = !props.data[props.colDef.field];
    setState({ value: props.data[props.colDef.field] });
  };

  return (
    <Holder>
      <StyledInput type="checkbox" checked={state.value} onChange={handleCheckboxChange} />
    </Holder>
  );
};

export default CheckboxRenderer;

const StyledInput = styled.input`
  transform: scale(1.2, 1.2);
`;

const Holder = styled.div`
  height: 20px;
  padding-top: 1px;
`;
*/
