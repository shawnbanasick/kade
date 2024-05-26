import React from 'react';

import styled from 'styled-components';
import options from './helpImages/k3-output-1.png';
import factorChar from './helpImages/k3-output-factor-characteristics.png';
import factorViz from './helpImages/k3-output-factor-visualizations.png';
import factorTable from './helpImages/k3-output-factors-table.png';
import distState from './helpImages/k3-output-distinguishing-statements.png';
import docxOptions from './helpImages/k3-output-docx.png';

const HelpSection = () => {
  return (
    <MainContent>
      <h2 id="outputandfactorvisualizationsfaq">Output and Factor Visualizations FAQ:</h2>

      <ul>
        <li>
          <p>
            <strong>
              On the composite factor visualizations, what do the asterisks represent?
            </strong>{' '}
            <br />
            The asterisks indicate distinguishing statements. A single asterisk indicates that the
            statement is distinguishing at P &lt; .05. Two asterisks indicate that the statement is
            distinguishing at P &lt; .01.
          </p>
        </li>

        <li>
          <p>
            <strong>On the composite factor visualizations, what are those black triangles?</strong>{' '}
            <br />A black triangle pointing to the right indicates that the statement is ranked
            higher in that factor than in other factors. A triangle pointing to the left indicates
            that the statement is ranked lower in that factor than in other factors.{' '}
          </p>
        </li>

        <li>
          <p>
            <strong>
              Can I remove the asterisks and black triangles from the factor visualizations?
            </strong>{' '}
            <br />
            Yes, open the Factor Visualizations Display Options panel and change the default
            options.
          </p>
        </li>

        <li>
          <p>
            <strong>Can I create an empty sort grid?</strong> <br />
            Yes, see the guide below.
          </p>
        </li>

        <li>
          <p>
            <strong>Can I display just the statement numbers on the grid?</strong> <br />
            Yes, see the guide below{' '}
          </p>
        </li>

        <li>
          <p>
            <strong>
              Can I output high-resolution images of the composite factor visualizations?
            </strong>{' '}
            <br />
            Not within KADE. You can, however, download an SVG image from KADE, and then use
            software like{' '}
            <CustomAnchor target="_blank" rel="noopener noreferrer" href="https://inkscape.org/en/">
              <em>
                <strong>Inkscape</strong>
              </em>
            </CustomAnchor>{' '}
            to transform that SVG image into a high-resolution PNG file.
          </p>
        </li>

        <li>
          <p>
            <strong>Can I also indicate consensus statements on the grids?</strong> <br />
            Yes, see the guide below.
          </p>
        </li>
      </ul>

      <hr />
      <br />
      <br />

      <p>
        To begin the download process, select the factors to output, then click the{' '}
        <strong>&quot;Submit&quot;</strong> button.{' '}
      </p>

      <img src={options} width="1000px" alt="output options" />
      <p>
        Click the <strong>&quot;XLSX File&quot;</strong> <strong>&quot;CSV File&quot;</strong>, or
        &quot;
        <strong>DOCX File</strong>
        &quot; button to download the results of the analysis. The XLSX and CSV buttons will open a
        download dialog box.{' '}
      </p>

      <p>The DOCX button will open an addition set of options to customize the download file.</p>

      <img src={docxOptions} width="1000px" alt="docx options" />
      <p>
        Click the <strong>&quot;Factor Characteristics&quot;</strong> tab to view correlations
        between factors and other factor data.
      </p>

      <img src={factorChar} width="1000px" alt="factor characteristics" />
      <p>
        Click the <strong>&quot;Factors Table&quot;</strong> tab to view the statement Z-scores and
        rankings for each factor.
      </p>

      <img src={factorTable} width="1000px" alt="factors table" />
      <p>
        An interactive table of distinguishing statements can be viewed by clicking on the{' '}
        <strong>&quot;Distinguishing Statements&quot;</strong> tab.{' '}
      </p>

      <img src={distState} width="1000px" alt="distinguishing statements" />
      <p>
        Click the <strong>&quot;Factor Visualizations&quot;</strong> tab, then click the{' '}
        <strong>&quot;Display Composite Factors&quot;</strong> button to view the factor
        visualizations.{' '}
      </p>

      <img src={factorViz} width="1000px" alt="factor visualizations" />
      <p>
        In the factor visualizations, the asterisks indicate distinguishing statements for each
        factor. The black triangles indicate that the distinguishing statements are ranked
        higher/lower in this factor than in all of the other factors.{' '}
      </p>

      <p>
        User configurable settings are available by clicking the{' '}
        <strong>&quot;View Display Options&quot;</strong> button.
      </p>

      <p>
        After making changes to the display options, you must click the orange{' '}
        <strong>&quot;Update Factor Visualizations&quot;</strong> button to apply the changes to the
        visualizations.
      </p>

      <hr />

      <h2 id="howtocreateanemptyfactorsortgrid">How to Create an Empty Factor Sort Grid</h2>

      <ol>
        <li>
          Click the <strong>&quot;Display Composite Factors&quot;</strong> button.
        </li>

        <li>
          Click the <strong>&quot;View Display Options&quot;</strong> button.
        </li>

        <li>
          Set option <strong>&quot;1. Include Legend with image?&quot;</strong> to{' '}
          <strong>&quot;no&quot;</strong>.
        </li>

        <li>
          Set option <strong>&quot;4. Add custom names to factor images?&quot;</strong> to{' '}
          <strong>&quot;yes&quot;</strong>, and then input a space and a comma in the{' '}
          <strong>&quot;Input custom factor names separated by commas&quot;</strong> text input
          area.
        </li>

        <li>
          Set option <strong>&quot;7. Adjust font size?&quot;</strong> to{' '}
          <strong>&quot;yes&quot;</strong>, and then input 0 as the font size.{' '}
        </li>

        <li>
          Set option <strong>&quot;13. Indicate distinguishing?&quot;</strong> to{' '}
          <strong>&quot;no&quot;</strong>.
        </li>

        <li>
          Click the orange <strong>&quot;Update Factor Visualizations&quot;</strong> button.
        </li>

        <li>
          Scroll to the bottom of the image and click the <strong>&quot;Download SVG&quot;</strong>{' '}
          or <strong>&quot;Download PNG&quot;</strong> button.
        </li>
      </ol>

      <hr />

      <h2 id="howtodisplayonlystatementnumbers">How to Display Only Statement Numbers</h2>

      <ol>
        <li>
          Click the <strong>&quot;View Display Options&quot;</strong> button.
        </li>

        <li>
          Set option <strong>&quot;3. Display only statement numbers?&quot;</strong> to{' '}
          <strong>&quot;yes&quot;</strong>.{' '}
        </li>

        <li>
          Set option <strong>&quot;7. Adjust font size?&quot;</strong> to{' '}
          <strong>&quot;yes&quot;</strong>, and input a larger font size.{' '}
        </li>

        <li>
          Set option <strong>&quot;13. Indicate distinguishing?&quot;</strong> to{' '}
          <strong>&quot;no&quot;</strong>.
        </li>

        <li>
          Set option <strong>&quot;9. Adjust top margin?&quot;</strong> to{' '}
          <strong>&quot;yes&quot;</strong>, and input a value that centers the number in the text
          box.
        </li>

        <li>
          Click the orange <strong>&quot;Update Factor Visualizations&quot;</strong> button.
        </li>

        <li>
          Scroll to the bottom of the image and click the <strong>&quot;Download SVG&quot;</strong>{' '}
          or <strong>&quot;Download PNG&quot;</strong> button.
        </li>
      </ol>

      <hr />

      <h2 id="howtoindicateconsensusstatements">How to Indicate Consensus Statements</h2>

      <ol>
        <li>
          Click the <strong>&quot;View Display Options&quot;</strong> button.
        </li>

        <li>
          Set option <strong>&quot;14. Display consensus statement indicator color?&quot;</strong>{' '}
          to <strong>&quot;yes&quot;</strong>.{' '}
        </li>

        <li>Click the color input box to select a color to display.</li>

        <li>
          Click the orange <strong>&quot;Update Factor Visualizations&quot;</strong> button.
        </li>
      </ol>
    </MainContent>
  );
};

export default HelpSection;

const MainContent = styled.div`
  user-select: all;
  background-color: white;
  padding: 50px;
  padding-bottom: 150px;
  overflow: auto;
`;

const CustomAnchor = styled.a`
  color: #d35400 !important;
  text-decoration: underline !important;
  &:hover {
    color: blue !important;
  }
`;
