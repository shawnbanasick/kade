import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";

const HelpSection = () => {
  const CorrelationsImage = React.lazy(() =>
    import("./helpImages/CorrelationsImage")
  );

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
            <br /> Click the column headers to resort (low-to-high, high-to-low,
            original list order)
            <br />
            <br />
          </p>
        </li>
      </ul>
      <p>
        {`To generate the correlation table, click the "Calculate Correlations" button at the top of the screen.`}
      </p>
      <CorrelationsImage />
    </MainContent>
  );
};

export default view(HelpSection);

const MainContent = styled.div`
  background-color: white;
  user-select: all;
  padding: 50px;
  overflow: auto;
`;
