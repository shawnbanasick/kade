// import './SpinnerCircle.css';
// css in customSettings.css

const SpinnerCircle = () => {
  return (
    <div className="spinner">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="spinner-blade" />
      ))}
    </div>
  );
};

export default SpinnerCircle;
