import React from 'react';

import styled from 'styled-components';
import rotationJudgmental from './helpImages/k3-rotation-judgmental.png';
import varimax from './helpImages/k3-rotation-varimax.png';
import varimaxAdjustment from './helpImages/k3-rotation-varimax-adjustment.png';
import factorSelect from './helpImages/k3-rotation-num-factors.png';

const HelpSection = () => {
  return (
    <MainContent>
      <h2 id="factorrotationsectionfaq">Factor Rotation Section FAQ:</h2>
      <ul>
        <li>
          <p>
            <strong>
              What does the highlighting of the circles in the Rotation Chart and loadings in the
              Rotation Table indicate?
            </strong>
            <br /> Those are the participant loadings that will be auto-flagged in the Factor
            Loadings Table. The auto-flag level will be the default, or the user setting the last
            time the Auto-Flag button{' '}
            <strong>
              <em>was clicked</em>
            </strong>
            .
          </p>
        </li>
        <li>
          <p>
            <strong>Can a remove a rotation that I added?</strong>
            <br /> Yes, click the <strong>&quot;Undo Last Action&quot;</strong> button in the
            Project History section.{' '}
          </p>
        </li>
      </ul>
      <hr />
      <br />
      <p>
        First, select the number of factors to retain for rotation in the{' '}
        <strong>&quot;Options&quot;</strong> tab.
        <br />
      </p>
      <div style={{ width: 1000 + 'px' }}>
        <center>
          <img src={factorSelect} width="900px" alt="select factors" />
        </center>
      </div>
      <br />
      <p>
        For Varimax rotation, click the <strong>&quot;Varimax&quot;</strong> tab, then click the{' '}
        <strong>&quot;Varimax Rotation&quot;</strong> button.
        <br /> Navigate to the <strong>&quot;6. Loadings&quot;</strong> section to view the rotated
        factors.
      </p>{' '}
      <img src={varimax} width="1000px" alt="varimax rotation" />
      <br />
      <p>
        If a Heywood Case was present when the factors were extracted and the communality was not
        adjusted, it is possible for the varimax rotation to produce a factor loading greater than
        one. KADE will show a warning when this happens. Three options are available. The analysis
        can continue using the current value, or the value can be adjusted to 0.99999. There is also
        an option to adjust the value in a style identical to the PQMethod software, which reduces
        the factor loading by 1. This option should only be used when attempting to replicate a
        previous study conducted with PQMethod.
      </p>
      <br />
      <img src={varimaxAdjustment} width="1000px" alt="varimax rotation" />
      <br />
      <p>
        For Judgmental rotation, click the <strong>&quot;Judgmental&quot;</strong> tab. Then, click
        the <strong>&quot;Initialize Judgmental Rotation&quot;</strong> button.
      </p>
      <p>
        Next, select the factors to rotate and click <strong>&quot;Display&quot;</strong>.
      </p>
      <img src={rotationJudgmental} width="1000px" alt="judgmental rotation" />
      <p>
        Rotate the factor using the preset buttons - 1, 5, 10, or 90 degrees. A custom rotation
        value can also be set with the user-set button (type the value in text area inside the
        button). When satisfied with the rotation, click the orange{' '}
        <strong>&quot;Save Rotation&quot;</strong> button. This will clear the scatter plot and
        table from the screen and reset the factor selection.
      </p>
      <h3 id="cautionjudgmentalrotation">
        <em>Caution - Judgmental Rotation</em>
      </h3>
      <p>
        Factor judgmental rotations are temporary and not pushed into the loadings table until the
        orange <strong>&quot;Save Rotation&quot;</strong> button is clicked.
      </p>
      <hr />
    </MainContent>
  );
};

export default HelpSection;

const MainContent = styled.div`
  background-color: white;
  padding: 50px;
  padding-bottom: 150px;
  user-select: all;
  overflow: auto;

  p {
    max-width: 950px;
  }
  ol {
    max-width: 950px;
  }
`;
