import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";

const HelpSection = () => {
  const ExcelKadeImage = React.lazy(() =>
    import("./helpImages/ExcelKadeImage")
  );

  return (
    <MainContent>
      <hr />
      <h1 id="kadefileandkenqanalysisfileimportfaq">
        KADE File and Ken-Q Analysis File Import FAQ
      </h1>
      <p>
        <strong>
          Can I continue a previous KADE session using Type 3 data?
        </strong>
        <br /> No, The Excel Type 3 format is for re-loading data used during a
        previous KADE session. It does not allow the continuation of a previous
        analysis. It only loads the original statements and Q-sort data.
      </p>
      <ExcelKadeImage />
      <h2 id="dataimportprocess">Data Import Process</h2>
      <ol>
        <li>
          On the KADE tab, click the{" "}
          <strong>&quot;Load KADE Excel File&quot;</strong>.
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
