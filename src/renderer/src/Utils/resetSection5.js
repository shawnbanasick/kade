import loadingState from '../Sections/GlobalState/loadingState';

const resetSection5 = () => {
  loadingState.setState({
    showLoadingsTable: false,
    sendDataToOutputButtonColor: '#d6dbe0',
    splitFactorsArrayArchive: [],
    splitFactorsArray: [
      {
        key: 'factor1',
        text: '1',
        value: 1,
      },
      {
        key: 'factor2',
        text: '2',
        value: 2,
      },
      {
        key: 'factor3',
        text: '3',
        value: 3,
      },
      {
        key: 'factor4',
        text: '4',
        value: 4,
      },
      {
        key: 'factor5',
        text: '5',
        value: 5,
      },
      {
        key: 'factor6',
        text: '6',
        value: 6,
      },
      {
        key: 'factor7',
        text: '7',
        value: 7,
      },
      {
        key: 'factor8',
        text: '8',
        value: 8,
      },
    ],
  });
  return;
};

export default resetSection5;
