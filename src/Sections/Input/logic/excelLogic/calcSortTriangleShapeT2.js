import cloneDeep from "lodash/cloneDeep";

function removeTrailingCommaFromText(string) {
    var lastChar = string.slice(-1);
    if (lastChar === ',') {
        string = string.slice(0, -1);
    }
    return string;
}

const calcSortTriangleShapeT2 = function(qavSortTriangleShape1) {
    var qavSortTriangleShape2 = qavSortTriangleShape1.replace(/,,/g, '');
    qavSortTriangleShape2 = removeTrailingCommaFromText(qavSortTriangleShape2);
    var qavSortTriangleShape3 = qavSortTriangleShape2.replace(/Sort Pattern,/, '');
    var tempTriangle2 = qavSortTriangleShape3.split(",");
    for (var a in tempTriangle2) {
        tempTriangle2[a] = parseInt(tempTriangle2[a], 10);
    }
    var copyTriangleShape = cloneDeep(tempTriangle2);
    var testSortTriangleShapeArray = cloneDeep(tempTriangle2);
    var qavSortTriangleShape = cloneDeep(tempTriangle2);
    return [copyTriangleShape, testSortTriangleShapeArray, qavSortTriangleShape];
};

export default calcSortTriangleShapeT2;