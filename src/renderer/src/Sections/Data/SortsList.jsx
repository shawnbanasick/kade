const SortsList = () => {
  return (
    <div className="w-[1150px]">
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
