// Plain, non-scrolling list. The parent panel owns the single scroll container.
const StatementsList = ({ statements }) => (
  <ol className="w-full">
    {statements.map((statement, index) => (
      <li key={index}>{`${index + 1}. ${statement}`}</li>
    ))}
  </ol>
);

export default StatementsList;
