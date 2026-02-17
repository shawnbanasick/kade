import { useState, useCallback } from 'react';
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import getNodes from './getNodes';
import getEdges from './getEdges';
import styled from 'styled-components';
import './reactFlow.css';
import structureState from '../GlobalState/structureState';
import ControlPanel from './ControlPanel';
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

const xObj = {
  x11: 200,
  x21: 170,
  x22: 380,
  x31: 30,
  x32: 240,
  x33: 450,
  x41: 0,
  x42: 210,
  x43: 420,
  x44: 580,
  x51: 0,
  x52: 210,
  x53: 420,
  x54: 580,
  x55: 700,
  x61: 0,
  x62: 210,
  x63: 420,
  x64: 580,
  x65: 700,
  x66: 820,
  x71: 0,
  x72: 210,
  x73: 420,
  x74: 580,
  x75: 700,
  x76: 820,
  x77: 940,
  x81: 0,
  x82: 210,
  x83: 420,
  x84: 580,
  x85: 700,
  x86: 820,
  x87: 940,
  x88: 1060,
};

const initialNodes = getNodes(labelObj, widthObj, xObj, paddingTopVal, heightVal);

function Flow() {
  const edges = structureState((state) => state.initialEdges);
  const updateEdges = structureState((state) => state.updateInitialEdges);

  const structureCorrelationThreshold = structureState(
    (state) => state.structureCorrelationThreshold
  );
  const verticalSpacing = structureState((state) => state.verticalSpacing);
  const horizontalSpacing = structureState((state) => state.horizontalSpacing);

  const [nodes, setNodes] = useState(initialNodes);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => updateEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Each handler writes the new value to Zustand first, then refreshViz reads
  // it back from state — so the order is always: update → read → render
  const handleCorrelationChange = useCallback((newValue) => {
    structureState.setState({ structureCorrelationThreshold: newValue });
    refreshViz();
  }, []);

  const handleVerticalSpacingChange = useCallback((newValue) => {
    structureState.setState({ verticalSpacing: newValue });
    refreshViz();
  }, []);

  const handleHorizontalSpacingChange = useCallback((newValue) => {
    structureState.setState({ horizontalSpacing: newValue });
    refreshViz();
  }, []);

  return (
    <>
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
        <ReactFlow
          id="SvgNode"
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </Container>
    </>
  );
}

export default Flow;

const Container = styled.div`
  width: 100%;
  height: 95%;
  background-color: white;
`;
