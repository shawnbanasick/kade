import styled from 'styled-components';

import React from 'react';

const HelpSection = () => {
  return (
    <MainContent>
      <h2>KADE Help File and User Manual</h2>
      <hr />
      <br />
      <h4>Click on the tabs above for section-specific FAQs and user information</h4>
      <br />
      <br />
      <br />
      <p>A more detailed user guide (with video) is available online here: </p>
      <WebLinkDiv2>
        <StyledAnchor
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/shawnbanasick/kade/wiki"
        >
          KADE Online User Manual
        </StyledAnchor>
      </WebLinkDiv2>
    </MainContent>
  );
};

export default HelpSection;

const MainContent = styled.div`
  background-color: white;
  padding: 50px;
  overflow: auto;
`;

const WebLinkDiv2 = styled.div`
  display: flex;
  height: 120px;
  width: 180px;
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: #d6dbe0;
  color: black;
  border-radius: 5px;
  font-size: 22px;
  margin-right: 3px;
  margin-top: 30px;
  margin-left: 100px;
  margin-bottom: 3px;
  box-shadow: 0 2px 2px 0 black;
  text-align: center;
  user-select: none;
  line-height: 1.2;

  &:hover {
    background-color: #abafb3;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 97px;
    /* margin-top: 3px; */
  }
`;

const StyledAnchor = styled.a`
  color: black;

  &:hover {
    color: black;
  }
`;
