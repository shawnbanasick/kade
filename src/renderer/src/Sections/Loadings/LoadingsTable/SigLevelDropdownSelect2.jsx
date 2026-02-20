import loadingState from '../../GlobalState/loadingState';

const SigLevelDropdownSelect2 = () => {
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
    updateAutoflagButtonColor('bg-[orange]');
  };

  return (
    <select
      onChange={handleChange}
      value={loadingSigDropdownValue}
      className="text-[16px] h-[30px] w-[125px] pl-[15px] bg-grey-button rounded"
    >
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
    </select>
  );
};

export default SigLevelDropdownSelect2;
