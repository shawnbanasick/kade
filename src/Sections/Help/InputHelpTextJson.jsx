import React, { Component } from "react";
import { view } from "react-easy-state";
import styled, { keyframes } from "styled-components";

class HelpSection extends Component {
    render() {
        return (
            <MainContent>
              <h2 id="easyhtmlqfaq">Easy HTMLQ FAQ:</h2>
              <ul>
                <li>
                  <p><strong>What is Easy HTMLQ?</strong>
                    <br /> It is a slightly modified version of the online q-sort software "HTMLQ". It uses Google's Firebase service as the backend database to store participant
                    q-sorts. More information is available <a href="https://docs.google.com/presentation/d/1fOYxQOo2XpgR1lZ4gyGO_dRi9Ehh6-0TN98us2xPEPs/edit?usp=sharing"><strong>here</strong></a>        </p>
                </li>
                <li>
                  <p><strong>What is JSON?</strong>
                    <br /> JSON is "JavaScript Object Notation", a file format often used to pass data between servers and web pages on the internet. </p>
                </li>
                <li>
                  <p><strong>Can I import JSON files from other sources?</strong>
                    <br /> Yes, as long as they have the same format as the HTMLQ JSON file. </p>
                </li>
              </ul>
              <p>
                <br/>
              </p>
              <h2 id="jsonformat">JSON Format</h2>
              <p>The Q sorts key value must be "sort", and the Q sort values must be a text string with the values separated by bars</p>
              <p>(The same style used by HTMLQ and Easy HTMLQ.)</p>
              <p>
                <br/>
              </p>
              <h2 id="importprocess">Import Process</h2>
              <ol>
                <li>On the JSON tab, click the <strong>"Load TXT File"</strong> button.</li>
                <li>Select your statements file from the dialog box.</li>
                <li>Click the <strong>"Load JSON File"</strong> button.</li>
                <li>Select your JSON file from the dialog box.</li>
                <li>Click on the <strong>"Input Project Name"</strong> text area, and add your project name.</li>
                <li><strong>Important >>></strong> Click the <strong>"ID:"</strong> dropdown and select the id variable for your project.</li>
                <li>(optional) If you have unforced data, click the <strong>"Unforced"</strong> radio button and enter the number of sort cards in each column for your project.</li>
              </ol>
              <ol>
                <li>(Optional) Click the <strong>"Download JSON data as CSV"</strong> button to view the other participant response data in the JSON file in a spreadsheet.</li>
                <li>Navigate to the <strong>"2. Data"</strong> section to confirm that your data has loaded properly.</li>
              </ol>
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
