import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";

class HelpSection extends Component {
    render() {
        return (
            <MainContent>
              <h2 id="factorrotationsectionfaq">Factor Rotation Section FAQ:</h2>
              <ul>
                <li>
                  <p><strong>What does the highlighting of the circles in the Rotation Chart and loadings in the Rotation Table indicate?</strong>
                    <br /> Those are the participant loadings that will be auto-flagged in the Factor Loadings Table. The auto-flag level will be the default, or the user setting
                    the last time the Auto-Flag button <strong><em>was clicked</em></strong>.</p>
                </li>
                <li>
                  <p><strong>Can a remove a rotation that I added?</strong>
                    <br /> Yes, click the <strong>"Undo Last Action"</strong> button in the Project History section. </p>
                </li>
              </ul>
              <hr />
              <h3 id="cautionjudgmentalrotation"><em>Caution - Judgmental Rotation</em></h3>
              <p>Factor judgmental rotations are temporary and not pushed into the loadings table until the orange <strong>"Save Rotation"</strong> button is clicked.</p>
              <hr />
              <ol>
                <li>
                  <p>Select the number of factors to retain for rotation in the <strong>"Options"</strong> tab.
                    <br/>
                  </p>
                </li>
                <li>
                  <p>For Varimax rotation, click the <strong>"Varimax"</strong> tab, then click the <strong>"Varimax Rotation"</strong> button.
                    <br/> Navigate to the <strong>"6. Loadings"</strong> section to view the rotated factors.
                  </p>
                </li>
              </ol>
              <p>3a. For Judgmental rotation, click the <strong>"Judgmental"</strong> tab. Then, click the <strong>"Initialize Judgmental Rotation"</strong> button.</p>
              <p>3b. Then, select the factors to rotate and click <strong>"Display"</strong>.</p>
              <p>3c. Rotate the factor using the preset buttons - 1, 5, 10, or 90 degrees. </p>
              <p>3d. You can also use the user-set button (type the value in text area inside the button). </p>
              <p>3e. When satisfied with the rotation, click the orange <strong>"Save Rotation"</strong> button. This will clear the scatter plot and table from the screen and
                reset the factor selection.</p>
            </MainContent>
            );
    }
}

export default view(HelpSection);


const MainContent = styled.div`
  background-color: white;
  padding: 50px;
  user-select: all;
  overflow: auto;
`;
