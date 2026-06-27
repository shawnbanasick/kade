const GeneralButton = ({ height, width, disabled, onClick, className = '', ...props }) => {
  const baseClasses = `
    grid items-center 
    justify-items-center
    justify-center
    min-h-[0px]
    text-center
    text-base
    font-[Helvetica,sans-serif]
    border-none 
    rounded
    px-[10px] py-[5px]
    cursor-pointer
    no-underline text-black
    transition-all duration-300 ease-in-out
    transform-gpu
    focus:outline-none
    disabled:cursor-not-allowed disabled:opacity-30
    hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent]
  `;

  // const activeClasses = $isActive ? 'bg-primary-button' : 'bg-grey-button';

  return (
    <button
      className={`${baseClasses} ${className}`.trim()}
      disabled={disabled}
      onClick={onClick}
      {...props}
    />
  );
};

export default GeneralButton;
