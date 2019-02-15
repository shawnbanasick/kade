import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";

class HelpSection extends Component {
  render() {
    return (
      <MainContent>
        <h2 id="correlationssectionfaq">Correlations Section FAQ:</h2>
        <ul>
          <li>
            <p><strong>What correlation coefficient is used in KADE?</strong>
              <br /> Pearson correlation coefficient</p>
          </li>
          <li>
            <p><strong>How can I re-sort the correlation matrix table?</strong>
              <br /> Click the column headers to resort (low-to-high, high-to-low, original list order)
              <br/>
              <br/>
            </p>
          </li>
        </ul>
        <p>To generate the correlation table, click the <strong>"Calculate Correlations"</strong> button at the top of the screen.</p>
      </MainContent>
      );
  }
}

export default view(HelpSection);


const MainContent = styled.div`
  background-color: white;
  padding: 50px;
  overflow: auto;
`;
