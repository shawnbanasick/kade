import React from 'react';
import styled from 'styled-components';
import type1Image from './helpImages/XlsxType1LoadButton.png';
import type1ProjectName from './helpImages/XlsxType1ProjectName.png';
import type1Sorts from './helpImages/XlsxType1Sorts.png';
import type1Pattern from './helpImages/XlsxType1Pattern.png';
import type1Version from './helpImages/XlsxType1Version.png';
import type1Statements from './helpImages/XlsxType1Statements.png';
import type1Save from './helpImages/XlsxType1Save.png';

const HelpSection = () => {
  return (
    <MainContent>
      <hr />
      <h1 id="exceltype1inputfaq">Excel Type 1 Input FAQ:</h1>
      <ul>
        <li>
          <p>
            <strong>Can I use unforced sorts in a type 1 file ?</strong>
            <br /> No, use type 2 for unforced sorts.
          </p>
        </li>
        <li>
          <p>
            <strong>Where can I get a copy of the sample file?</strong>
            <br /> Use this link:{' '}
            <CustomAnchor
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.google.com/spreadsheets/d/1vsz-X9_EIo3bi4nxBTtQbEWB21qOxBLprWaluaNmvec/edit?usp=sharing"
            >
              <strong>Type 1 Sample File</strong>
            </CustomAnchor>{' '}
            <mark>
              (on the Google Sheets file, click &quot;File&quot;, &quot;Download&quot;,
              &quot;Microsoft Excel (.xlsx)&quot;)
            </mark>
          </p>
        </li>
        <li>
          <p>
            <strong>When should I use a type 1 file?</strong>
            <br /> Type 1 makes it easy to input q-sort data when you are working from hand-written
            notes or images of the participant sorts.{' '}
          </p>
        </li>
      </ul>
      <br />
      <img src={type1Image} width="1000px" alt="step 1" />
      <h2 id="filesetup">XLSX Type 1 File Setup</h2>
      <h3 id="step1AccessSpreadsheet">
        Step 1 - Access a Spreadsheet Program (
        <CustomAnchor
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.libreoffice.org/download/download-libreoffice/"
        >
          <strong>LibreOffice Calc</strong>
        </CustomAnchor>{' '}
        or MS Excel) That Can Create XLSX Files
      </h3>

      <h3 id="step2AddProjectNameWorksheet">Step 2 - Add a Project Name Worksheet</h3>
      <ul>
        <li>In cell A1, input &quot;Project Name&quot;.</li>
        <li>In cell A2, input the name of your project.</li>
        <li>Rename the worksheet to &quot;name&quot;.</li>
      </ul>

      <img src={type1ProjectName} width="1000px" alt="step 3" />
      <h3 id="step3addSortsWorksheet">Step 3 - Add a Sorts Worksheet</h3>
      <ul>
        <li>In cell A1, input &quot;Participant Name and Sort Value:&quot;.</li>
        <li>Starting in cell B1 input your participant&apos;s names in the row.</li>
        <li>
          Starting in cell A2, input all Q sort values for your project, starting with the lowest
          value.
        </li>
        <li>Rename the worksheet to &quot;sorts&quot;.</li>
      </ul>
      <img src={type1Sorts} width="1000px" alt="step 4" />
      <h3 id="step4addPaternWorksheet">Step 4 - Add a Pattern Worksheet</h3>
      <ul>
        <li>In row 1, input all possible Q sort values from -6 to +13.</li>
        <li>
          In row 2 input the number of statements in your project design for each Q sort value. For
          example, if you have 2 statements <br />
          for column with a Q sort value of -4, input &quot;2&quot; in the cell for Q sort value -4.
          If you have 0 statements for a Q sort column value, put a 0 into the cell.
        </li>
      </ul>
      <img src={type1Pattern} width="1000px" alt="step 5" />

      <h3 id="step5addStatementsWorksheet">Step 5 - Add a Statements Worksheet</h3>
      <ul>
        <li>Starting in cell A2, input statement numbers.</li>
        <li>Starting in cell B2, input statement text into column B.</li>
        <li>Rename the worksheet to &quot;statements&quot;.</li>
      </ul>
      <img src={type1Statements} width="1000px" alt="step 6" />
      <h3 id="step5addVersionWorksheet">Step 6 - Add a Version Worksheet</h3>
      <ul>
        <li>In cell A1, input &quot;Version&quot;.</li>
        <li>In cell A2, input &quot;2&quot;.</li>
        <li>Rename the worksheet to &quot;version&quot;.</li>
      </ul>
      <img src={type1Version} width="1000px" alt="step 7" />
      <h3 id="step5SaveFileAsXlsx">Step 7 - Save as a XLSX File</h3>
      <ul>
        <li>Save as a XLSX file.</li>
      </ul>
      <img src={type1Save} width="1000px" alt="step 8" />
    </MainContent>
  );
};

export default HelpSection;

const MainContent = styled.div`
  background-color: white;
  padding: 50px;
  user-select: all;
`;

const CustomAnchor = styled.a`
  color: #d35400 !important;
  text-decoration: underline !important;
  &:hover {
    color: blue !important;
  }
`;
