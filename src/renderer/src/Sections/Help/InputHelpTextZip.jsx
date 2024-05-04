import React from 'react';
import styled from 'styled-components';
import ZipInputImage1 from './helpImages/k3-input-zip-1.png';
import ZipInputImage2 from './helpImages/k3-input-zip-2.png';
import ZipInputImage3 from './helpImages/k3-input-zip-3.png';
import ZipInputImage4 from './helpImages/k3-input-zip-4.png';

const HelpSection = () => {
  return (
    <MainContent>
      <hr />
      <h1 id="easyhtmlqfaq">KADE Zip Files FAQ:</h1>
      <ul>
        <li>
          <p>
            <strong>What are KADE Zip files?</strong>
            <br /> These are UTF-8 formatted text files (optionally) bundled with DOCX output in
            KADE.
          </p>
        </li>
        <li>
          <p>
            <strong>Can a KADE Zip file be created manually?</strong>
            <br />
            Yes, create the files using a text editor and them compress them into a Zip file for
            import into KADE.
          </p>
        </li>
      </ul>

      <h2 id="importprocess">Import Process</h2>
      <ol>
        <li>
          A KADE Zip file contains 4 plain text files (UTF-8 format). These can be created manually
          and bundled into a Zip file. Do not use Microsoft Word to create these files. Use a text
          editor, like Notepad (pre-installed on Windows) or TextEdit (pre-installed on macOS).
        </li>

        <br />
        <br />
        <li>
          Create a file named <b>&quot;name.txt&quot;</b> with the <b>project name</b> as the only
          content.
        </li>
        <br />
        <img src={ZipInputImage1} width="700px" alt="import zip file" />
        <br />
        <br />
        <br />
        <li>
          Create a file named <b>&quot;pattern.txt&quot;</b> with the <b>Q sort pattern</b> as the
          only content. Each number respresents the number of statements in each column. The range
          is from -6 to +13. The image shows an example from the Lipset dataset, with 2 statements
          in the -4 column, 3 in the -3 column, 4 in the -2 column, and so on.
        </li>
        <br />
        <img src={ZipInputImage2} width="700px" alt="import json file" />
        <br />
        <br />
        <br />
        <li>
          Create a file named <b>&quot;sorts.txt&quot;</b> with the <b>participant sorts</b> as the
          only content. Each line represents a participant sort. The values are separated by a
          comma. The first entry in each line is the participant name. The first number represents
          the Q sort value for the first statement, the second number represents the Q sort value
          for the second statement, and so on.{' '}
        </li>
        <br />
        <img src={ZipInputImage3} width="700px" alt="import json file" />
        <br />
        <br />
        <br />
        <li>
          Finally, create a file named &quot;statements.txt&quot; with the project <b>statements</b>{' '}
          as the only content.
        </li>
        <br />
        <img src={ZipInputImage4} width="700px" alt="import json file" />
      </ol>
      <br />
      <br />
      <p>
        Once all of the files have been created, compress them into a Zip file for import into KADE.
      </p>
    </MainContent>
  );
};

export default HelpSection;

const MainContent = styled.div`
  background-color: white;
  padding: 50px;
  user-select: all;

  li {
    max-width: 700px;
  }
  p {
    max-width: 700px;
  }
`;
