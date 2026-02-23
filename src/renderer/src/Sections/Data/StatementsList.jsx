const StatementList = (props) => {
  let mapKey = 1;
  return (
    <div className="flex flex-col overflow-y-auto mt-25 pb-20 h-[calc(100vh-100px)] w-full items-center pl-8">
      <ol>
        {props.statements.map((listValue) => (
          <li key={mapKey++}>{`${mapKey}. ${listValue}`}</li>
        ))}
      </ol>
    </div>
  );
};

export default StatementList;
