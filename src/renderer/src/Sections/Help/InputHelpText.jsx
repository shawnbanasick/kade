import React from 'react';

import styled from 'styled-components';

const HelpSection = () => {
  return (
    <MainContent>
      <h1 id="datainputsectionfaq">Data Input Section FAQ:</h1>
      <ul>
        <li>
          <p>
            <strong>What is the easiest way to set up data for input?</strong>
            <br /> Use the XLSX Type 1 input for manual Q sort data, and XLSX Type 2 for online Q
            sorting data.
          </p>
        </li>
        <li>
          <p>
            <strong>Can I include unforced participant sorts in my project?</strong>
            <br /> Yes, you can import unforced sorts in all input methods except the XLSX Type 1
            method{' '}
          </p>
        </li>
        <li>
          <p>
            <strong>Can I continue a previous session using the KADE XLSX output data?</strong>
            <br /> No, the KADE XLSX output file (type 3) import will only load the original sort
            data
          </p>
        </li>
      </ul>
      <h2 id="datainput">Data Input</h2>
      <p>There are five ways to load Q sort data into KADE: </p>
      <ul>
        <li>Spreadsheet XLSX file</li>
        <li>Spreadsheet XLSX output file from a previous KADE session, </li>
        <li>ZIP output file from a previous KADE session.</li>
        <li>EQ Web Sort output files (online web sorting software),</li>
        <li>PQMethod files.</li>
      </ul>

      <h3 id="excelfiles">Spreadsheet XLSX Files</h3>
      <p>
        Three formats are available for importing data from an spreadsheet file. For projects in
        which participants are forced to sort according to the q-sort design pattern, use the{' '}
        <strong>XLSX Type 1 format</strong>. This format makes it easy to transfer data from
        hand-written notes or images of participant q-sorts.
      </p>
      <p>
        For projects that include participants that did not follow the q-sort pattern (unforced
        sorts), use the type <strong>XLSX Type 2 format</strong>. In this format, participant
        Q-sorts are organized according to statement number.
      </p>
      <p>
        The <strong>KADE XLSX output format</strong> is for re-loading data used during a previous
        KADE session or Ken-Q Analysis session. It does not allow the continuation of a previous
        analysis. It only loads the original statements and Q-sort data.
      </p>
      <h3 id="zipFile">Zip File from KADE ouput</h3>
      <p>
        Starting with version 1.3.0, KADE can export analysis results as a text document (DOCX
        format) bundled with the input files in a plain text, utf-8 format. The zip file can be used
        to load a new session without uncompressing the file{' '}
      </p>

      <h3 id="jsonfileseasyhtmlq">EQ Web Sort Files</h3>
      <p>
        EQ Web Sort is Do-It-Yourself online Q sorting software. No web development skills are
        required. Participant Q sort data are output in a{' '}
        <strong>
          <CustomAnchor
            target="_blank"
            rel="noopener noreferrer"
            href="https://en.wikipedia.org/wiki/JSON"
          >
            JSON
          </CustomAnchor>
        </strong>{' '}
        or CSV formatted file. Project statements should be in plain text format.
        <strong>
          {' '}
          (
          <CustomAnchor
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/shawnbanasick/eq-web-sort"
          >
            EQ Web Sort Homepage
          </CustomAnchor>
          )
        </strong>
      </p>
      <h3 id="pqmethodprojectfiles">PQMethod Project Files</h3>
      <p>
        A PQMethod study produces two project files - a file containing the statements (file type
        *.STA) and a file containing participant Q-sorts information (file type *.DAT). Both files
        are required to bring PQMethod data in KADE.{' '}
        <strong>
          (
          <CustomAnchor
            target="_blank"
            rel="noopener noreferrer"
            href="http://schmolck.org/qmethod/"
          >
            PQMethod Homepage
          </CustomAnchor>
          )
        </strong>
      </p>
    </MainContent>
  );
};

export default HelpSection;

const CustomAnchor = styled.a`
  color: #d35400 !important;
  text-decoration: underline !important;
  &:hover {
    color: blue !important;
  }
`;

const MainContent = styled.div`
  user-select: all;
  background-color: white;
  padding: 50px;
  padding-bottom: 20px;
  p {
    max-width: 700px;
  }
`;
