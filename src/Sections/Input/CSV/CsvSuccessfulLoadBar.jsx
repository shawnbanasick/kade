import { view } from "react-easy-state";
import styled from "styled-components";
import React from "react";

import inputState from "../../GlobalState/inputState";

const CsvSuccessfulLoadBar = () => {
  const { hasAddedProjectName, sortsLoaded, statementsLoaded } = inputState;
  if (hasAddedProjectName && sortsLoaded && statementsLoaded) {
    return (
      <SuccessBar>
        <p>
          CSV Project Loaded -- Go to the Data section to confirm and begin
          analysis
        </p>
      </SuccessBar>
    );
  }
  return null;
};

export default view(CsvSuccessfulLoadBar);

const SuccessBar = styled.div`
  background-color: rgba(144, 238, 144, 0.6);
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  font-family: Helvetica, sans-serif;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: start;
  grid-column-start: 1;
  grid-column-end: -1;
  grid-row-start: 4;
  border-radius: 4px;
  border: 2px solid #d6dbe0;
`;
