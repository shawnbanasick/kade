import React from 'react';

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
      <div className="h-[20px] pt-px">
        <input
          type="checkbox"
          checked={this.state.value}
          onChange={this.handleCheckboxChange}
          className="scale-[1.2] accent-[#83cafe]"
        />
      </div>
    );
  }
}

export default CheckboxRenderer;

/*
import { useState } from 'react';

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
