import state from '../../store';
import initialState from '../../initialState';
import GeneralButton from '../../Utils/GeneralButton';

function handleClick() {
  const initialStateValues = initialState();
  state.setState(initialStateValues);
}

const Attribution = ({ view }) => {
  return (
    <div
      className={`
        grid
        grid-cols-4
        justify-items-center
        items-center
        bg-white
        font-sans
        text-lg
        box-border
        overflow-auto
        transition-[visibility,opacity]
        duration-500
        linear
        [width:calc(100vw-125px)]
        [max-height:calc(100vh-22px)]
        [grid-template-rows:20px_155px_50px_30px_115px_120px_180px_20px]
        [grid-template-areas:'row1_row1_row1_row1'_'titleRow_titleRow_titleRow_titleRow'_'subtitleRow_subtitleRow_subtitleRow_subtitleRow'_'subtitleRow2_subtitleRow2_subtitleRow2_subtitleRow2'_'weblinkRow_weblinkRow_weblinkRow_weblinkRow'_'linkboxRow1_linkboxRow1_linkboxRow2_linkboxRow2'_'linkboxRow3_linkboxRow3_linkboxRow4_linkboxRow4']
        ${view ? 'invisible opacity-0' : 'visible opacity-100'}
      `}
    >
      <h1>Attribution</h1>
      <GeneralButton onClick={handleClick} size="large">
        Reset State
      </GeneralButton>
    </div>
  );
};

export default Attribution;
