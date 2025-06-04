export const exampleApi = {
  stations: [
    {
      id: "1",
      river: "Wisła",
      latitude: 52.2297,
      longitude: 21.0122,
      waterLevel: 300,
      measurementDate: "2023-10-01T12:00:00Z",
      color: "#FF0000"
    },
    {
      id: "2",
      river: "Odra",
      latitude: 51.1079,
      longitude: 17.0385,
      waterLevel: 250,
      measurementDate: "2023-10-01T12:00:00Z",
      color: "#00FF00"
    },
    {
      id: "3",
      river: "Warta",
      latitude: 52.4064,
      longitude: 16.9252,
      waterLevel: 200,
      measurementDate: "2023-10-01T12:00:00Z",
      color: "#0000FF"
    }
  ],

  singleStation: {
    id: "1",
    name: "wwa",
    river: "Wisła",
    region: "Mazowieckie",
    latitude: 52.2297,
    longitude: 21.0122,
    waterLevel: 300,
    waterLevelDate: "2023-10-01T12:00:00Z",
    waterTemperature: 15.5,
    waterTemperatureDate: "2023-10-01T12:00:00Z",
    icePhenomenon: "Brak",
    icePhenomenonDate: "2023-10-01T12:00:00Z",
    overgrowthPhenomenon: "Brak",
    overgrowthPhenomenonDate: "2023-10-01T12:00:00Z"
  },

  riversWithStations: [
    {
      first: "Wisła",
      second: [
        {
          id: "1",
          name: "Wisła",
          latitude: 52.2297,
          longitude: 21.0122,
          waterLevel: "300"
        },
        {
          id: "2",
          name: "Wisła Płock",
          latitude: 52.55,
          longitude: 19.7,
          waterLevel: "280"
        }
      ]
    },
    {
      first: "Odra",
      second: [
        {
          id: "3",
          name: "Odra Wrocław",
          latitude: 51.1079,
          longitude: 17.0385,
          waterLevel: "250"
        }
      ]
    }
  ],

  stationChart: {
    waterLevel: [
      { date: "2023-10-01T12:00:00Z", value: 277.0 },
      { date: "2023-10-02T12:00:00Z", value: 212.0 },
      { date: "2023-10-03T12:00:00Z", value: 263.0 },
      { date: "2023-10-04T12:00:00Z", value: 297.0 },
      { date: "2023-10-05T12:00:00Z", value: 234.0 },
      { date: "2023-10-06T12:00:00Z", value: 267.0 },
      { date: "2023-10-07T12:00:00Z", value: 201.0 },
      { date: "2023-10-08T12:00:00Z", value: 282.0 },
      { date: "2023-10-09T12:00:00Z", value: 256.0 },
      { date: "2023-10-10T12:00:00Z", value: 298.0 }
    ],
    waterTemperature: [
      { date: "2023-10-01T12:00:00Z", value: 211.0 },
      { date: "2023-10-02T12:00:00Z", value: 281.0 },
      { date: "2023-10-03T12:00:00Z", value: 247.0 },
      { date: "2023-10-04T12:00:00Z", value: 225.0 },
      { date: "2023-10-05T12:00:00Z", value: 294.0 },
      { date: "2023-10-06T12:00:00Z", value: 240.0 },
      { date: "2023-10-07T12:00:00Z", value: 224.0 },
      { date: "2023-10-08T12:00:00Z", value: 288.0 },
      { date: "2023-10-09T12:00:00Z", value: 251.0 },
      { date: "2023-10-10T12:00:00Z", value: 251.0 }
    ],
    waterFlow: [
      { date: "2023-10-01T12:00:00Z", value: 237.0 },
      { date: "2023-10-02T12:00:00Z", value: 277.0 },
      { date: "2023-10-03T12:00:00Z", value: 258.0 },
      { date: "2023-10-04T12:00:00Z", value: 293.0 },
      { date: "2023-10-05T12:00:00Z", value: 204.0 },
      { date: "2023-10-06T12:00:00Z", value: 249.0 },
      { date: "2023-10-07T12:00:00Z", value: 256.0 },
      { date: "2023-10-08T12:00:00Z", value: 227.0 },
      { date: "2023-10-09T12:00:00Z", value: 253.0 },
      { date: "2023-10-10T12:00:00Z", value: 223.0 }
    ]
  }
};
