const currentTime1 = () => {
  const currentTime = new Date();
  let Minutes = currentTime.getMinutes();
  if (Minutes < 10) {
    Minutes = `0${  Minutes}`;
  }
  let Hour = currentTime.getHours();
  if (Hour < 10) {
    Hour = `0${  Hour}`;
  }

  const Time = `${String(Hour)  }-${  String(Minutes)}`;

  return Time;
};

export default currentTime1;
