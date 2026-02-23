import vizState from '../../GlobalState/vizState';

const UserTextInput = (props) => {
  const updateFactorVisualizationsButtonColor = vizState(
    (state) => state.updateFactorVisualizationsButtonColor
  );
  const updateFactorVizOptionsHolder = vizState((state) => state.updateFactorVizOptionsHolder);

  const NewUpdateFactorVizOptionsHolder = {
    ...updateFactorVizOptionsHolder,
  };
  const key = props.name;
  const handleChange = (e) => {
    NewUpdateFactorVizOptionsHolder[key] = e.target.value.split(',');
    updateFactorVizOptionsHolder(NewUpdateFactorVizOptionsHolder);
    setTimeout(() => {
      updateFactorVisualizationsButtonColor('bg-[orange]');
    }, 100);
  };
  return (
    <input
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      onChange={handleChange}
      className={`optionsInput border-2 border-gray-300 rounded-md w-[90%] pl-[10px] ${props.left ? `ml-[${props.left}px]` : ''}`}
    />
  );
};

export default UserTextInput;
