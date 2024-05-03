import React from 'react';
import { view } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import PqmethodInputImage from './helpImages/k3-pqmethod.png';

const HelpSection = () => {
  return (
    <MainContent>
      <hr />
      <h2 id="pqmethodfileimportfaq">PQMethod File Import FAQ:</h2>
      <ul>
        <li>
          <p>
            <strong>What format is the .STA file?</strong>
            <br /> It is a simple text file of the statements.{' '}
          </p>
        </li>
        <li>
          <p>
            <strong>If I have unforced sorts, do I need to input my q-sort design?</strong>
            <br /> No, KADE can calculate the q-sort pattern from the data in the DAT file.{' '}
          </p>
        </li>
      </ul>

      <img src={PqmethodInputImage} width="1000px" alt="import pqmethod file" />

      <h2 id="importprocess">Import Process</h2>
      <ol>
        <li>
          On the PQMethod tab, click the <strong>&quot;Load STA File&quot;</strong> button.
        </li>
        <li>Select your file from the dialog box.</li>
        <li>
          Click on the <strong>&quot;Load DAT File&quot;</strong> button.
        </li>
        <li>
          (Optional) If you have unforced Q sorts, click the <strong>&quot;Unforced&quot;</strong>{' '}
          radio button.
        </li>
        <li>
          Navigate to the <strong>&quot;2. Data&quot;</strong> section to confirm that your data has
          loaded properly.
        </li>
      </ol>
    </MainContent>
  );
};

export default view(HelpSection);

const MainContent = styled.div`
  background-color: white;
  padding: 50px;
  padding-bottom: 150px;
  user-select: all;
`;
