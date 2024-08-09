import { useState } from 'react';
import styled from 'styled-components';
import UserNumberInputStructure from './userNumberInputStructure';
import refreshViz from './refreshViz';
import structureState from '../GlobalState/structureState';
// import structureDispatch from './structureDispatch';
// import GeneralButton from '../../Utils/GeneralButton';
// import structureState from '../GlobalState/structureState';

const ControlPanel = () => {
  const [selectedValue, setSelectedValue] = useState('variance');
  const refreshVizButtonColor = structureState((state) => state.refreshVizButtonColor);
  const updateRefreshVizButtonColor = structureState((state) => state.updateRefreshVizButtonColor);

  const handleRefresh = () => {
    refreshViz();
    updateRefreshVizButtonColor(
      getComputedStyle(document.documentElement).getPropertyValue('--main-theme-color')
    );
    // structureDispatch();
  };

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <Panel>
      <PanelRow>
        <Message>
          Individual links and boxes can be deleted by left clicking on them with your mouse and
          then pressing the &quot;Backspace&quot; key.
        </Message>
      </PanelRow>
      <PanelRow>
        <LineDispDiv>
          <LabelSpan>Line Display Cutoff:</LabelSpan>
          <UserNumberInputStructure
            name={'adjustEdgeCutoffTo'}
            step="0.01"
            lowerLimit={0.01}
            upperLimit={1.0}
            value={0.3}
          />
        </LineDispDiv>
        <MainButton height={20}>Display Number of Autoflagged Q Sorts</MainButton>
        <MainButton height={20}>Download PNG Image</MainButton>
      </PanelRow>
      <StylesContainer>
        <RadioGroup>
          <span>Box Width:</span>
          <RadioButton>
            <input
              type="radio"
              id="variance"
              value="variance"
              checked={selectedValue === 'variance'}
              onChange={() => handleRadioChange('variance')}
            />
            <RadioLabel htmlFor="variance">Explained Variance</RadioLabel>
          </RadioButton>

          <RadioButton>
            <input
              type="radio"
              id="constant"
              value="constant"
              checked={selectedValue === 'constant'}
              onChange={() => handleRadioChange('constant')}
            />
            <RadioLabel htmlFor="constant">Constant</RadioLabel>
          </RadioButton>
        </RadioGroup>
      </StylesContainer>
      <PanelRow>
        <LineDispDiv2>
          <LabelSpan>Adjust Vertical Spacing:</LabelSpan>
          <UserNumberInputStructure
            name={'adjustVerticalSpacing'}
            step="0.01"
            lowerLimit={0.01}
            upperLimit={1.0}
            value={0.4}
            width={150}
          />
        </LineDispDiv2>
        <MainButton
          height={20}
          width={800}
          onClick={handleRefresh}
          $buttonColor={refreshVizButtonColor}
        >
          Refresh Visualization
        </MainButton>
        <MainButton height={20} width={800}>
          Download SVG Image
        </MainButton>
      </PanelRow>
    </Panel>
  );
};

export default ControlPanel;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 100%;
  border-bottom: 1.5px solid black;
  background-color: white;
  padding-bottom: 10px;
`;

const PanelRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin-top: 10px;
  span {
    font-size: 16px;
    margin-right: 5px;
  }
`;

const LabelSpan = styled.span`
  font-size: 16px;
  margin-right: 5px;
  width: 300px;
`;

const LineDispDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 230px;
`;

const LineDispDiv2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 255px;
`;

const MainButton = styled.button`
  display: grid;
  align-items: center;
  justify-items: center;
  box-shadow: none;
  min-height: 20px;
  height: ${(props) => props.height || 'auto'};
  width: ${(props) => props.width || 'auto'};
  text-align: center;
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  font-weight: normal;
  border: none;
  border-radius: 4px;
  margin-right: 3px;
  margin-bottom: 3px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  background-color: ${(props) => props.$buttonColor};
  text-decoration: none;
  color: black;
  transition: all 0.5s ease;
  /* transition: background-color 0.5s ease; */
  transition-duration: 0.3s;
  transition-property: box-shadow;
  transform: translateZ(0);
  box-shadow:
    inset 0 0 0 4px ${(props) => (props.$isActive ? 'var(--main-theme-color)' : '#d6dbe0')},
    0 0 1px 0.6;
  /* background-color: ${(props) => (props.$isActive ? 'var(--main-theme-color)' : '#d6dbe0')}; */

  box-shadow: ${(props) =>
    props.$isActive
      ? 'inset 0 0 0 2px #666, 0 0 1px transparent'
      : 'inset 0 0 0 0px #666, 0 0 0px transparent'};

  &:hover {
    box-shadow:
      inset 0 0 0 4px #666,
      0 0 1px transparent;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.7;
  }
`;

const StylesContainer = styled.div`
  display: flex;
  flex: 1;
  margin-top: 10px;
  justify-content: 'center';
  align-items: 'center';
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  align-items: center;
  justify-content: space-around;
  border-radius: 8px;
  background-color: 'white';
  box-shadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)';

  span {
    margin-right: 0px;
  }
`;

const RadioButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin-left: 10px;
`;

const RadioLabel = styled.label`
  display: flex;
  margin-left: 8px;
  color: '#333';
`;

const Message = styled.span`
  font-size: 16px;
  width: 1000px;
`;
