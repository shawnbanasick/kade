import React from 'react';
import styled from 'styled-components';
import correlationsImage from './helpImages/k3-correlations.png';

const HelpSection = () => {
  return (
    <MainContent>
      <h2 id="correlationssectionfaq">Correlations Section FAQ:</h2>
      <ul>
        <li>
          <p>
            <strong>What correlation coefficient is used in KADE?</strong>
            <br /> Pearson correlation coefficient
          </p>
        </li>
        <li>
          <p>
            <strong>How can I re-sort the correlation matrix table?</strong>
            <br /> Click the column headers to resort (low-to-high, high-to-low, original list
            order)
            <br />
            <br />
          </p>
        </li>
      </ul>
      <p>
        {`To generate the correlation table, click the "Calculate Correlations" button at the top of the screen.`}
      </p>
      <img src={correlationsImage} width="1000px" alt="correlations" />
    </MainContent>
  );
};

export default HelpSection;

const MainContent = styled.div`
  background-color: white;
  user-select: all;
  padding: 50px;
  overflow: auto;
`;
