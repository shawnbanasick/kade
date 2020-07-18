import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";

const HelpSection = () => {
  const CsvInputImage = React.lazy(() => import("./helpImages/CsvInputImage"));

  return (
    <MainContent>
      <hr />
      <h1 id="csvfaq">CSV FAQ:</h1>
      <ul>
        <li>
          <p>
            <strong>What is CSV?</strong> -CSV is a flat file of comma separated
            values.{" "}
          </p>
        </li>
        <li>
          <p>
            <strong>Why would I want to use CSV?</strong> -CSV is the best
            choice for long-term data storage because of its simple format. The
            Excel file format may change or disappear over time and accessing
            the data may become difficult.{" "}
          </p>
        </li>
      </ul>
      <h2 id="filesetup">
        <strong>File Setup</strong>
      </h2>
      <p>
        For the <strong>statements file</strong>, use a word processing program
        to create a plain text file of the statement. In the file, list all
        statements starting at the top of the page. Do not leave any empty
        spaces between the statements. Save with a *.txt file type.
      </p>
      <p>
        For the <strong>Q sorts file</strong>, use a spreadsheet program like
        Microsoft Excel, Google Sheets, or{" "}
        <a href="https://www.libreoffice.org/">
          <strong>Libre Office</strong>
        </a>{" "}
        to setup the file. In the file, the data should be organized by
        statement number. A header row showing the statement numbers is required
        at the top of the file. Participant names or identifiers should be
        listed in the first column. Q-sort data should start in the second
        column. Do not leave any empty rows between participant q-sort data.
        Save the file as a *.csv file type.{" "}
      </p>
      <h2 id="csvimportprocess">CSV Import Process</h2>
      <CsvInputImage />
      <ol>
        <li>
          <p>
            Click on the <strong>&quot;Load TXT File&quot;</strong> button and
            select your statements text file.
          </p>
        </li>
        <li>
          <p>
            Click on the <strong>&quot;Load CSV File&quot;</strong> button and
            select your Q sorts csv file.
          </p>
        </li>
        <li>
          <p>
            Type your project name in the{" "}
            <strong>&quot;Input Project Name&quot;</strong> text area.
          </p>
        </li>
        <li>
          <p>
            Click the forced / unforced selection radio button to select your
            q-sort data type.
          </p>
        </li>
        <li>
          <p>
            (Optional) If your study has unforced sorts, add your study's Q-sort
            design pattern by click the "Unforced" radio button and inputting
            the pattern into the form.
          </p>
        </li>
        <li>
          Navigate to the <strong>&quot;2. Data&quot;</strong> section to
          confirm that your data has successfully been loaded.{" "}
        </li>
      </ol>
    </MainContent>
  );
};

export default view(HelpSection);

const MainContent = styled.div`
  background-color: white;
  padding: 50px;
  user-select: all;
`;
