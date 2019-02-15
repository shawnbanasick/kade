import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";

class HelpSection extends Component {
    render() {
        return (
            <MainContent>
              <h2 id="factorssectionfaq">Factors Section FAQ:</h2>
              <ul>
                <li>
                  <p><strong>What is the maximum numbers of factors I can extract?</strong>
                    <br /> 8 factors</p>
                </li>
                <li>
                  <p><strong>Can I change the factor extraction method without reloading my project data?</strong>
                    <br /> Yes, click the <strong>"Reset Analysis"</strong> button. The current analysis data will be deleted and cannot be recovered. </p>
                </li>
                <li>For Centroid Factors, click the factor select dropdown and select the number of factors, then click the <strong>"Centroid Factors"</strong> button. </li>
                <li>For Principal Components, click the <strong>"Principal Components"</strong> button. </li>
              </ul>
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
