import styled from 'styled-components';
import structureDispatch from './structureDispatch';

const ControlPanel = () => {
  const handleDisplay = () => {
    structureDispatch();
  };

  return (
    <Panel className="control-panel">
      <div className="control-panel__item">
        <button className="control-panel__button" onClick={handleDisplay}>
          Display
        </button>
      </div>
      {/* <div className="control-panel__item">
        <button className="control-panel__button">Remove</button>
      </div>
      <div className="control-panel__item">
        <button className="control-panel__button">Edit</button>
      </div> */}
    </Panel>
  );
};

export default ControlPanel;

const Panel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
  border-bottom: 1.5px solid black;
  background-color: white;
`;
