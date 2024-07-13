import coreState from '../../GlobalState/coreState';
import projectHistoryState from '../../GlobalState/projectHistoryState';
import inputState from '../../GlobalState/inputState';
import i18n from 'i18next';

export default function uploadLipsetData() {
  // const updateProjectHistoryArray = projectHistoryState((state) => state.updateProjectHistoryArray);
  // // update core state
  // const updateProjectName = coreState((state) => state.updateProjectName);
  // const updateStatements = coreState((state) => state.updateStatements);
  // const updateNumQsorts = coreState((state) => state.updateNumQsorts);
  // const updateNumStatements = coreState((state) => state.updateNumStatements);
  // const updateQSortPattern = coreState((state) => state.updateQSortPattern);
  // const updateMultiplierArray = coreState((state) => state.updateMultiplierArray);
  // const updateMainDataObject = coreState((state) => state.updateMainDataObject);
  // const updateSortsDisplayText = coreState((state) => state.updateSortsDisplayText);
  // const updateStatementNumArray = coreState((state) => state.updateStatementNumArray);
  // const updateRespondentNames = coreState((state) => state.updateRespondentNames);
  // // update input state
  // const updateAreQsortsLoaded = inputState((state) => state.updateAreQsortsLoaded);
  // const updateAreStatementsLoaded = inputState((state) => state.updateAreStatementsLoaded);

  coreState.setState({ projectName: 'Lipset Demo' });

  const logMessageObj1 = {
    logMessage: `Lipset project ${i18n.t('loaded from demo data')}`,
    logType: 'lipsetInput',
  };

  projectHistoryState.setState({ projectHistoryArray: [logMessageObj1] });

  coreState.setState({
    statements: [
      '1. We accept improvements in status and power of lower class  ',
      '2. All men expected to try to improve selves                  ',
      '3. Success in life by a previously deprived person is resented',
      '4. Men can expect fair treatment according to merit           ',
      '5. Lower-class not revolutionary                              ',
      '6. Political goals relatively moderate, even conservative     ',
      '7. Those born to high place in society should retain it       ',
      '8. Person with wealth deserves place in high society          ',
      '9. We try to eliminate privileged classes                     ',
      '10. We accept aristocratic-type titles and other honors        ',
      '11. The government has its secrets, this is generally accepted ',
      '12. Emphasis on publicity in political matters: no secrets     ',
      '13. Encouraged to think of ourselves as competing for success  ',
      '14. Social status equated with manner of speech                ',
      '15. We take law into our own hands, mob action and vigilantes  ',
      '16. Close ties to Mother Country, as Britain still is for many ',
      '17. We prefer companionship and helping hand                   ',
      '18. Some disdain for acquiring wealth for its own sake         ',
      '19. High value placed on protecting and promoting underdog     ',
      '20. We like the idea of a welfare state                        ',
      '21. We value the race for success                              ',
      '22. Corrupt means of achieving success are accepted            ',
      '23. One law for the rich, another for the poor                 ',
      '24. Lack of respect for the police, and law enforcement        ',
      '25. Trust in police has sunk deeply into our national character',
      '26. Worth of a man is judged by what he is, not by education   ',
      '27. Deep respect for the rich, the educated, the social elite  ',
      `28. We are tolerant of popular opinion, don't like extremes    `,
      '29. Poor on earth will enjoy higher status in after-life       ',
      '30. Respect for civil liberties and minority rights            ',
      '31. Virtue tends to be its own reward                          ',
      '32. Position of depressed classes must be raised               ',
      '33. Emphasis is on getting ahead',
    ],
  });

  coreState.setState({ numQsorts: 9 });
  coreState.setState({ numStatements: 33 });
  coreState.setState({
    qSortPattern: [
      -4, -4, -3, -3, -3, -2, -2, -2, -2, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2,
      2, 3, 3, 3, 4, 4,
    ],
  });

  coreState.setState({
    multiplierArray: [0, 0, 2, 3, 4, 5, 5, 5, 4, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });

  coreState.setState({
    mainDataObject: [
      {
        name: 'US1',
        posShiftSort: [
          4, 5, 3, 5, 3, 6, 5, 4, 5, 4, 6, 6, 7, 8, 4, 1, 2, 2, 4, 1, 8, 7, 8, 6, 6, 5, 9, 7, 7, 2,
          3, 3, 9,
        ],
        rawSort: [
          -1, 0, -2, 0, -2, 1, 0, -1, 0, -1, 1, 1, 2, 3, -1, -4, -3, -3, -1, -4, 3, 2, 3, 1, 1, 0,
          4, 2, 2, -3, -2, -2, 4,
        ],
        displaySort:
          '-1,0,-2,0,-2,1,0,-1,0,-1,1,1,2,3,-1,-4,-3,-3,-1,-4,3,2,3,1,1,0,4,2,2,-3,-2,-2,4',
      },
      {
        name: 'US2',
        posShiftSort: [
          4, 5, 4, 2, 7, 8, 6, 6, 1, 5, 7, 4, 9, 4, 6, 2, 5, 3, 3, 5, 8, 3, 6, 5, 7, 6, 7, 8, 4, 1,
          3, 2, 9,
        ],
        rawSort: [
          -1, 0, -1, -3, 2, 3, 1, 1, -4, 0, 2, -1, 4, -1, 1, -3, 0, -2, -2, 0, 3, -2, 1, 0, 2, 1, 2,
          3, -1, -4, -2, -3, 4,
        ],
        displaySort:
          '-1,0,-1,-3,2,3,1,1,-4,0,2,-1,4,-1,1,-3,0,-2,-2,0,3,-2,1,0,2,1,2,3,-1,-4,-2,-3,4',
      },
      {
        name: 'US3',
        posShiftSort: [
          7, 3, 3, 9, 4, 5, 1, 2, 6, 1, 2, 8, 8, 7, 5, 2, 7, 4, 6, 5, 6, 3, 5, 7, 3, 8, 6, 4, 5, 4,
          4, 9, 6,
        ],
        rawSort: [
          2, -2, -2, 4, -1, 0, -4, -3, 1, -4, -3, 3, 3, 2, 0, -3, 2, -1, 1, 0, 1, -2, 0, 2, -2, 3,
          1, -1, 0, -1, -1, 4, 1,
        ],
        displaySort:
          '2,-2,-2,4,-1,0,-4,-3,1,-4,-3,3,3,2,0,-3,2,-1,1,0,1,-2,0,2,-2,3,1,-1,0,-1,-1,4,1',
      },
      {
        name: 'US4',
        posShiftSort: [
          8, 6, 2, 4, 4, 8, 2, 3, 5, 1, 4, 5, 8, 3, 2, 1, 4, 7, 9, 3, 9, 6, 6, 3, 5, 6, 4, 7, 5, 7,
          6, 7, 5,
        ],
        rawSort: [
          3, 1, -3, -1, -1, 3, -3, -2, 0, -4, -1, 0, 3, -2, -3, -4, -1, 2, 4, -2, 4, 1, 1, -2, 0, 1,
          -1, 2, 0, 2, 1, 2, 0,
        ],
        displaySort:
          '3,1,-3,-1,-1,3,-3,-2,0,-4,-1,0,3,-2,-3,-4,-1,2,4,-2,4,1,1,-2,0,1,-1,2,0,2,1,2,0',
      },
      {
        name: 'JP5',
        posShiftSort: [
          1, 4, 8, 4, 6, 6, 9, 7, 1, 9, 7, 5, 4, 8, 5, 7, 5, 3, 3, 5, 4, 7, 6, 2, 2, 2, 8, 5, 6, 3,
          6, 3, 4,
        ],
        rawSort: [
          -4, -1, 3, -1, 1, 1, 4, 2, -4, 4, 2, 0, -1, 3, 0, 2, 0, -2, -2, 0, -1, 2, 1, -3, -3, -3,
          3, 0, 1, -2, 1, -2, -1,
        ],
        displaySort:
          '-4,-1,3,-1,1,1,4,2,-4,4,2,0,-1,3,0,2,0,-2,-2,0,-1,2,1,-3,-3,-3,3,0,1,-2,1,-2,-1',
      },
      {
        name: 'CA6',
        posShiftSort: [
          6, 2, 5, 8, 8, 9, 3, 5, 3, 3, 6, 4, 6, 5, 1, 8, 4, 5, 6, 4, 3, 2, 4, 1, 7, 7, 5, 9, 4, 7,
          6, 7, 2,
        ],
        rawSort: [
          1, -3, 0, 3, 3, 4, -2, 0, -2, -2, 1, -1, 1, 0, -4, 3, -1, 0, 1, -1, -2, -3, -1, -4, 2, 2,
          0, 4, -1, 2, 1, 2, -3,
        ],
        displaySort:
          '1,-3,0,3,3,4,-2,0,-2,-2,1,-1,1,0,-4,3,-1,0,1,-1,-2,-3,-1,-4,2,2,0,4,-1,2,1,2,-3',
      },
      {
        name: 'UK7',
        posShiftSort: [
          7, 5, 3, 6, 5, 6, 4, 2, 5, 4, 6, 4, 6, 7, 1, 9, 8, 7, 5, 7, 3, 4, 2, 1, 8, 3, 5, 9, 2, 6,
          4, 8, 3,
        ],
        rawSort: [
          2, 0, -2, 1, 0, 1, -1, -3, 0, -1, 1, -1, 1, 2, -4, 4, 3, 2, 0, 2, -2, -1, -3, -4, 3, -2,
          0, 4, -3, 1, -1, 3, -2,
        ],
        displaySort:
          '2,0,-2,1,0,1,-1,-3,0,-1,1,-1,1,2,-4,4,3,2,0,2,-2,-1,-3,-4,3,-2,0,4,-3,1,-1,3,-2',
      },
      {
        name: 'US8',
        posShiftSort: [
          3, 7, 5, 2, 1, 9, 5, 4, 4, 4, 6, 4, 6, 4, 9, 5, 5, 6, 2, 6, 7, 7, 8, 8, 2, 6, 1, 8, 5, 3,
          3, 3, 7,
        ],
        rawSort: [
          -2, 2, 0, -3, -4, 4, 0, -1, -1, -1, 1, -1, 1, -1, 4, 0, 0, 1, -3, 1, 2, 2, 3, 3, -3, 1,
          -4, 3, 0, -2, -2, -2, 2,
        ],
        displaySort:
          '-2,2,0,-3,-4,4,0,-1,-1,-1,1,-1,1,-1,4,0,0,1,-3,1,2,2,3,3,-3,1,-4,3,0,-2,-2,-2,2',
      },
      {
        name: 'FR9',
        posShiftSort: [
          8, 6, 5, 6, 1, 2, 7, 7, 3, 5, 5, 3, 6, 9, 4, 3, 7, 4, 7, 6, 8, 2, 2, 3, 6, 5, 4, 1, 5, 4,
          8, 4, 9,
        ],
        rawSort: [
          3, 1, 0, 1, -4, -3, 2, 2, -2, 0, 0, -2, 1, 4, -1, -2, 2, -1, 2, 1, 3, -3, -3, -2, 1, 0,
          -1, -4, 0, -1, 3, -1, 4,
        ],
        displaySort:
          '3,1,0,1,-4,-3,2,2,-2,0,0,-2,1,4,-1,-2,2,-1,2,1,3,-3,-3,-2,1,0,-1,-4,0,-1,3,-1,4',
      },
    ],
  });

  coreState.setState({
    sortsDisplayText: [
      'US1: -1,0,-2,0,-2,1,0,-1,0,-1,1,1,2,3,-1,-4,-3,-3,-1,-4,3,2,3,1,1,0,4,2,2,-3,-2,-2,4',
      'US2: -1,0,-1,-3,2,3,1,1,-4,0,2,-1,4,-1,1,-3,0,-2,-2,0,3,-2,1,0,2,1,2,3,-1,-4,-2,-3,4',
      'US3: 2,-2,-2,4,-1,0,-4,-3,1,-4,-3,3,3,2,0,-3,2,-1,1,0,1,-2,0,2,-2,3,1,-1,0,-1,-1,4,1',
      'US4: 3,1,-3,-1,-1,3,-3,-2,0,-4,-1,0,3,-2,-3,-4,-1,2,4,-2,4,1,1,-2,0,1,-1,2,0,2,1,2,0',
      'JP5: -4,-1,3,-1,1,1,4,2,-4,4,2,0,-1,3,0,2,0,-2,-2,0,-1,2,1,-3,-3,-3,3,0,1,-2,1,-2,-1',
      'CA6: 1,-3,0,3,3,4,-2,0,-2,-2,1,-1,1,0,-4,3,-1,0,1,-1,-2,-3,-1,-4,2,2,0,4,-1,2,1,2,-3',
      'UK7: 2,0,-2,1,0,1,-1,-3,0,-1,1,-1,1,2,-4,4,3,2,0,2,-2,-1,-3,-4,3,-2,0,4,-3,1,-1,3,-2',
      'US8: -2,2,0,-3,-4,4,0,-1,-1,-1,1,-1,1,-1,4,0,0,1,-3,1,2,2,3,3,-3,1,-4,3,0,-2,-2,-2,2',
      'FR9: 3,1,0,1,-4,-3,2,2,-2,0,0,-2,1,4,-1,-2,2,-1,2,1,3,-3,-3,-2,1,0,-1,-4,0,-1,3,-1,4',
    ],
  });

  coreState.setState({
    statementNumArray: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31, 32, 33,
    ],
  });

  coreState.setState({
    respondentNames: ['US1', 'US2', 'US3', 'US4', 'JP5', 'CA6', 'UK7', 'US8', 'FR9'],
  });

  inputState.setState({ areQsortsLoaded: true });
  inputState.setState({ areStatementsLoaded: true });
  inputState.setState({ isQsortPatternLoaded: true });
}
