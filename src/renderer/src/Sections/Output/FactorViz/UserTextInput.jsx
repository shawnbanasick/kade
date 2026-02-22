import vizState from '../../GlobalState/vizState';

const UserTextInput = (props) => {
  const handleChange = (e) => {
    const factorVizOptionsHolder = vizState((state) => state.factorVizOptionsHolder);
    const updateFactorVisualizationsButtonColor = vizState(
      (state) => state.updateFactorVisualizationsButtonColor
    );
    const updateFactorVizOptionsHolder = vizState((state) => state.updateFactorVizOptionsHolder);
    const key = props.name;
    factorVizOptionsHolder[key] = e.target.value;
    updateFactorVizOptionsHolder(factorVizOptionsHolder);
    updateFactorVisualizationsButtonColor('bg-[orange]');
  };

  return (
    <input
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      onChange={handleChange}
      className={`optionsInput w-[90%] pl-[10px] ${props.left ? `ml-[${props.left}px]` : ''}`}
    />
  );
};

export default UserTextInput;
