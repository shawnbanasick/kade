const SortsList = () => {
  return (
    <div className="w-[1150px] border-2 border-red-500">
      <ol>
        {this.props.displayText.map((listValue) => (
          <li className=" wrap-break-word" key={listValue.toString()}>
            {listValue}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default SortsList;
