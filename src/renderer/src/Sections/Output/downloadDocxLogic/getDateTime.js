const getDateTime = () => {
  let currentdate = new Date();
  let minutes = currentdate.getMinutes();
  let newMinutes;
  if (minutes < 10) {
    newMinutes = `0${minutes}`;
  } else {
    newMinutes = minutes;
  }

  let datetime =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate() +
    " @ " +
    currentdate.getHours() +
    ":" +
    newMinutes;

  return datetime;
};

export default getDateTime;
