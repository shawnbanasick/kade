const StatementList = (props) => {
  let mapKey = 1;
  return (
    <div className="flex flex-col overflow-y-auto mt-5 pb-20 h-[calc(100vh-100px)] w-full  pl-6">
      <ol>
        {props.statements.map((listValue) => (
          <li key={mapKey++}>{`${mapKey}. ${listValue}`}</li>
        ))}
      </ol>
    </div>
  );
};

export default StatementList;
