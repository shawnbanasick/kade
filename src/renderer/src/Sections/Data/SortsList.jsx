const style1 = { width: 1150, wordWrap: 'break-word' };

const SortsList = () => {
  return (
    <ol>
      {this.props.displayText.map((listValue) => (
        <li style={style1} key={listValue.toString()}>
          {listValue}
        </li>
      ))}
    </ol>
  );
};

export default SortsList;
