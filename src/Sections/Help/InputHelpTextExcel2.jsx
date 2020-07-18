import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import ExcelType1Image from "./helpImages/ExcelType1Image";

const HelpSection = () => {
  return (
    <MainContent>
      <hr />
      <h1 id="exceltype2faq">Excel Type 2 FAQ:</h1>
      <ul>
        <li>
          <p>
            <strong>Can I use unforced sorts in a type 2 file ?</strong>
            <br /> Yes, you can use type 2 for forced and unforced sorts.
          </p>
        </li>
        <li>
          <p>
            <strong>Where can I get a copy of the sample file?</strong>
            <br /> Use this link:{" "}
            <a href="https://docs.google.com/spreadsheets/d/1mFnUSbqtQxJgBhlZbeKSo-xMSUDNpBD9JElI1k9xAg4/edit?usp=sharing">
              <strong>Type 2 Sample File</strong>
            </a>{" "}
          </p>
        </li>
        <li>
          <p>
            <strong>When should I use a type 2 file?</strong>
            <br /> Type 2 is in a format often used by online Q sorting
            software, so you should be able to copy and paste the sort data into
            the file. If you have unforced sorts in your project, you should use
            a Type 2 Excel file to load your data into KADE. If you are
            transcribing handwritten notes of forced q sorts, you should use the
            Type 1 Excel file format.{" "}
          </p>
        </li>
      </ul>
      <ExcelType1Image />
      <h2 id="importprocess">Import Process</h2>
      <ol>
        <li>
          On the Excel tab, click on the{" "}
          <strong>&quot;Load Type 2 Excel File&quot;</strong> button.
        </li>
        <li>Select your file from the dialog box.</li>
        <li>
          Navigate to section <strong>&quot;2. Data&quot;</strong> to confirm
          that your data has loaded properly.
        </li>
      </ol>
    </MainContent>
  );
};

export default view(HelpSection);

const MainContent = styled.div`
  background-color: white;
  user-select: all;
  padding: 50px;
`;
