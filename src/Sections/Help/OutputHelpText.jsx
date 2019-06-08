import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import OutputOptionsImage from "./helpImages/OutputOptionsImage";

class HelpSection extends Component {
  render() {
    return (
      <MainContent>
        <h2 id="outputandfactorvisualizationsfaq">
          Output and Factor Visualizations FAQ:
        </h2>

        <ul>
          <li>
            <p>
              <strong>
                Do the Excel and CSV output files have the same content?
              </strong>{" "}
              <br />
              Yes.
            </p>
          </li>

          <li>
            <p>
              <strong>
                On the composite factor visualizations, what do the asterisks
                represent?
              </strong>{" "}
              <br />
              The asterisks indicate distinguishing statements. A single
              asterisk indicates that the statement is distinguishing at P &lt;
              .05. Two asterisks indicate that the statement is distinguishing
              at P &lt; .01.
            </p>
          </li>

          <li>
            <p>
              <strong>
                On the composite factor visualizations, what are those black
                triangles?
              </strong>{" "}
              <br />A black triangle pointing to the right indicates that the
              statement is ranked higher in that factor than in other factors. A
              triangle pointing to the left indicates that the statement is
              ranked lower in that factor than in other factors.{" "}
            </p>
          </li>

          <li>
            <p>
              <strong>
                Can I remove the asterisks and black triangles from the factor
                visualizations?
              </strong>{" "}
              <br />
              Yes, open the Factor Visualizations Display Options panel and
              change the default options.
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
              <strong>
                Can I display just the statement numbers on the grid?
              </strong>{" "}
              <br />
              Yes, see the guide below{" "}
            </p>
          </li>

          <li>
            <p>
              <strong>
                Can I output high-resolution images of the composite factor
                visualizations?
              </strong>{" "}
              <br />
              Not within KADE. You can, however, download an SVG image from
              KADE, and then use software like{" "}
              <a href="https://inkscape.org/en/">
                <em>
                  <strong>Inkscape</strong>
                </em>
              </a>{" "}
              to transform that SVG image into a high-resolution PNG file.
            </p>
          </li>

          <li>
            <p>
              <strong>
                Can I also indicate consensus statements on the grids?
              </strong>{" "}
              <br />
              Yes, see the guide below.
            </p>
          </li>
        </ul>

        <hr />

        <OutputOptionsImage />

        <p>
          Select the factors to output, then click the <strong>"Submit"</strong>{" "}
          button.{" "}
        </p>

        <p>
          Click the <strong>"Excel File"</strong> or <strong>"CSV File"</strong>{" "}
          button to download all results in spreadsheet format.
        </p>

        <p>
          Click the <strong>"Factor Characteristics"</strong> tab to view
          correlations between factors and other factor data.
        </p>

        <p>
          Click the <strong>"Factors Table"</strong> tab to view the statement
          Z-scores and rankings for each factor.
        </p>

        <p>
          Click the <strong>"Factor Visualizations"</strong> tab, then click the{" "}
          <strong>"Display Composite Factors"</strong> button to view the factor
          visualizations.{" "}
        </p>

        <p>
          In the factor visualizations, the asterisks indicate distinguishing
          statements for each factor. The black triangles indicate that the
          distinguishing statements are ranked higher/lower in this factor than
          in all of the other factors.{" "}
        </p>

        <p>
          User configurable settings are available by clicking the{" "}
          <strong>"View Display Options"</strong> button.
        </p>

        <p>
          After making changes to the display options, you must click the orange{" "}
          <strong>"Update Factor Visualizations"</strong> button to apply the
          changes to the visualizations.
        </p>

        <hr />

        <h2 id="howtocreateanemptyfactorsortgrid">
          How to Create an Empty Factor Sort Grid
        </h2>

        <ol>
          <li>
            Click the <strong>"Display Composite Factors"</strong> button.
          </li>

          <li>
            Click the <strong>"View Display Options"</strong> button.
          </li>

          <li>
            Set option <strong>"1. Include Legend with image?"</strong> to{" "}
            <strong>"no"</strong>.
          </li>

          <li>
            Set option <strong>"4. Add custom names to factor images?"</strong>{" "}
            to <strong>"yes"</strong>, and then input a space and a comma in the{" "}
            <strong>"Input custom factor names separated by commas"</strong>{" "}
            text input area.
          </li>

          <li>
            Set option <strong>"7. Adjust font size?"</strong> to{" "}
            <strong>"yes"</strong>, and then input 0 as the font size.{" "}
          </li>

          <li>
            Set option <strong>"13. Indicate distinguishing?"</strong> to{" "}
            <strong>"no"</strong>.
          </li>

          <li>
            Click the orange <strong>"Update Factor Visualizations"</strong>{" "}
            button.
          </li>

          <li>
            Scroll to the bottom of the image and click the{" "}
            <strong>"Download SVG"</strong> or <strong>"Download PNG"</strong>{" "}
            button.
          </li>
        </ol>

        <hr />

        <h2 id="howtodisplayonlystatementnumbers">
          How to Display Only Statement Numbers
        </h2>

        <ol>
          <li>
            Click the <strong>"View Display Options"</strong> button.
          </li>

          <li>
            Set option <strong>"3. Display only statement numbers?"</strong> to{" "}
            <strong>"yes"</strong>.{" "}
          </li>

          <li>
            Set option <strong>"7. Adjust font size?"</strong> to{" "}
            <strong>"yes"</strong>, and input a larger font size.{" "}
          </li>

          <li>
            Set option <strong>"13. Indicate distinguishing?"</strong> to{" "}
            <strong>"no"</strong>.
          </li>

          <li>
            Set option <strong>"9. Adjust top margin?"</strong> to{" "}
            <strong>"yes"</strong>, and input a value that centers the number in
            the text box.
          </li>

          <li>
            Click the orange <strong>"Update Factor Visualizations"</strong>{" "}
            button.
          </li>

          <li>
            Scroll to the bottom of the image and click the{" "}
            <strong>"Download SVG"</strong> or <strong>"Download PNG"</strong>{" "}
            button.
          </li>
        </ol>

        <hr />

        <h2 id="howtoindicateconsensusstatements">
          How to Indicate Consensus Statements
        </h2>

        <ol>
          <li>
            Click the <strong>"View Display Options"</strong> button.
          </li>

          <li>
            Set option{" "}
            <strong>"14. Display consensus statement indicator color?"</strong>{" "}
            to <strong>"yes"</strong>.{" "}
          </li>

          <li>Click the color input box to select a color to display.</li>

          <li>
            Click the orange <strong>"Update Factor Visualizations"</strong>{" "}
            button.
          </li>
        </ol>
      </MainContent>
    );
  }
}

export default view(HelpSection);

const MainContent = styled.div`
  user-select: all;
  background-color: white;
  padding: 50px;
  padding-bottom: 150px;
  overflow: auto;
`;
