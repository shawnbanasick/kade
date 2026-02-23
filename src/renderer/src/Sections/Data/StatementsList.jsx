const StatementList = (props) => {
  let mapKey = 1;
  return (
    <div className="pl-8 py-4 overflow-y-auto h-[calc(100vh-130px)]">
      <ol>
        {props.statements.map((listValue) => (
          <li key={mapKey++}>{`${mapKey}. ${listValue}`}</li>
        ))}
      </ol>
    </div>
  );
};

export default StatementList;
