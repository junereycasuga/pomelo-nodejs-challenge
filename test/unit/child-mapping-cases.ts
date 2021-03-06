const testCases = [
  ['given a null input as argument, return an empty array', null, []],
  ['given a string input as an argument, return an empty array', 'test', []],
  ['given an integer input as an argument, return an empty array', 1, []],
  ['given an empty input as arguments, return an empty array', {}, []],
  [
    'given an input with sorted object key as arguments, return the correct result',
    {
      '0': [
        {
          id: 10,
          title: 'House',
          level: 0,
          children: [],
          parent_id: null,
        },
      ],
      '1': [
        {
          id: 12,
          title: 'Red Roof',
          level: 1,
          children: [],
          parent_id: 10,
        },
        {
          id: 18,
          title: 'Blue Roof',
          level: 1,
          children: [],
          parent_id: 10,
        },
        {
          id: 13,
          title: 'Wall',
          level: 1,
          children: [],
          parent_id: 10,
        },
      ],
      '2': [
        {
          id: 17,
          title: 'Blue Window',
          level: 2,
          children: [],
          parent_id: 12,
        },
        {
          id: 16,
          title: 'Door',
          level: 2,
          children: [],
          parent_id: 13,
        },
        {
          id: 15,
          title: 'Red Window',
          level: 2,
          children: [],
          parent_id: 12,
        },
      ],
    },
    [
      {
        id: 10,
        title: 'House',
        level: 0,
        children: [
          {
            id: 13,
            title: 'Wall',
            level: 1,
            children: [
              {
                id: 16,
                title: 'Door',
                level: 2,
                children: [],
                parent_id: 13,
              },
            ],
            parent_id: 10,
          },
          {
            id: 18,
            title: 'Blue Roof',
            level: 1,
            children: [],
            parent_id: 10,
          },
          {
            id: 12,
            title: 'Red Roof',
            level: 1,
            children: [
              {
                id: 15,
                title: 'Red Window',
                level: 2,
                children: [],
                parent_id: 12,
              },
              {
                id: 17,
                title: 'Blue Window',
                level: 2,
                children: [],
                parent_id: 12,
              },
            ],
            parent_id: 10,
          },
        ],
        parent_id: null,
      },
    ],
  ],
  [
    'given an input with non-matching object key and level as arguments, return the correct result',
    {
      '6': [
        {
          id: 10,
          title: 'House',
          level: 0,
          children: [],
          parent_id: null,
        },
      ],
      '2': [
        {
          id: 12,
          title: 'Red Roof',
          level: 1,
          children: [],
          parent_id: 10,
        },
        {
          id: 18,
          title: 'Blue Roof',
          level: 1,
          children: [],
          parent_id: 10,
        },
        {
          id: 13,
          title: 'Wall',
          level: 1,
          children: [],
          parent_id: 10,
        },
      ],
      '19': [
        {
          id: 17,
          title: 'Blue Window',
          level: 2,
          children: [],
          parent_id: 12,
        },
        {
          id: 16,
          title: 'Door',
          level: 2,
          children: [],
          parent_id: 13,
        },
        {
          id: 15,
          title: 'Red Window',
          level: 2,
          children: [],
          parent_id: 12,
        },
      ],
    },
    [
      {
        id: 10,
        title: 'House',
        level: 0,
        children: [
          {
            id: 13,
            title: 'Wall',
            level: 1,
            children: [
              {
                id: 16,
                title: 'Door',
                level: 2,
                children: [],
                parent_id: 13,
              },
            ],
            parent_id: 10,
          },
          {
            id: 18,
            title: 'Blue Roof',
            level: 1,
            children: [],
            parent_id: 10,
          },
          {
            id: 12,
            title: 'Red Roof',
            level: 1,
            children: [
              {
                id: 15,
                title: 'Red Window',
                level: 2,
                children: [],
                parent_id: 12,
              },
              {
                id: 17,
                title: 'Blue Window',
                level: 2,
                children: [],
                parent_id: 12,
              },
            ],
            parent_id: 10,
          },
        ],
        parent_id: null,
      },
    ],
  ],
]

export default testCases
