const RotationDegreeInput = (props) => {
  const saveInputValueToState = (event) => {
    props.onChangeCallback(event);
  };

  return (
    <div
      className={`
        flex flex-col rounded-[3px] text-[18px] w-[50px]  h-[26px] border-none
        transition-shadow duration-300 translate-z-0 items-center justify-center outline-2 outline-gray-300
        ${
          props.active
            ? 'bg-primary-button shadow-[inset_0_0_0_4px_var(--main-theme-color),0_0_1px_transparent]'
            : 'bg-grey-button shadow-[inset_0_0_0_4px_#d6dbe0,0_0_1px_transparent]'
        }
        hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent]
      `}
    >
      <input
        type="text"
        name={props.name}
        onChange={saveInputValueToState}
        value={props.value}
        className="w-[35px] h-[24px] text-right rounded-[3px] outline-gray-300 p-0.5 bg-white"
      />
    </div>
  );
};

export default RotationDegreeInput;
