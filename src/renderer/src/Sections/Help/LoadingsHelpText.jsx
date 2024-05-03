import React from 'react';
import { view } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import loadingTable from './helpImages/k3-loadings-1.png';

const HelpSection = () => {
  return (
    <MainContent>
      <h2 id="loadingssectionfaq">Loadings Section FAQ:</h2>
      <ul>
        <li>
          <p>
            <strong>Why are the participant numbers not ordered?</strong>
            <br /> The default table sort is by Factor Group (FG) - the highest loading factor for
            each participant sort. Clicking on the table headers will resort the table.
          </p>
        </li>
        <li>
          <p>
            <strong>
              Why are the Invert Factor, Varimax rotation, Auto-Flag, and row highlighting buttons
              disabled?
            </strong>
            <br /> These buttons are disabled after splitting a bipolar factor. If you undo the
            bipolar split, the buttons will become active again.
          </p>
        </li>
        <li>
          <p>
            <strong>
              What do the row highlighting colors in the in the Factor Loadings Table indicate?
            </strong>
            <br /> There is no specific meaning for these colors. Their purpose is just to make it
            easier to identify factors.{' '}
          </p>
        </li>
        <li>
          <p>
            <strong>
              What happens if I uncheck the{' '}
              <strong>&quot;Require Majority of Common Variance&quot;</strong> checkbox?
            </strong>
            <br /> If this box is unchecked then auto-flagging may flag a participant&#39;s Q sort
            in more than one factor.{' '}
          </p>
        </li>
        <li>
          <p>
            <strong>Can I download the factor loadings table?</strong>
            <br /> Starting with version 1.2.0, the factor loadings table is included in the
            standard KADE output file.{' '}
          </p>
        </li>
      </ul>
      <hr />
      <p>
        Loadings can be select individually by clicking the checkboxes, or you can use the{' '}
        <strong>&quot;Auto-Flag&quot;</strong> option.{' '}
      </p>
      <p>
        When satisfied with your factor loadings selections, click the orange{' '}
        <strong>&quot;Send Table Data to Output&quot;</strong> button, then navigate to the{' '}
        <strong>&quot;7. Output&quot;</strong> section.{' '}
      </p>
      <img src={loadingTable} width="1000px" alt="factor loadings table" />
    </MainContent>
  );
};

export default view(HelpSection);

const MainContent = styled.div`
  background-color: white;
  padding: 50px;
  user-select: all;
  overflow: auto;
`;
