const factorGroupComparator = function(fg1, fg2) {
    let factorGroup1 = +fg1.slice(1, 2);
    let factorGroup2 = +fg2.slice(1, 2);
    let subGroup1 = +fg1.slice(3);
    let subGroup2 = +fg2.slice(3);

    var comparison1 = factorGroup1 - factorGroup2;
    if (comparison1 !== 0) {
        return comparison1;
    }
    return subGroup1 - subGroup2;
};

export default factorGroupComparator;
