import LoadingsTableTransitionContainer from './LoadingsTableTransitionContainer';

const Loadings = () => {
  return (
    <div className="flex border-4 h-screen border-t-18 border-grey-button overflow-auto p-1.25 pt-7.5 px-2.5 visible animate-fadeIn transition-[visibility] duration-500 font-[Helvetica,sans-serif] text-[18px] bg-white w-[calc(100vw-135px)] select-none text-black">
      <LoadingsTableTransitionContainer />
    </div>
  );
};

export default Loadings;
