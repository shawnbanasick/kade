const currentTime1 = () => {
    var currentTime = new Date();
    var Minutes = currentTime.getMinutes();
    if (Minutes < 10) {
        Minutes = "0" + Minutes;
    }
    var Hour = currentTime.getHours();
    if (Hour < 10) {
        Hour = "0" + Hour;
    }

    var Time = String(Hour) + "-" + String(Minutes);

    return Time;
};

export default currentTime1;
