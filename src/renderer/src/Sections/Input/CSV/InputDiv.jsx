import coreState from '../../GlobalState/coreState';

const InputDiv = (props) => {
  const multiplierArray = coreState((state) => state.multiplierArray);
  const updateMultiplierArray = coreState((state) => state.updateMultiplierArray);

  const saveInputValueToState = (event) => {
    // Only allow numbers
    const value = event.target.value.replace(/[^0-9]/g, '');
    const name = event.target.name;
    let index = parseInt(name);
    let newMultiplierArray2 = [...multiplierArray];
    newMultiplierArray2[index] = +value;
    updateMultiplierArray(newMultiplierArray2);
  };

  const handleKeyDown = (event) => {
    const currentValue = parseInt(props.value) || 0;
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      let index = parseInt(event.target.name);
      let newMultiplierArray2 = [...multiplierArray];
      newMultiplierArray2[index] = currentValue + 1;
      updateMultiplierArray(newMultiplierArray2);
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      let index = parseInt(event.target.name);
      let newMultiplierArray2 = [...multiplierArray];
      if (currentValue > 0) {
        newMultiplierArray2[index] = currentValue - 1;
      }
      updateMultiplierArray(newMultiplierArray2);
    }
  };

  return (
    <div className="flex flex-col w-10 rounded-lg border border-gray-300 bg-gradient-to-b from-gray-200 to-gray-300 shadow-sm hover:shadow-md transition-shadow duration-200 pl-0.5 pb-2">
      <label className="text-lg font-medium text-gray-700 text-center pt-2 px-1">
        {props.label}
      </label>
      <input
        type="text"
        name={props.name}
        onChange={saveInputValueToState}
        onKeyDown={handleKeyDown}
        disabled={props.disabled}
        value={props.value}
        className="w-8 mx-auto mb-2 px-1 text-right text-lg font-mono bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      />
    </div>
  );
};

export default InputDiv;
