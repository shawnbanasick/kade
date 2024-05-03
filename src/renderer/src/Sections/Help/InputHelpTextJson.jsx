import React from 'react';
import { view } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import JsonInputImage1 from './helpImages/k3-json-1.png';
import JsonInputImage2 from './helpImages/k3-json-2.png';
import JsonInputImage3 from './helpImages/k3-json-3.png';
import JsonInputImage4 from './helpImages/k3-json-4.png';
import JsonFormatImage from './helpImages/k3-json-format.png';

const HelpSection = () => {
  return (
    <MainContent>
      <hr />
      <h1 id="easyhtmlqfaq">EQ Web Sort Files FAQ:</h1>
      <ul>
        <li>
          <p>
            <strong>What is EQ Web Sort?</strong>
            <br /> It is a free DIY online Q sort software for text statements and images. More
            information is available{' '}
            <CustomAnchor
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/shawnbanasick/eq-web-sort"
            >
              <strong>here</strong>
            </CustomAnchor>{' '}
          </p>
        </li>
        <li>
          <p>
            <strong>What is JSON?</strong>
            <br /> JSON is &quot;JavaScript Object Notation&quot;, a file format often used to pass
            data between servers and web pages on the internet.{' '}
          </p>
        </li>
        <li>
          <p>
            <strong>Can I import JSON files from other sources?</strong>
            <br /> Yes, as long as they have the same format as the HTMLQ JSON file.{' '}
          </p>
        </li>
        <li>
          <p>
            <strong>What does &quot;local data&quot; mean?</strong>
            <br /> EQ Web Sort can also be used offline to collect Q sorts using a notebook
            computer. So, if you are in a situation where using paper cards for the Q sorting is not
            practical (for example, in a coffee shop with small tables or outside with strong
            winds), you can use EQ Web Sort to collect the data &quot;locally&quot;.{' '}
          </p>
        </li>
      </ul>
      <h2 id="jsonformat">JSON Format</h2>
      <p>
        The Q sorts key value must be &quot;sort&quot;, and the Q sort values must be a text string
        with the values separated by bars. (The same style used by HTMLQ and Easy HTMLQ.)
      </p>

      <img src={JsonFormatImage} width="900px" alt="json format" />
      <h2 id="importprocess">Import Process</h2>
      <ol>
        <li>First, choose the data import type.</li>
        <br />
        <img src={JsonInputImage1} width="900px" alt="import json file" />
        <br />
        <br />
        <br />
        <li>
          For <b>EQ Web Sort Firebase data or Local data</b>:
        </li>
        <br />
        <img src={JsonInputImage2} width="900px" alt="import json file" />
        <br />
        <br />
        <br />
        <li>
          Click the <strong>&quot;Load TXT File&quot;</strong> button.
        </li>
        <li>Select your statements file from the dialog box.</li>
        <li>
          Click the <strong>&quot;Load JSON File&quot;</strong> button.
        </li>
        <li>Select your JSON file from the dialog box.</li>
        <li>
          Click on the <strong>&quot;Input Project Name&quot;</strong> text area, and add your
          project name.
        </li>
        <li>
          <strong>Important &gt;&gt;&gt;</strong> Click the <strong>&quot;ID:&quot;</strong>{' '}
          dropdown and select the id variable for your project.
        </li>
        <li>
          If you have unforced data, click the <strong>&quot;Unforced&quot;</strong> radio button.
        </li>
        <li>
          For the <b>Q Sort Pattern</b>, enter the number of sort cards in each column for your
          project.
        </li>
        <li>
          (Optional) Click the <strong>&quot;Download JSON data as CSV&quot;</strong> button to view
          the other participant response data in the JSON file in a spreadsheet.
        </li>
        <li>
          Navigate to the <strong>&quot;2. Data&quot;</strong> section to confirm that your data has
          loaded properly.
        </li>
      </ol>
      <br />
      <br />
      <p>
        For <b>Google Sheets</b> data import, load the Sheets file that you downloaded from Google
        account and follow the same steps as above.
        <br />
      </p>
      <img src={JsonInputImage3} width="900px" alt="import json file" />
      <br />
      <br />
      <br />
      <p>
        For <b>Netlify</b> data import, load the CSV file that you downloaded from Netlify without
        any changes and follow the same steps as above.
      </p>
      <br />
      <img src={JsonInputImage4} width="900px" alt="import json file" />
    </MainContent>
  );
};

export default view(HelpSection);

const MainContent = styled.div`
  background-color: white;
  padding: 50px;
  user-select: all;

  p {
    max-width: 700px;
  }
`;

const CustomAnchor = styled.a`
  color: #d35400 !important;
  text-decoration: underline !important;
  &:hover {
    color: blue !important;
  }
`;
