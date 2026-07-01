import FactorViz from './FactorViz';
import createFactorVizDataObjectForProps from './createFactorVizDataObjectForProps';
import vizState from '../../GlobalState/vizState';
import outputState from '../../GlobalState/outputState';

const styles = {
  width: '100%',
  height: 1200,
  padding: 30,
  margin: 10,
};

// todo - need to calculate dynamic height here for styles
const FactorVizDispatch = (props) => {
  console.log('FactorVizDispatch props:', props);

  // getState
  const factorVizOptions = vizState((state) => state.factorVizOptions);
  const factorData = createFactorVizDataObjectForProps(factorVizOptions);

  console.log('FactorVizDispatch factorData:', factorData);

  if (Object.keys(factorData).length === 0 || factorData === undefined || factorData === null) {
    return null;
  }

  return (
    <div>
      {factorData.map((i, index) => (
        <div key={`key${index.toString()}`}>
          <FactorViz key={`viz${index}`} {...factorData[index]} {...props} {...styles} />
        </div>
      ))}
    </div>
  );
  return null;
};

export default FactorVizDispatch;
