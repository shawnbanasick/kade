import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
// import QsortsDropzone from "./DropzoneCsvQsorts";
import LoadCsvQsorts from "./LoadCsvQsorts";

const CsvQsortsCard = () => (
  <Card>
    <CardMeta>
      <p>2. Load Q sorts as a CSV File</p>
    </CardMeta>
    <Image>
      <img
        alt="Q sorts sample"
        src="data:image/png;base64,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"
      />
    </Image>
    <LoadCsvQsorts />
  </Card>
);

export default view(CsvQsortsCard);

const Card = styled.div`
  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  align-items: center;
  background-color: white;
  border: 2px solid black;
  height: 345px;
  width: 280px;
  border: 2px solid darkgray;
  border-radius: 5px;
`;

// const CardContent = styled.div`
//   height: 390px;
//   width: 240px;
//   background-color: white;
//   border: 2px solid red;
// `;

// const CardHeader = styled.div`
//   width: 100%;
//   height: 30px;
//   background-color: white;
// `;

const Image = styled.div`
  background-color: white;
  width: 275px;
  height: 175px;
`;

const CardMeta = styled.div`
  background-color: white;
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  font-weight: bold;
`;

// const CardDescription = styled.div`
//   height: 90px;
//   width: 270px;
//   background-color: white;
//   border: 2px solid black;
// `;
