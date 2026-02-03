const FileButton = ({ onClick, children, className = '' }) => {
  return (
    <button
      className={`box-border p-[10px] pb-[8px] pt-[15px] w-full h-auto text-black text-left transition-all duration-300 ease-[ease] outline-none select-none hover:opacity-100 hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] border-b-1 border-gray-400 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default FileButton;
