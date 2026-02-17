import { useCallback, useMemo } from 'react';
import ReactFlow, { Controls, Background, applyEdgeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import getNodes from './getNodes';
import styled from 'styled-components';
import './reactFlow.css';
import structureState from '../GlobalState/structureState';
import UserNumberInput from './UserNumberInput';
import refreshViz from './refreshViz';

const paddingTopVal = 0;
const heightVal = 20;

const labelObj = {
  label11: '1-1',
  label21: '2-1',
  label22: '2-2',
  label31: '3-1',
};

const widthObj = {
  width11: 200,
  width21: 100,
  width22: 100,
  width31: 80,
  width32: 80,
  width33: 80,
  width41: 60,
  width42: 60,
  width43: 60,
  width44: 60,
  width51: 60,
  width52: 60,
  width53: 60,
  width54: 60,
  width55: 60,
  width61: 60,
  width62: 60,
  width63: 60,
  width64: 60,
  width65: 60,
  width66: 60,
  width71: 60,
  width72: 60,
  width73: 60,
  width74: 60,
  width75: 60,
  width76: 60,
  width77: 60,
  width81: 60,
  width82: 60,
  width83: 60,
  width84: 60,
  width85: 60,
  width86: 60,
  width87: 60,
  width88: 60,
};

function Flow() {
  const edges = structureState((state) => state.initialEdges);
  const updateEdges = structureState((state) => state.updateInitialEdges);
  const structureCorrelationThreshold = structureState(
    (state) => state.structureCorrelationThreshold
  );
  const verticalSpacing = structureState((state) => state.verticalSpacing);
  const horizontalSpacing = structureState((state) => state.horizontalSpacing);

  console.log('edges', edges);

  // Recomputes automatically whenever horizontalSpacing or verticalSpacing changes in Zustand
  const nodes = useMemo(
    () =>
      getNodes(labelObj, widthObj, paddingTopVal, heightVal, horizontalSpacing, verticalSpacing),
    [horizontalSpacing, verticalSpacing]
  );

  const onEdgesChange = useCallback(
    (changes) => updateEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const handleCorrelationChange = useCallback((newValue) => {
    structureState.setState({ structureCorrelationThreshold: newValue });
    refreshViz();
  }, []);

  const handleVerticalSpacingChange = useCallback((newValue) => {
    // Just update Zustand — useMemo above handles the rest
    structureState.setState({ verticalSpacing: newValue });
  }, []);

  const handleHorizontalSpacingChange = useCallback((newValue) => {
    // Just update Zustand — useMemo above handles the rest
    structureState.setState({ horizontalSpacing: newValue });
  }, []);

  return (
    <Container>
      <div className="flex flex-row gap-20">
        <UserNumberInput
          onChange={handleCorrelationChange}
          value={structureCorrelationThreshold}
          label="Correlation Cutoff"
          placeholder="Threshold"
          min={0}
          max={1}
          step={0.01}
          debounceMs={500}
          className="w-[60px]"
        />
        <UserNumberInput
          onChange={handleVerticalSpacingChange}
          value={verticalSpacing}
          label="Vertical Spacing"
          placeholder="Vertical Spacing"
          min={0}
          max={500}
          step={1}
          debounceMs={500}
          className="w-[60px]"
        />
        <UserNumberInput
          onChange={handleHorizontalSpacingChange}
          value={horizontalSpacing}
          label="Horizontal Spacing"
          placeholder="Horizontal Spacing"
          min={0}
          max={500}
          step={1}
          debounceMs={500}
          className="w-[60px]"
        />
      </div>
      <ReactFlow id="SvgNode" nodes={nodes} edges={edges} onEdgesChange={onEdgesChange} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </Container>
  );
}

export default Flow;

const Container = styled.div`
  width: 100%;
  height: 95%;
  background-color: white;
`;
