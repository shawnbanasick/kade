import { store } from '@risingstack/react-easy-state';
import state from '../../store';

const statements = state.getState('statements');
const localStore = store({ statements });

const StatementsInState = () => {
  return (
    <ol className="w-[80%] mt-[50px]">
      {localStore.statements.map((value, index) => (
        <li className="w-[1150px] wrap-break-word" key={value + index.toString()}>
          {value}
        </li>
      ))}
    </ol>
  );
};

export default StatementsInState;
