import React from 'react';
import styled from 'styled-components';
import { view } from '@risingstack/react-easy-state';
import FirebaseButton from './FirebaseButton';
// import SheetsButton from "./SheetsButton";
// import NetlifyButton from "./NetlifyButton";

const databaseSelect = () => {
  return (
    <ContainerDiv>
      <FirebaseButton />
      {/* <SheetsButton />
      <NetlifyButton /> */}
    </ContainerDiv>
  );
};

export default view(databaseSelect);

const ContainerDiv = styled.div`
  display: flex;
  margin-top: 5px;
  margin-bottom: 10px;
  width: 800px;
  justify-content: flex-start;
`;
