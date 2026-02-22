const LoadButton = ({ children, isActive, onClick, className = '' }) => {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center justify-center h-[60px] px-[15px] w-[250px] text-center
        font-sans font-normal rounded-[4px] mr-[3px] mb-[3px] cursor-pointer
        text-black no-underline transition-[box-shadow] duration-300 translate-z-0
        hover:[box-shadow:inset_0_0_0_4px_#666,_0_0_1px_transparent]
        active:opacity-60 active:[box-shadow:0_0_1px_0_black_inset]
        ${
          isActive
            ? 'bg-[var(--main-theme-color)] [box-shadow:inset_0_0_0_2px_#666,_0_0_1px_transparent]'
            : 'bg-[#d6dbe0] [box-shadow:inset_0_0_0_0px_#666,_0_0_0px_transparent]'
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default LoadButton;
