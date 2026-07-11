import React, { useState } from 'react';
import outputState from '../../GlobalState/outputState';
import appState from '../../GlobalState/appState';
import loadingState from '../../GlobalState/loadingState';
import resetSection6 from '../../../Utils/resetSection6';

function CheckboxRenderer({ value, data, colDef }) {
  const [checked, setChecked] = useState(value);
  const updateUserSelectedFactors = outputState((state) => state.updateUserSelectedFactors);
  const updateOutputForDataViz2 = outputState((state) => state.updateOutputForDataViz2);
  const updateDisplayOutputTabContent = outputState((state) => state.updateDisplayOutputTabContent);
  const updateHighlightFactor1 = outputState((state) => state.updateHighlightFactor1);
  const updateHighlightFactor2 = outputState((state) => state.updateHighlightFactor2);
  const updateHighlightFactor3 = outputState((state) => state.updateHighlightFactor3);
  const updateHighlightFactor4 = outputState((state) => state.updateHighlightFactor4);
  const updateHighlightFactor5 = outputState((state) => state.updateHighlightFactor5);
  const updateHighlightFactor6 = outputState((state) => state.updateHighlightFactor6);
  const updateHighlightFactor7 = outputState((state) => state.updateHighlightFactor7);
  const updateHighlightFactor8 = outputState((state) => state.updateHighlightFactor8);
  const updateIsOutputButtonGreen = appState((state) => state.updateIsOutputButtonGreen);
  const updateShowTableDataNotSentWarning = outputState(
    (state) => state.updateShowTableDataNotSentWarning
  );
  const updateAutoflagButtonColor = loadingState((state) => state.updateAutoflagButtonColor);

  const handleCheckboxChange = () => {
    const newValue = !data[colDef.field];
    data[colDef.field] = newValue;
    setChecked(newValue);
    resetSection6('output');
    updateUserSelectedFactors([]);
    updateOutputForDataViz2([]);
    updateDisplayOutputTabContent(false);
    updateHighlightFactor1(false);
    updateHighlightFactor2(false);
    updateHighlightFactor3(false);
    updateHighlightFactor4(false);
    updateHighlightFactor5(false);
    updateHighlightFactor6(false);
    updateHighlightFactor7(false);
    updateHighlightFactor8(false);
    updateIsOutputButtonGreen(false);
    updateShowTableDataNotSentWarning(true);
    updateAutoflagButtonColor('bg-grey-button');
  };

  return (
    <div className="h-[20px] pt-px">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className="scale-[1.2] accent-[#83cafe]"
      />
    </div>
  );
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
