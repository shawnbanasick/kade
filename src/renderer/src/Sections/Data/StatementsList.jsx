const StatementList = (props) => {
  let mapKey = 1;
  return (
    <ol>
      {props.statements.map((listValue) => (
        <li key={mapKey++}>{`${mapKey}. ${listValue}`}</li>
      ))}
    </ol>
  );
};

export default StatementList;
