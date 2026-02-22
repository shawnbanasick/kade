import { store } from '@risingstack/react-easy-state';
import state from '../../store';

const sorts = state.getState('sortsDisplayText');
const localStore = store({ sorts });

const StatementsInState = () => {
  return (
    <ol className="w-[80%] mt-[50px]">
      {localStore.sorts.map((value, index) => (
        <li className="w-[1150px] wrap-break-word" key={value + index.toString()}>
          {value}
        </li>
      ))}
    </ol>
  );
};

export default StatementsInState;
