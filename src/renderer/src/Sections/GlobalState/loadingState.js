import { store } from '@risingstack/react-easy-state';

const loadingState = store({
  autoflagButtonColor: '#d6dbe0',
  autoFlagHistory: [],

  bipolarDisabled: false,
  bipolarIndexArray: [],
  bipolarSplitCount: 0,

  currentLoadingsTable: [],

  factorToInvert: undefined,
  factorToSplit: undefined,

  gridColDefsLoadingsTable: [],
  gridRowDataLoadingsTable: [],

  highlighting: 'grays',

  isLoadingFactorsKept: false,
  isLoadingAutoflag: false,
  isLoadingsTableInitialRender: true,

  notifyDataSentToOutputSuccess: false,

  respondentNamesMaxLength: 20,
  requireMajorityCommonVariance: true,

  sendDataToOutputButtonColor: '#d6dbe0',
  showInvertFactorModal: false,
  showLoadingsTable: false,
  showSplitFactorModal: false,

  bipolarFactorsArray: [],
  splitFactorsArrayArchive: [],
  splitFactorsArray: [
    {
      key: 'factor1',
      text: '1',
      value: 1
    },
    {
      key: 'factor2',
      text: '2',
      value: 2
    },
    {
      key: 'factor3',
      text: '3',
      value: 3
    },
    {
      key: 'factor4',
      text: '4',
      value: 4
    },
    {
      key: 'factor5',
      text: '5',
      value: 5
    },
    {
      key: 'factor6',
      text: '6',
      value: 6
    },
    {
      key: 'factor7',
      text: '7',
      value: 7
    },
    {
      key: 'factor8',
      text: '8',
      value: 8
    }
  ],

  userSelectedSigLevel: 1.96
});

export default loadingState;
