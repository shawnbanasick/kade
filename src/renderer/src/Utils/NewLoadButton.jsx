import React from 'react';

const LoadButton = ({ isActive = false, disabled = false, onClick, children, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={isActive}
      className={`
        flex items-center justify-center
        h-[60px] px-[15px] w-[250px]
        text-center font-normal text-[calc(10px+1vw)]
        font-[Helvetica,sans-serif]
        rounded mr-[3px] mb-[3px]
        no-underline text-black
        transition-[box-shadow] duration-300
        transform translate-z-0
        ${
          isActive
            ? 'bg-[var(--main-theme-color)] shadow-[inset_0_0_0_2px_#666,_0_0_1px_transparent]'
            : 'bg-[#d6dbe0] shadow-[inset_0_0_0_0px_#666,_0_0_0px_transparent]'
        }
        ${
          disabled
            ? 'opacity-40 cursor-not-allowed'
            : 'cursor-pointer hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] active:shadow-[0_0_1px_0_black_inset] active:opacity-60'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default LoadButton;
