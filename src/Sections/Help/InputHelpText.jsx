import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";

const HelpSection = () => {
  return (
    <MainContent>
      <h1 id="datainputsectionfaq">Data Input Section FAQ:</h1>
      <ul>
        <li>
          <p>
            <strong>What is the easiest way to set up data for input?</strong>
            <br /> Use the csv data input method
          </p>
        </li>
        <li>
          <p>
            <strong>
              Can I include unforced participant sorts in my project?
            </strong>
            <br /> Yes, you can import unforced sorts in all input methods
            except the Excel Type 1 method{" "}
          </p>
        </li>
        <li>
          <p>
            <strong>
              Can I continue a previous session using the Type 3 Excel Data?
            </strong>
            <br /> No, the Excel type 3 import will only load the original sort
            data
          </p>
        </li>
      </ul>
      <h2 id="datainput">Data Input</h2>
      <p>There are four ways to load your data into KADE: </p>
      <ul>
        <li>Comma Separated Value-formatted files (CSV)</li>
        <li>Microsoft Excel files, </li>
        <li>JSON output files from online sorting software (EasyHTMLQ),</li>
        <li>PQMethod project and statement files.</li>
      </ul>
      <p>
        The Excel type files are the most convenient since they bring all of the
        required information into a single file.{" "}
      </p>
      <h3 id="commaseparatedvaluescsv">Comma Separated Values (CSV)</h3>
      <p>
        Two csv-formatted files are required - one for statements, and one for
        the q-sorts. Studies using either forced (symmetric) q-sorts or unforced
        q-sorts can use the CSV format. This is the best format for long-term
        archiving of study data.
      </p>
      <h3 id="excelfiles">Excel Files</h3>
      <p>
        Three formats are available for importing data from an Excel file. For
        projects in which participants are forced to sort according to the
        q-sort design pattern, use the <strong>Excel Type 1 format</strong>.
        This format makes it easy to transfer data from hand-written notes or
        images of participant q-sorts.
      </p>
      <p>
        For projects that include participants that did not follow the q-sort
        pattern (unforced sorts), use the type{" "}
        <strong>Excel Type 2 format</strong>. In this format, participant
        Q-sorts are organized according to statement number.
      </p>
      <p>
        The <strong>KADE format or Excel Type 3 format</strong> is for
        re-loading data used during a previous KADE session or Ken-Q Analysis
        session. It does not allow the continuation of a previous analysis. It
        only loads the original statements and Q-sort data.
      </p>
      <h3 id="jsonfileseasyhtmlq">JSON Files (Easy HTMLQ)</h3>
      <p>
        Easy HTMLQ is a minor change to the HTMLQ project developed by aproxima
        Gesellschaft für Markt- und Sozialforschung Weimar that allows the use
        of the (free) Google Firebase service as the backend database.{" "}
        <strong>
          (
          <a href="https://github.com/shawnbanasick/easy-htmlq">
            Easy HTMLQ Download Link
          </a>
          ) (<a href="https://github.com/aproxima/htmlq">HTMLQ Download Link</a>
          )
        </strong>
      </p>
      <h3 id="pqmethodprojectfiles">PQMethod Project Files</h3>
      <p>
        A PQMethod study produces two project files - a file containing the
        statements (file type *.STA) and a file containing participant Q-sorts
        information (file type *.DAT). Both files are required to bring PQMethod
        data in KADE.{" "}
        <strong>
          (<a href="http://schmolck.org/qmethod/">Link to PQMethod</a>)
        </strong>
      </p>
    </MainContent>
  );
};

export default view(HelpSection);

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }

//   to {
//     opacity: 1;
//   }
// `;

// const fadeOut = keyframes`
//   from {
//     opacity: 1;
//   }

//   to {
//     opacity: 0;
//   }
// `;

const MainContent = styled.div`
  user-select: all;
  background-color: white;
  padding: 50px;
  padding-bottom: 150px;
`;
