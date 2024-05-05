import projectHistoryState from '../GlobalState/projectHistoryState';

const initializeProjectHistoryState = () => {
  const updateProjectHistoryArray = projectHistoryState((state) => state.updateProjectHistoryArray);

  updateProjectHistoryArray([]);

  return;
};

export default initializeProjectHistoryState;
