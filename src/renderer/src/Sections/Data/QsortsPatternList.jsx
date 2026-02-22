const StatementList = (props) => {
  let mapKey = 1;
  return (
    <ul className="list-none text-right w-[167px] pl-[5px]">
      {props.texts.map((listValue) => (
        <li key={mapKey++}>{listValue}</li>
      ))}
    </ul>
  );
};

export default StatementList;
