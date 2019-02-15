import React, { Component } from "react";
import { view } from "react-easy-state";
import styled, { keyframes } from "styled-components";

class HelpSection extends Component {
    render() {
        return (
            <MainContent>
                <hr />
              <h1 id="kadefileandkenqanalysisfileimportfaq">KADE File and Ken-Q Analysis File Import FAQ</h2>
              <p><strong>Can I continue a previous KADE session using Type 3 data?</strong>
                <br /> No, The Excel Type 3 format is for re-loading data used during a previous KADE session. It does not allow the continuation of a previous analysis. It only loads
                the original statements and Q-sort data.</p>
              <h2 id="dataimportprocess">Data Import Process</h2>
              <ol>
                <li>On the KADE tab, click the <strong>"Load KADE Excel File"</strong>.</li>
                <li>Select your file from the dialog box.</li>
                <li>Navigate to section <strong>"2. Data"</strong> to confirm that your data has loaded properly.</li>
              </ol>
            </MainContent>
            );
    }
}

export default view(HelpSection);


const MainContent = styled.div`
  background-color: white;
  user-select: all;
  padding: 50px;
  overflow: auto;
`;
