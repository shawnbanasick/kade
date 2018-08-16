const currentData1 = () => {
    var currentDate = new Date();
    var Day = currentDate.getDate();
    if (Day < 10) {
        Day = "0" + Day;
    }
    var Month = currentDate.getMonth() + 1;
    if (Month < 10) {
        Month = "0" + Month;
    }
    var Year = currentDate.getFullYear();
    var fullDate = Year + "-" + Month + "-" + Day;
    return fullDate;
};

export default currentData1;
