import React from "react";
import { view, store } from "react-easy-state";
import styled, { keyframes } from "styled-components";
import StatementsList from "./StatementsList";
import QsortsPatternList from "./QsortsPatternList";
import ParticipantsQsortsGrid from "./ParticipantQsortsGrid";
import calcMultiplierArrayT2 from "../Input/Excel/excelLogic/calcMultiplierArrayT2";
import UnforcedSortsDisplay from "./UnforcedSortsDisplay";
import coreState from "../GlobalState/coreState";
import inputState from "../GlobalState/inputState";
import calcPatternArray from "./calcPatternArray";
import { useTranslation } from "react-i18next";
// const clone = require("rfdc")();

const localStore = store({
  sortsDisplayText: [],
  statements: [],
  projectName: "",
  numQsorts: 0,
  numStatements: 0,
  qSortPattern: ["none"],
  multiplierArray: [],
  mainDataObject: [],
  isForcedQsortPattern: false
});

function identifyUnforcedSortParticipants() {
  const unforcedSortParticipants = [];
  const mainDataObject = localStore.mainDataObject;
  const qSortPattern = localStore.qSortPattern.slice();
  const testArray = qSortPattern.toString();

  for (let i = 0; i < mainDataObject.length; i += 1) {
    const participantSort = mainDataObject[i].rawSort.slice();
    const participantName = mainDataObject[i].name;
    participantSort.sort((a, b) => a - b);
    const participantSort2 = participantSort.toString();
    if (participantSort2 !== testArray) {
      unforcedSortParticipants.push(participantName);
    }
  }
  const numberUnforced = unforcedSortParticipants.length;
  const returnValue = unforcedSortParticipants.toString();
  const returnValue2 = returnValue.replace(/,/g, ", ");
  return [returnValue2, numberUnforced];
}

const Data = () => {
  const { t } = useTranslation();

  const {
    mainDataObject,
    sortsDisplayText,
    statements,
    projectName,
    numQsorts,
    numStatements,
    qSortPattern
  } = coreState;

  const { isForcedQsortPattern, sortsLoaded, areQsortsLoaded } = inputState;

  let texts;
  let multiplierArray;

  if (qSortPattern) {
    multiplierArray = calcMultiplierArrayT2(qSortPattern);
    texts = calcPatternArray(multiplierArray);
  }

  let unforcedParticipants;
  let numberUnforced;
  if (
    !isForcedQsortPattern &&
    mainDataObject.length &&
    localStore.qSortPattern[0] !== "none" &&
    localStore.qSortPattern.length > 0
  ) {
    const unforcedParticipants1 = identifyUnforcedSortParticipants();
    unforcedParticipants = unforcedParticipants1[0];
    numberUnforced = unforcedParticipants1[1];
  }

  localStore.sortsDisplayText = sortsDisplayText;
  localStore.statements = statements;
  localStore.projectName = projectName;
  localStore.numQsorts = numQsorts;
  localStore.numStatements = numStatements;
  localStore.qSortPattern = qSortPattern;
  localStore.mainDataObject = mainDataObject;
  localStore.multiplierArray = multiplierArray;
  localStore.isForcedQsortPattern = !isForcedQsortPattern;

  if (areQsortsLoaded || sortsLoaded) {
    return (
      <MainContent>
        <ProjectTitle>{t("Project Data")}</ProjectTitle>
        <InformationContainer>
          <h2>
            {t("Project Name")}: {projectName}
          </h2>
          <h2>
            {t("Participants")}: {numQsorts}
          </h2>
          <h2>{`${t("Number of Statements")}: ${numStatements}`}</h2>
          {qSortPattern ? (
            <React.Fragment>
              <h2>{`${t("Q Sort Pattern")}: `}</h2>
              <QsortsPatternList texts={texts} />
            </React.Fragment>
          ) : null}
        </InformationContainer>
        <StatementListContainer>
          <h1>{`${t("Statements")}: `}</h1>
          <StatementsList statements={localStore.statements} />
        </StatementListContainer>
        <UnforcedContainer>
          {localStore.isForcedQsortPattern && (
            <UnforcedSortsDisplay
              number={numberUnforced}
              data={unforcedParticipants}
            />
          )}
        </UnforcedContainer>
        <SortsListContainer>
          <h1>{`${t("Participant Q Sorts")}: `}</h1>
          <ParticipantsQsortsGrid data={localStore.mainDataObject} />
        </SortsListContainer>
      </MainContent>
    );
  } else {
    return (
      <NoDataDiv>
        <h2>{t("No data loaded")}</h2>
      </NoDataDiv>
    );
  }
};

export default view(Data);

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
  display: grid;
  grid-template-columns: 190px 270px 190px 1fr;
  grid-template-rows: 100px 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "pageTitle pageTitle pageTitle pageTitle"
    "informationContainer informationContainer informationContainer informationContainer "
    "statementList statementList statementList statementList"
    "unforcedContainer unforcedContainer unforcedContainer unforcedContainer"
    "sortsList sortsList sortsList sortsList"
    "linkboxRow2 linkboxRow2 linkboxRow2 linkboxRow2";
  overflow: scroll;
  padding: 5px;
  padding-top: 15px;
  padding-left: 15px;
  padding-bottom: 5px;
  visibility: ${props => (props.view ? "hidden" : "visible")};
  animation: ${props => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;

  font-family: Helvetica, sans-serif;
  font-size: 18px;
  background-color: white;

  width: calc(100vw - 135px);
  max-height: calc(100vh - 22px);
  box-sizing: border-box;
  overflow: auto;
  user-select: none;
`;

const NoDataDiv = styled.div`
  margin: 50px;
`;

const ProjectTitle = styled.h1`
  grid-area: pageTitle;
  font-family: Helvetica, sans-serif;
  font-size: 50px;
  align-items: center;
  justify-items: center;
`;

const StatementListContainer = styled.div`
  grid-area: statementList;
  padding-bottom: 50px;
`;

const SortsListContainer = styled.div`
  grid-area: sortsList;
`;

const InformationContainer = styled.div`
  grid-area: informationContainer;
`;

const UnforcedContainer = styled.div`
  grid-area: unforcedContainer;
`;
