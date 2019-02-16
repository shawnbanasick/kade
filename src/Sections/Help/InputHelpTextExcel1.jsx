import React, { Component } from "react";
import { view } from "react-easy-state";
import styled, { keyframes } from "styled-components";
import ExcelType1Image from './helpImages/ExcelType1Image';

class HelpSection extends Component {
  render() {
    return (
      <MainContent>
        <hr />
        <h1 id="exceltype1inputfaq">Excel Type 1 Input FAQ:</h1>
        <ul>
          <li>
            <p><strong>Can I use unforced sorts in a type 1 file ?</strong>
              <br /> No, use type 2 for unforced sorts.</p>
          </li>
          <li>
            <p><strong>Where can I get a copy of the sample file?</strong>
              <br /> Use this link: <a href="https://docs.google.com/spreadsheets/d/1AgQj1Fd31oigDRLj_X6nYvQLcvSRzmZMOlwcpu2Yxik/edit?usp=sharing"><strong>Type 1 Sample File</strong></a>        </p>
          </li>
          <li>
            <p><strong>When should I use a type 1 file?</strong>
              <br /> Type 1 makes it easy to input q-sort data when you are working from hand-written notes or images of the participant sorts. </p>
          </li>
        </ul>
        <br/>
        <ExcelType1Image />
        <h2 id="filesetup">File Setup</h2>
        <h3 id="step1downloadthesamplefile">Step 1 - Download the Sample File</h3>
        <p>You have to download the file to your computer before you can begin adding your data.
          <a href="https://docs.google.com/spreadsheets/d/1AgQj1Fd31oigDRLj_X6nYvQLcvSRzmZMOlwcpu2Yxik/edit?usp=sharing"><strong>Link to Type 1 Sample File</strong></a></p>
        <h3 id="step2addtheprojectname">Step 2 - Add the Project Name</h3>
        <p>Find the blue-colored cell for Project Name and add your project name next to it.</p>
        <h3 id="step3addadescriptionoftheqsortdesign">Step 3 - Add a Description of the Q-sort Design</h3>
        <p>Input the numbers of cards in each pile of the Q-sort Design into the specified columns listed in the Excel file.</p>
        <h3 id="step4addthesortvaluestothefile">Step 4 - Add the Sort Values to the File</h3>
        <h3 id="step5addyourparticipantsdatatothefileandsave">Step 5 - Add Your Participants' Data to the File and Save</h3>
      </MainContent>
      );
  }
}

export default view(HelpSection);

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const MainContent = styled.div`
  background-color: white;
  padding: 50px;
  user-select: all;
`;
