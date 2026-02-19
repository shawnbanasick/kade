import LoadingsTableTransitionContainer from './LoadingsTableTransitionContainer';

const Loadings = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-1 overflow-auto p-[5px] pt-[15px] px-[15px] visible animate-fadeIn transition-[visibility] duration-500 font-[Helvetica,sans-serif] text-[18px] bg-white w-[calc(100vw-135px)] select-none">
      <LoadingsTableTransitionContainer />
    </div>
  );
};

export default Loadings;
