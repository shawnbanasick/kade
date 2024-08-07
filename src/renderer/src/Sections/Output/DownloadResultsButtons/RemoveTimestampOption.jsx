import { Component } from 'react';
import styled from 'styled-components';
import TimestampSelectionSwitch from '../FactorViz/TimestampSelectionSwitch';

class RemoveTimestampOption extends Component {
  render() {
    return (
      <SwitchDivContainer>
        <div className="switchDiv">
          <div className="switchText" style={{ fontSize: 26, marginBottom: '5px' }}>
            Include timestamp in download name?
          </div>
          <TimestampSelectionSwitch
            name="shouldIncludeTimestamp"
            value="shouldIncludeTimestamp"
            toggle
          />
        </div>
      </SwitchDivContainer>
    );
  }
}

export default RemoveTimestampOption;

const SwitchDivContainer = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  border: 2px solid red;
`;
