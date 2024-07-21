import loadingState from '../../GlobalState/loadingState';
import styled from 'styled-components';

const SigLevelDropdownSelect2 = () => {
  //   const { t } = useTranslation();

  const updateUserSelectedSigLevel = loadingState((state) => state.updateUserSelectedSigLevel);
  const updateAutoflagButtonColor = loadingState((state) => state.updateAutoflagButtonColor);
  const loadingSigDropdownValue = loadingState((state) => state.loadingSigDropdownValue);
  const updateLoadingSigDropdownValue = loadingState(
    (state) => state.updateLoadingSigDropdownValue
  );

  const handleChange = (e) => {
    console.log('SigLevelDropdownSelect2 handleChange value:', e.target.value);
    updateLoadingSigDropdownValue(e.target.value);

    updateUserSelectedSigLevel(+e.target.value);
    updateLoadingSigDropdownValue(e.target.value);
    updateAutoflagButtonColor('orange');
  };

  return (
    <DropdownSig onChange={handleChange} value={loadingSigDropdownValue}>
      <option value="3.891">P &lt; 0.0001</option>
      <option value="3.481">P &lt; 0.0005</option>
      <option value="3.291">P &lt; 0.001</option>
      <option value="2.807">P &lt; 0.005</option>
      <option value="2.575">P &lt; 0.01</option>
      <option value="1.96">P &lt; 0.05</option>
      <option value="1.645">P &lt; 0.1</option>
      <option value="1.44">P &lt; 0.15</option>
      <option value="1.28">P &lt; 0.2</option>
      <option value="majority">Maj. Com. Var.</option>
    </DropdownSig>
  );
};

export default SigLevelDropdownSelect2;

const DropdownSig = styled.select`
  font-size: 16px;
  height: 48px;
  width: 125px;
  border: 1px solid #d6dbe0;
  padding-left: 15px;
  background-color: #d6dbe0;
  border-radius: 4px;
`;
