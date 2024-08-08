import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ControlPanel from './ControlPanel';
import StructViz from './StructViz';
import styled from 'styled-components';
import './react-tabs.css';

const Structure = () => {
  return (
    <Container>
      <Tabs>
        <ColorBox />
        <TabList>
          <Tab>Heirarchical Factor Structure</Tab>
          <Tab>Factor Characteristics</Tab>
          <Tab>Influencers</Tab>
        </TabList>

        <TabPanel>
          <ControlPanel />
          <StructViz />
        </TabPanel>
        <TabPanel>
          <h2>Some Correlations</h2>
        </TabPanel>
        <TabPanel>
          <h2>Some influencers data</h2>
        </TabPanel>
      </Tabs>
    </Container>
  );
};

export default Structure;

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid blue;
  background-color: lightgray;
`;

const ColorBox = styled.div`
  width: 100%;
  height: 5px;
  background-color: lightgray;
`;
