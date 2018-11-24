import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import LoadLipsetData from "./LoadLipsetData";

const LipsetCard = () => (
  <Card>
    <CardMeta>Lipset</CardMeta>
    <CardLabel>33 Statements</CardLabel>
    <CardSubLabel>9 Participants</CardSubLabel>
    <LoadLipsetData />
  </Card>
);

export default view(LipsetCard);

const Card = styled.div`
  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  align-items: center;
  background-color: white;
  border: 2px solid black;
  height: 250px;
  width: 280px;
  border: 2px solid darkgray;
  border-radius: 5px;
`;

const CardMeta = styled.div`
  background-color: white;
  font-family: Helvetica, sans-serif;
  font-size: 28px;
  font-weight: bold;
`;

const CardLabel = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 18px;
`;

const CardSubLabel = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 18px;
`;
