import state from '../../store';
import ExtendedErrorModal from '../Input/ExtendedErrorModal';
import GeneralButton from '../../Utils/GeneralButton';

function handleOnClick() {
  state.setState({
    showErrorMessageBarOutput: false,
    errorStackTrace: 'no stack trace available',
  });
}

const ErrorNotificationOutput = () => {
  const showErrorMessageBarOutput = true;
  console.log('ErrorNotificationOUtput');
  const errorMessage = state.getState('errorMessage');

  if (showErrorMessageBarOutput) {
    return (
      <div
        className="
          absolute flex items-center justify-between
          left-[155px] bottom-[50px] mb-[5px] z-[9999]
          w-[calc(100vw-188px)] h-[50px]
          bg-[rgba(255,102,102,0.8)]
          px-[10px]
          font-sans text-xl
          rounded
        "
      >
        <div>Error - {errorMessage}</div>
        <ExtendedErrorModal />
        <div>
          <GeneralButton
            className="
              wrapper1
              shadow-[0_2px_2px_0_black]
              hover:shadow-[0_2px_2px_0_black]
              active:shadow-[inset_0_0_1px_0_black]
              active:ml-[3px]
            "
            onClick={handleOnClick}
          >
            Close
          </GeneralButton>
        </div>
      </div>
    );
  }
  return null;
};

export default ErrorNotificationOutput;
