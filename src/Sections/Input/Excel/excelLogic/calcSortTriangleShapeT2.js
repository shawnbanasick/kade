import cloneDeep from "lodash/cloneDeep";

function removeTrailingCommaFromText(string) {
  const lastChar = string.slice(-1);
  if (lastChar === ",") {
    const string2 = string.slice(0, -1);
    return string2;
  }
  return string;
}

function calcSortTriangleShapeT2(qavSortTriangleShape1) {
  let qavSortTriangleShape2 = qavSortTriangleShape1.replace(/,,/g, "");
  qavSortTriangleShape2 = removeTrailingCommaFromText(qavSortTriangleShape2);
  const qavSortTriangleShape3 = qavSortTriangleShape2.replace(
    /Sort Pattern,/,
    ""
  );
  const tempTriangle2 = qavSortTriangleShape3
    .split(",")
    .map(item => parseInt(item, 10));
  const copyTriangleShape = cloneDeep(tempTriangle2);
  const testSortTriangleShapeArray = cloneDeep(tempTriangle2);
  const qavSortTriangleShape = cloneDeep(tempTriangle2);
  return [copyTriangleShape, testSortTriangleShapeArray, qavSortTriangleShape];
}

export default calcSortTriangleShapeT2;
