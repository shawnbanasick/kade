export function splitNamesAndSorts(array, numSortStatements) {
    let names = [];
    let sorts = [];
    let sortSize = numSortStatements * 2 + 10;

    array.forEach(function(element) {
        if (element.length) {
            let nameFragment = element.slice(0, 8);
            names.push(nameFragment);
            let sortFragment = element.slice(10, sortSize);
            sorts.push(sortFragment);
        }
    });

    return [names, sorts];
}
