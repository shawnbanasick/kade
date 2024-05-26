import styled from 'styled-components';
import FirebaseButton from './FirebaseButton';
import SheetsButton from './SheetsButton';
import NetlifyButton from './NetlifyButton';

const DatabaseSelectButtons = () => {
  return (
    <ContainerDiv>
      <FirebaseButton />
      <SheetsButton />
      <NetlifyButton />
    </ContainerDiv>
  );
};

export default DatabaseSelectButtons;

const ContainerDiv = styled.div`
  display: flex;
  margin-top: 5px;
  margin-bottom: 10px;
  width: 800px;
  justify-content: flex-start;
`;
