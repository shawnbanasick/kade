const sortEigenValues = function(values) {
    values.sort(function(a, b) {
        return b - a;
    });
    return values;
};

export default sortEigenValues;
