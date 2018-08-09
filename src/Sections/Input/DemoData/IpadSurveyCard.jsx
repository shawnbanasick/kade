import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import LoadIpadSurveyData from "./LoadIpadSurveyData";

const IpadSurveyCard = () => (
  <Card>
    <CardMeta>iPad Survey</CardMeta>
    <CardLabel>60 Statements</CardLabel>
    <CardSubLabel>80 Participants</CardSubLabel>
    <LoadIpadSurveyData />
  </Card>
);

export default view(IpadSurveyCard);

const Card = styled.div`
  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  align-items: center;
  background-color: white;
  border: 2px solid black;
  height: 300px;
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
