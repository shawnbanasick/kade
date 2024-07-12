import styled from 'styled-components';
import ProjectHistory from '../Loadings/LoadingsTable/ProjectHistory';

const License = () => {
  return (
    <MainContent>
      <ProjectHistory />
    </MainContent>
  );
};

export default License;

const MainContent = styled.div`
  /* display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center; */
  background-color: white;

  width: calc(100vw - 135px);
  box-sizing: border-box;
  height: 100vh;
  overflow: auto;

  height: calc(100vh);
  overflow: auto;
`;
