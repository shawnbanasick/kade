import { useEffect } from 'react';
import FactorViz from './FactorViz';
import createFactorVizDataObjectForProps from './createFactorVizDataObjectForProps';
import vizState from '../../GlobalState/vizState';
import outputState from '../../GlobalState/outputState';
import captureFactorVizImages from './captureFactorVizImages';

const styles = {
  width: '100%',
  height: 1200,
  padding: 30,
  margin: 10,
};

// todo - need to calculate dynamic height here for styles
const FactorVizDispatch = (props) => {
  // getState
  const factorVizOptions = vizState((state) => state.factorVizOptions);
  const factorData = createFactorVizDataObjectForProps(factorVizOptions);
  const updateFactorVizImages = outputState((state) => state.updateFactorVizImages);

  const hasData = Array.isArray(factorData) && factorData.length > 0;

  // Option A: automatic, debounced, re-runs when options change
  useEffect(() => {
    if (!hasData) return undefined;
    let cancelled = false;
    const t = setTimeout(async () => {
      const images = await captureFactorVizImages({ scale: 2 });
      if (!cancelled) updateFactorVizImages(images);
    }, 500); // let the SVGs finish rendering
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [factorVizOptions, hasData, updateFactorVizImages]);

  if (!hasData) return null;

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
