import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";

const HelpSection = () => {
  const JsonInputImage = React.lazy(() =>
    import("./helpImages/JsonInputImage")
  );

  return (
    <MainContent>
      <hr />
      <h1 id="easyhtmlqfaq">JSON and Easy HTMLQ FAQ:</h1>
      <ul>
        <li>
          <p>
            <strong>What is Easy HTMLQ?</strong>
            <br /> It is a slightly modified version of the online q-sort
            software &quot;HTMLQ&quot;. It uses Google&#39;s Firebase service as
            the backend database to store participant q-sorts. More information
            is available{" "}
            <a href="https://docs.google.com/presentation/d/1fOYxQOo2XpgR1lZ4gyGO_dRi9Ehh6-0TN98us2xPEPs/edit?usp=sharing">
              <strong>here</strong>
            </a>{" "}
          </p>
        </li>
        <li>
          <p>
            <strong>What is JSON?</strong>
            <br /> JSON is &quot;JavaScript Object Notation&quot;, a file format
            often used to pass data between servers and web pages on the
            internet.{" "}
          </p>
        </li>
        <li>
          <p>
            <strong>Can I import JSON files from other sources?</strong>
            <br /> Yes, as long as they have the same format as the HTMLQ JSON
            file.{" "}
          </p>
        </li>
      </ul>
      <h2 id="jsonformat">JSON Format</h2>
      <p>
        The Q sorts key value must be &quot;sort&quot;, and the Q sort values
        must be a text string with the values separated by bars. (The same style
        used by HTMLQ and Easy HTMLQ.)
      </p>
      <JsonInputImage />
      <h2 id="importprocess">Import Process</h2>
      <ol>
        <li>
          On the JSON tab, click the <strong>&quot;Load TXT File&quot;</strong>{" "}
          button.
        </li>
        <li>Select your statements file from the dialog box.</li>
        <li>
          Click the <strong>&quot;Load JSON File&quot;</strong> button.
        </li>
        <li>Select your JSON file from the dialog box.</li>
        <li>
          Click on the <strong>&quot;Input Project Name&quot;</strong> text
          area, and add your project name.
        </li>
        <li>
          <strong>Important &gt;&gt;&gt;</strong> Click the{" "}
          <strong>&quot;ID:&quot;</strong> dropdown and select the id variable
          for your project.
        </li>
        <li>
          (optional) If you have unforced data, click the{" "}
          <strong>&quot;Unforced&quot;</strong> radio button and enter the
          number of sort cards in each column for your project.
        </li>
        <li>
          (Optional) Click the{" "}
          <strong>&quot;Download JSON data as CSV&quot;</strong> button to view
          the other participant response data in the JSON file in a spreadsheet.
        </li>
        <li>
          Navigate to the <strong>&quot;2. Data&quot;</strong> section to
          confirm that your data has loaded properly.
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
