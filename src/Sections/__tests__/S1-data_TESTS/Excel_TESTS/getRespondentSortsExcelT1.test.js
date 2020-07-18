import getRespondentSortsExcelT1 from "../../../Input/Excel/excelLogic/getRespondentSortsExcelT1";

const parameter1 = [
  [
    {
      sortValue: -4,
      statementNum: 16
    },
    {
      sortValue: -4,
      statementNum: 30
    },
    {
      sortValue: -4,
      statementNum: 10
    },
    {
      sortValue: -4,
      statementNum: 10
    },
    {
      sortValue: -4,
      statementNum: 9
    },
    {
      sortValue: -4,
      statementNum: 24
    },
    {
      sortValue: -4,
      statementNum: 24
    },
    {
      sortValue: -4,
      statementNum: 27
    },
    {
      sortValue: -4,
      statementNum: 5
    }
  ],
  [
    {
      sortValue: -4,
      statementNum: 20
    },
    {
      sortValue: -4,
      statementNum: 9
    },
    {
      sortValue: -4,
      statementNum: 7
    },
    {
      sortValue: -4,
      statementNum: 16
    },
    {
      sortValue: -4,
      statementNum: 1
    },
    {
      sortValue: -4,
      statementNum: 15
    },
    {
      sortValue: -4,
      statementNum: 15
    },
    {
      sortValue: -4,
      statementNum: 5
    },
    {
      sortValue: -4,
      statementNum: 28
    }
  ],
  [
    {
      sortValue: -3,
      statementNum: 17
    },
    {
      sortValue: -3,
      statementNum: 16
    },
    {
      sortValue: -3,
      statementNum: 16
    },
    {
      sortValue: -3,
      statementNum: 7
    },
    {
      sortValue: -3,
      statementNum: 24
    },
    {
      sortValue: -3,
      statementNum: 33
    },
    {
      sortValue: -3,
      statementNum: 29
    },
    {
      sortValue: -3,
      statementNum: 19
    },
    {
      sortValue: -3,
      statementNum: 22
    }
  ],
  [
    {
      sortValue: -3,
      statementNum: 18
    },
    {
      sortValue: -3,
      statementNum: 32
    },
    {
      sortValue: -3,
      statementNum: 8
    },
    {
      sortValue: -3,
      statementNum: 3
    },
    {
      sortValue: -3,
      statementNum: 25
    },
    {
      sortValue: -3,
      statementNum: 2
    },
    {
      sortValue: -3,
      statementNum: 23
    },
    {
      sortValue: -3,
      statementNum: 4
    },
    {
      sortValue: -3,
      statementNum: 23
    }
  ],
  [
    {
      sortValue: -3,
      statementNum: 30
    },
    {
      sortValue: -3,
      statementNum: 4
    },
    {
      sortValue: -3,
      statementNum: 11
    },
    {
      sortValue: -3,
      statementNum: 15
    },
    {
      sortValue: -3,
      statementNum: 26
    },
    {
      sortValue: -3,
      statementNum: 22
    },
    {
      sortValue: -3,
      statementNum: 8
    },
    {
      sortValue: -3,
      statementNum: 25
    },
    {
      sortValue: -3,
      statementNum: 6
    }
  ],
  [
    {
      sortValue: -2,
      statementNum: 3
    },
    {
      sortValue: -2,
      statementNum: 18
    },
    {
      sortValue: -2,
      statementNum: 22
    },
    {
      sortValue: -2,
      statementNum: 8
    },
    {
      sortValue: -2,
      statementNum: 30
    },
    {
      sortValue: -2,
      statementNum: 9
    },
    {
      sortValue: -2,
      statementNum: 33
    },
    {
      sortValue: -2,
      statementNum: 31
    },
    {
      sortValue: -2,
      statementNum: 12
    }
  ],
  [
    {
      sortValue: -2,
      statementNum: 5
    },
    {
      sortValue: -2,
      statementNum: 31
    },
    {
      sortValue: -2,
      statementNum: 3
    },
    {
      sortValue: -2,
      statementNum: 20
    },
    {
      sortValue: -2,
      statementNum: 18
    },
    {
      sortValue: -2,
      statementNum: 21
    },
    {
      sortValue: -2,
      statementNum: 21
    },
    {
      sortValue: -2,
      statementNum: 30
    },
    {
      sortValue: -2,
      statementNum: 9
    }
  ],
  [
    {
      sortValue: -2,
      statementNum: 31
    },
    {
      sortValue: -2,
      statementNum: 19
    },
    {
      sortValue: -2,
      statementNum: 2
    },
    {
      sortValue: -2,
      statementNum: 14
    },
    {
      sortValue: -2,
      statementNum: 32
    },
    {
      sortValue: -2,
      statementNum: 10
    },
    {
      sortValue: -2,
      statementNum: 3
    },
    {
      sortValue: -2,
      statementNum: 1
    },
    {
      sortValue: -2,
      statementNum: 16
    }
  ],
  [
    {
      sortValue: -2,
      statementNum: 32
    },
    {
      sortValue: -2,
      statementNum: 22
    },
    {
      sortValue: -2,
      statementNum: 25
    },
    {
      sortValue: -2,
      statementNum: 24
    },
    {
      sortValue: -2,
      statementNum: 19
    },
    {
      sortValue: -2,
      statementNum: 7
    },
    {
      sortValue: -2,
      statementNum: 26
    },
    {
      sortValue: -2,
      statementNum: 32
    },
    {
      sortValue: -2,
      statementNum: 24
    }
  ],
  [
    {
      sortValue: -1,
      statementNum: 1
    },
    {
      sortValue: -1,
      statementNum: 3
    },
    {
      sortValue: -1,
      statementNum: 30
    },
    {
      sortValue: -1,
      statementNum: 11
    },
    {
      sortValue: -1,
      statementNum: 4
    },
    {
      sortValue: -1,
      statementNum: 20
    },
    {
      sortValue: -1,
      statementNum: 22
    },
    {
      sortValue: -1,
      statementNum: 8
    },
    {
      sortValue: -1,
      statementNum: 27
    }
  ],
  [
    {
      sortValue: -1,
      statementNum: 8
    },
    {
      sortValue: -1,
      statementNum: 1
    },
    {
      sortValue: -1,
      statementNum: 18
    },
    {
      sortValue: -1,
      statementNum: 5
    },
    {
      sortValue: -1,
      statementNum: 33
    },
    {
      sortValue: -1,
      statementNum: 17
    },
    {
      sortValue: -1,
      statementNum: 10
    },
    {
      sortValue: -1,
      statementNum: 10
    },
    {
      sortValue: -1,
      statementNum: 30
    }
  ],
  [
    {
      sortValue: -1,
      statementNum: 10
    },
    {
      sortValue: -1,
      statementNum: 12
    },
    {
      sortValue: -1,
      statementNum: 31
    },
    {
      sortValue: -1,
      statementNum: 27
    },
    {
      sortValue: -1,
      statementNum: 2
    },
    {
      sortValue: -1,
      statementNum: 12
    },
    {
      sortValue: -1,
      statementNum: 7
    },
    {
      sortValue: -1,
      statementNum: 12
    },
    {
      sortValue: -1,
      statementNum: 32
    }
  ],
  [
    {
      sortValue: -1,
      statementNum: 15
    },
    {
      sortValue: -1,
      statementNum: 29
    },
    {
      sortValue: -1,
      statementNum: 5
    },
    {
      sortValue: -1,
      statementNum: 17
    },
    {
      sortValue: -1,
      statementNum: 13
    },
    {
      sortValue: -1,
      statementNum: 29
    },
    {
      sortValue: -1,
      statementNum: 12
    },
    {
      sortValue: -1,
      statementNum: 9
    },
    {
      sortValue: -1,
      statementNum: 18
    }
  ],
  [
    {
      sortValue: -1,
      statementNum: 19
    },
    {
      sortValue: -1,
      statementNum: 14
    },
    {
      sortValue: -1,
      statementNum: 28
    },
    {
      sortValue: -1,
      statementNum: 4
    },
    {
      sortValue: -1,
      statementNum: 21
    },
    {
      sortValue: -1,
      statementNum: 23
    },
    {
      sortValue: -1,
      statementNum: 31
    },
    {
      sortValue: -1,
      statementNum: 14
    },
    {
      sortValue: -1,
      statementNum: 15
    }
  ],
  [
    {
      sortValue: 0,
      statementNum: 2
    },
    {
      sortValue: 0,
      statementNum: 20
    },
    {
      sortValue: 0,
      statementNum: 29
    },
    {
      sortValue: 0,
      statementNum: 25
    },
    {
      sortValue: 0,
      statementNum: 15
    },
    {
      sortValue: 0,
      statementNum: 18
    },
    {
      sortValue: 0,
      statementNum: 2
    },
    {
      sortValue: 0,
      statementNum: 29
    },
    {
      sortValue: 0,
      statementNum: 10
    }
  ],
  [
    {
      sortValue: 0,
      statementNum: 4
    },
    {
      sortValue: 0,
      statementNum: 17
    },
    {
      sortValue: 0,
      statementNum: 20
    },
    {
      sortValue: 0,
      statementNum: 29
    },
    {
      sortValue: 0,
      statementNum: 20
    },
    {
      sortValue: 0,
      statementNum: 8
    },
    {
      sortValue: 0,
      statementNum: 9
    },
    {
      sortValue: 0,
      statementNum: 3
    },
    {
      sortValue: 0,
      statementNum: 29
    }
  ],
  [
    {
      sortValue: 0,
      statementNum: 7
    },
    {
      sortValue: 0,
      statementNum: 10
    },
    {
      sortValue: 0,
      statementNum: 15
    },
    {
      sortValue: 0,
      statementNum: 9
    },
    {
      sortValue: 0,
      statementNum: 17
    },
    {
      sortValue: 0,
      statementNum: 3
    },
    {
      sortValue: 0,
      statementNum: 27
    },
    {
      sortValue: 0,
      statementNum: 7
    },
    {
      sortValue: 0,
      statementNum: 3
    }
  ],
  [
    {
      sortValue: 0,
      statementNum: 9
    },
    {
      sortValue: 0,
      statementNum: 2
    },
    {
      sortValue: 0,
      statementNum: 23
    },
    {
      sortValue: 0,
      statementNum: 33
    },
    {
      sortValue: 0,
      statementNum: 12
    },
    {
      sortValue: 0,
      statementNum: 14
    },
    {
      sortValue: 0,
      statementNum: 19
    },
    {
      sortValue: 0,
      statementNum: 17
    },
    {
      sortValue: 0,
      statementNum: 26
    }
  ],
  [
    {
      sortValue: 0,
      statementNum: 26
    },
    {
      sortValue: 0,
      statementNum: 24
    },
    {
      sortValue: 0,
      statementNum: 6
    },
    {
      sortValue: 0,
      statementNum: 12
    },
    {
      sortValue: 0,
      statementNum: 28
    },
    {
      sortValue: 0,
      statementNum: 27
    },
    {
      sortValue: 0,
      statementNum: 5
    },
    {
      sortValue: 0,
      statementNum: 16
    },
    {
      sortValue: 0,
      statementNum: 11
    }
  ],
  [
    {
      sortValue: 1,
      statementNum: 6
    },
    {
      sortValue: 1,
      statementNum: 8
    },
    {
      sortValue: 1,
      statementNum: 9
    },
    {
      sortValue: 1,
      statementNum: 22
    },
    {
      sortValue: 1,
      statementNum: 5
    },
    {
      sortValue: 1,
      statementNum: 1
    },
    {
      sortValue: 1,
      statementNum: 13
    },
    {
      sortValue: 1,
      statementNum: 26
    },
    {
      sortValue: 1,
      statementNum: 4
    }
  ],
  [
    {
      sortValue: 1,
      statementNum: 11
    },
    {
      sortValue: 1,
      statementNum: 15
    },
    {
      sortValue: 1,
      statementNum: 19
    },
    {
      sortValue: 1,
      statementNum: 2
    },
    {
      sortValue: 1,
      statementNum: 29
    },
    {
      sortValue: 1,
      statementNum: 19
    },
    {
      sortValue: 1,
      statementNum: 11
    },
    {
      sortValue: 1,
      statementNum: 13
    },
    {
      sortValue: 1,
      statementNum: 25
    }
  ],
  [
    {
      sortValue: 1,
      statementNum: 12
    },
    {
      sortValue: 1,
      statementNum: 7
    },
    {
      sortValue: 1,
      statementNum: 27
    },
    {
      sortValue: 1,
      statementNum: 31
    },
    {
      sortValue: 1,
      statementNum: 31
    },
    {
      sortValue: 1,
      statementNum: 13
    },
    {
      sortValue: 1,
      statementNum: 30
    },
    {
      sortValue: 1,
      statementNum: 11
    },
    {
      sortValue: 1,
      statementNum: 13
    }
  ],
  [
    {
      sortValue: 1,
      statementNum: 24
    },
    {
      sortValue: 1,
      statementNum: 26
    },
    {
      sortValue: 1,
      statementNum: 21
    },
    {
      sortValue: 1,
      statementNum: 23
    },
    {
      sortValue: 1,
      statementNum: 23
    },
    {
      sortValue: 1,
      statementNum: 31
    },
    {
      sortValue: 1,
      statementNum: 4
    },
    {
      sortValue: 1,
      statementNum: 20
    },
    {
      sortValue: 1,
      statementNum: 20
    }
  ],
  [
    {
      sortValue: 1,
      statementNum: 25
    },
    {
      sortValue: 1,
      statementNum: 23
    },
    {
      sortValue: 1,
      statementNum: 33
    },
    {
      sortValue: 1,
      statementNum: 26
    },
    {
      sortValue: 1,
      statementNum: 6
    },
    {
      sortValue: 1,
      statementNum: 11
    },
    {
      sortValue: 1,
      statementNum: 6
    },
    {
      sortValue: 1,
      statementNum: 18
    },
    {
      sortValue: 1,
      statementNum: 2
    }
  ],
  [
    {
      sortValue: 2,
      statementNum: 13
    },
    {
      sortValue: 2,
      statementNum: 5
    },
    {
      sortValue: 2,
      statementNum: 1
    },
    {
      sortValue: 2,
      statementNum: 30
    },
    {
      sortValue: 2,
      statementNum: 16
    },
    {
      sortValue: 2,
      statementNum: 25
    },
    {
      sortValue: 2,
      statementNum: 20
    },
    {
      sortValue: 2,
      statementNum: 33
    },
    {
      sortValue: 2,
      statementNum: 19
    }
  ],
  [
    {
      sortValue: 2,
      statementNum: 22
    },
    {
      sortValue: 2,
      statementNum: 11
    },
    {
      sortValue: 2,
      statementNum: 14
    },
    {
      sortValue: 2,
      statementNum: 18
    },
    {
      sortValue: 2,
      statementNum: 8
    },
    {
      sortValue: 2,
      statementNum: 26
    },
    {
      sortValue: 2,
      statementNum: 18
    },
    {
      sortValue: 2,
      statementNum: 21
    },
    {
      sortValue: 2,
      statementNum: 8
    }
  ],
  [
    {
      sortValue: 2,
      statementNum: 28
    },
    {
      sortValue: 2,
      statementNum: 25
    },
    {
      sortValue: 2,
      statementNum: 17
    },
    {
      sortValue: 2,
      statementNum: 28
    },
    {
      sortValue: 2,
      statementNum: 11
    },
    {
      sortValue: 2,
      statementNum: 30
    },
    {
      sortValue: 2,
      statementNum: 14
    },
    {
      sortValue: 2,
      statementNum: 22
    },
    {
      sortValue: 2,
      statementNum: 7
    }
  ],
  [
    {
      sortValue: 2,
      statementNum: 29
    },
    {
      sortValue: 2,
      statementNum: 27
    },
    {
      sortValue: 2,
      statementNum: 24
    },
    {
      sortValue: 2,
      statementNum: 32
    },
    {
      sortValue: 2,
      statementNum: 22
    },
    {
      sortValue: 2,
      statementNum: 32
    },
    {
      sortValue: 2,
      statementNum: 1
    },
    {
      sortValue: 2,
      statementNum: 2
    },
    {
      sortValue: 2,
      statementNum: 17
    }
  ],
  [
    {
      sortValue: 3,
      statementNum: 14
    },
    {
      sortValue: 3,
      statementNum: 6
    },
    {
      sortValue: 3,
      statementNum: 12
    },
    {
      sortValue: 3,
      statementNum: 6
    },
    {
      sortValue: 3,
      statementNum: 3
    },
    {
      sortValue: 3,
      statementNum: 4
    },
    {
      sortValue: 3,
      statementNum: 17
    },
    {
      sortValue: 3,
      statementNum: 24
    },
    {
      sortValue: 3,
      statementNum: 31
    }
  ],
  [
    {
      sortValue: 3,
      statementNum: 21
    },
    {
      sortValue: 3,
      statementNum: 28
    },
    {
      sortValue: 3,
      statementNum: 26
    },
    {
      sortValue: 3,
      statementNum: 1
    },
    {
      sortValue: 3,
      statementNum: 14
    },
    {
      sortValue: 3,
      statementNum: 5
    },
    {
      sortValue: 3,
      statementNum: 25
    },
    {
      sortValue: 3,
      statementNum: 23
    },
    {
      sortValue: 3,
      statementNum: 1
    }
  ],
  [
    {
      sortValue: 3,
      statementNum: 23
    },
    {
      sortValue: 3,
      statementNum: 21
    },
    {
      sortValue: 3,
      statementNum: 13
    },
    {
      sortValue: 3,
      statementNum: 13
    },
    {
      sortValue: 3,
      statementNum: 27
    },
    {
      sortValue: 3,
      statementNum: 16
    },
    {
      sortValue: 3,
      statementNum: 32
    },
    {
      sortValue: 3,
      statementNum: 28
    },
    {
      sortValue: 3,
      statementNum: 21
    }
  ],
  [
    {
      sortValue: 4,
      statementNum: 27
    },
    {
      sortValue: 4,
      statementNum: 13
    },
    {
      sortValue: 4,
      statementNum: 32
    },
    {
      sortValue: 4,
      statementNum: 19
    },
    {
      sortValue: 4,
      statementNum: 10
    },
    {
      sortValue: 4,
      statementNum: 28
    },
    {
      sortValue: 4,
      statementNum: 16
    },
    {
      sortValue: 4,
      statementNum: 15
    },
    {
      sortValue: 4,
      statementNum: 14
    }
  ],
  [
    {
      sortValue: 4,
      statementNum: 33
    },
    {
      sortValue: 4,
      statementNum: 33
    },
    {
      sortValue: 4,
      statementNum: 4
    },
    {
      sortValue: 4,
      statementNum: 21
    },
    {
      sortValue: 4,
      statementNum: 7
    },
    {
      sortValue: 4,
      statementNum: 6
    },
    {
      sortValue: 4,
      statementNum: 28
    },
    {
      sortValue: 4,
      statementNum: 6
    },
    {
      sortValue: 4,
      statementNum: 33
    }
  ]
];

const parameter2 = [
  "US1",
  "US2",
  "US3",
  "US4",
  "JP5",
  "CA6",
  "UK7",
  "US8",
  "FR9"
];
const parameter3 = 33;

const testValue1 = [
  [
    -1,
    0,
    -2,
    0,
    -2,
    1,
    0,
    -1,
    0,
    -1,
    1,
    1,
    2,
    3,
    -1,
    -4,
    -3,
    -3,
    -1,
    -4,
    3,
    2,
    3,
    1,
    1,
    0,
    4,
    2,
    2,
    -3,
    -2,
    -2,
    4
  ],
  [
    -1,
    0,
    -1,
    -3,
    2,
    3,
    1,
    1,
    -4,
    0,
    2,
    -1,
    4,
    -1,
    1,
    -3,
    0,
    -2,
    -2,
    0,
    3,
    -2,
    1,
    0,
    2,
    1,
    2,
    3,
    -1,
    -4,
    -2,
    -3,
    4
  ],
  [
    2,
    -2,
    -2,
    4,
    -1,
    0,
    -4,
    -3,
    1,
    -4,
    -3,
    3,
    3,
    2,
    0,
    -3,
    2,
    -1,
    1,
    0,
    1,
    -2,
    0,
    2,
    -2,
    3,
    1,
    -1,
    0,
    -1,
    -1,
    4,
    1
  ],
  [
    3,
    1,
    -3,
    -1,
    -1,
    3,
    -3,
    -2,
    0,
    -4,
    -1,
    0,
    3,
    -2,
    -3,
    -4,
    -1,
    2,
    4,
    -2,
    4,
    1,
    1,
    -2,
    0,
    1,
    -1,
    2,
    0,
    2,
    1,
    2,
    0
  ],
  [
    -4,
    -1,
    3,
    -1,
    1,
    1,
    4,
    2,
    -4,
    4,
    2,
    0,
    -1,
    3,
    0,
    2,
    0,
    -2,
    -2,
    0,
    -1,
    2,
    1,
    -3,
    -3,
    -3,
    3,
    0,
    1,
    -2,
    1,
    -2,
    -1
  ],
  [
    1,
    -3,
    0,
    3,
    3,
    4,
    -2,
    0,
    -2,
    -2,
    1,
    -1,
    1,
    0,
    -4,
    3,
    -1,
    0,
    1,
    -1,
    -2,
    -3,
    -1,
    -4,
    2,
    2,
    0,
    4,
    -1,
    2,
    1,
    2,
    -3
  ],
  [
    2,
    0,
    -2,
    1,
    0,
    1,
    -1,
    -3,
    0,
    -1,
    1,
    -1,
    1,
    2,
    -4,
    4,
    3,
    2,
    0,
    2,
    -2,
    -1,
    -3,
    -4,
    3,
    -2,
    0,
    4,
    -3,
    1,
    -1,
    3,
    -2
  ],
  [
    -2,
    2,
    0,
    -3,
    -4,
    4,
    0,
    -1,
    -1,
    -1,
    1,
    -1,
    1,
    -1,
    4,
    0,
    0,
    1,
    -3,
    1,
    2,
    2,
    3,
    3,
    -3,
    1,
    -4,
    3,
    0,
    -2,
    -2,
    -2,
    2
  ],
  [
    3,
    1,
    0,
    1,
    -4,
    -3,
    2,
    2,
    -2,
    0,
    0,
    -2,
    1,
    4,
    -1,
    -2,
    2,
    -1,
    2,
    1,
    3,
    -3,
    -3,
    -2,
    1,
    0,
    -1,
    -4,
    0,
    -1,
    3,
    -1,
    4
  ]
];
const testValue2 = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33
  ],
  [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33
  ],
  [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33
  ],
  [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33
  ],
  [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33
  ],
  [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33
  ],
  [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33
  ],
  [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33
  ],
  [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33
  ]
];

test("", () => {
  const value1 = getRespondentSortsExcelT1(parameter1, parameter2, parameter3);
  expect(value1[0]).toEqual(testValue1);
  expect(value1[1]).toEqual(testValue2);
});
