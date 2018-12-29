const currentData1 = () => {
  const currentDate = new Date();
  let Day = currentDate.getDate();
  if (Day < 10) {
    Day = `0${  Day}`;
  }
  let Month = currentDate.getMonth() + 1;
  if (Month < 10) {
    Month = `0${  Month}`;
  }
  const Year = currentDate.getFullYear();
  const fullDate = `${Year  }-${  Month  }-${  Day}`;
  return fullDate;
};

export default currentData1;
