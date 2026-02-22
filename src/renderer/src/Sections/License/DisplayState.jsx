import { store } from '@risingstack/react-easy-state';
import state from '../../store';

const localStore = store({ state });

const DisplayState = () => {
  const result = Object.keys(state).map((key) => {
    if (typeof state[key] === 'function') {
      return [key, 'function'];
    }
    if (typeof state[key] === 'object') {
      return [key, 'array or object'];
    }
    return [key, state[key].toString()];
  });
  localStore.state = result;
  return (
    <ol className="w-[80%] mt-[50px]">
      {localStore.state.map((value, index) => (
        <li className="w-[1150px] break-words" key={value + index.toString()}>
          {value[0]}
          {': '}
          {value[1]}
        </li>
      ))}
    </ol>
  );
};

export default DisplayState;
