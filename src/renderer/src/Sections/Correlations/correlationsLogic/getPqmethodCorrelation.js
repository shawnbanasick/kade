/*
 *  @fileoverview Pearson correlation score algorithm.
 *  @author matt.west@kojilabs.com (Matt West)
 *  @license Copyright 2013 Matt West.
 *  Licensed under MIT (http://opensource.org/licenses/MIT).
 */

import evenRound from "../../../Utils/evenRound";

export default function getPqmethodCorrelation(x, y) {
  const n = x.length;

  if (n === 0) {
    return 0;
  }

  let sum1 = 0;
  for (let i = 0; i < n; i += 1) {
    sum1 += x[i];
  }

  let sum2 = 0;
  for (let j = 0; j < n; j += 1) {
    sum2 += y[j];
  }

  let sum1Sq = 0;
  for (let k = 0; k < n; k += 1) {
    sum1Sq += x[k] ** 2;
  }

  let sum2Sq = 0;
  for (let m = 0; m < n; m += 1) {
    sum2Sq += y[m] ** 2;
  }

  let pSum = 0;
  for (let p = 0; p < n; p += 1) {
    pSum += x[p] * y[p];
  }

  const num = pSum - (sum1 * sum2) / n;
  const den = Math.sqrt((sum1Sq - sum1 ** 2 / n) * (sum2Sq - sum2 ** 2 / n));

  if (den === 0) {
    return 0;
  }

  const answer = num / den;
  const answer1 = [evenRound(answer, 5), evenRound(answer * 100, 0)];

  return answer1;
}
