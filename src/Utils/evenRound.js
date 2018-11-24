const evenRound = (value, precision) => {
    // params num, decimalPlaces
    // var scale = decimalPlaces || 0;
    // var number = Math.round(num * Math.pow(10, scale)) / Math.pow(10, scale);
    // if (num - number > 0) {
    //     return (number + Math.floor(2 * Math.round((num - number) * Math.pow(10, (scale + 1))) / 10) / Math.pow(10, scale));
    // } else {
    //     return number;
    // }
    let mode = "default";

    var m,
        f,
        isHalf,
        sgn; // helper variables
    // making sure precision is integer
    precision |= 0;
    m = Math.pow(10, precision);
    value *= m;
    // sign of the number
    sgn = (value > 0) | -(value < 0);
    isHalf = value % 1 === 0.5 * sgn;
    f = Math.floor(value);
    if (isHalf) {
        switch (mode) {
            case "PHP_ROUND_HALF_DOWN":
                // rounds .5 toward zero
                value = f + (sgn < 0);
                break;
            case "PHP_ROUND_HALF_EVEN":
                // rouds .5 towards the next even integer
                value = f + (f % 2) * sgn;
                break;
            case "PHP_ROUND_HALF_ODD":
                // rounds .5 towards the next odd integer
                value = f + !(f % 2);
                break;
            default:
                // rounds .5 away from zero
                value = f + (sgn > 0);
        }
    }
    return (isHalf ? value : Math.round(value)) / m;
};

export default evenRound;
