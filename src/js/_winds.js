const winds = [
    {
        id: 1,
        name: "North",
        abbr: "N",
        deg: 0
    },
    {
        id: 2,
        name: "North by East",
        abbr: "NbE",
        deg: 11.25
    },
    {
        id: 3,
        name: "North-Northeast",
        abbr: "NNE",
        deg: 22.5
    },
    {
        id: 4,
        name: "Northeast by North",
        abbr: "NEbN",
        deg: 33.75
    },
    {
        id: 5,
        name: "Northeast",
        abbr: "NE",
        deg: 45
    },
    {
        id: 6,
        name: "Northeast by East",
        abbr: "NEbE",
        deg: 56.25
    },
    {
        id: 7,
        name: "East-Northeast",
        abbr: "ENE",
        deg: 67.5
    },
    {
        id: 8,
        name: "East by North",
        abbr: "EbN",
        deg: 78.75
    },
    {
        id: 9,
        name: "East",
        abbr: "E",
        deg: 90
    },
    {
        id: 10,
        name: "East by South",
        abbr: "EbS",
        deg: 101.25
    },
    {
        id: 11,
        name: "East-Southeast",
        abbr: "ESE",
        deg: 112.5
    },
    {
        id: 12,
        name: "Southeast by East",
        abbr: "SEbE",
        deg: 123.75
    },
    {
        id: 13,
        name: "Southeast",
        abbr: "SE",
        deg: 135
    },
    {
        id: 14,
        name: "Southeast by South",
        abbr: "SEbS",
        deg: 146.25
    },
    {
        id: 15,
        name: "South-Southeast",
        abbr: "SSE",
        deg: 157.5
    },
    {
        id: 16,
        name: "South by East",
        abbr: "SbE",
        deg: 168.75
    },
    {
        id: 17,
        name: "South",
        abbr: "S",
        deg: 180
    },
    {
        id: 18,
        name: "South by West",
        abbr: "SbW",
        deg: 191.25
    },
    {
        id: 19,
        name: "South-Southwest",
        abbr: "SSW",
        deg: 202.5
    },
    {
        id: 20,
        name: "Southwest by South",
        abbr: "SWbS",
        deg: 213.75
    },
    {
        id: 21,
        name: "Southwest",
        abbr: "SW",
        deg: 225
    },
    {
        id: 22,
        name: "Southwest by West",
        abbr: "SWbW",
        deg: 236.25
    },
    {
        id: 23,
        name: "West-Southwest",
        abbr: "WSW",
        deg: 247.5
    },
    {
        id: 24,
        name: "West by South",
        abbr: "WbS",
        deg: 258.75
    },
    {
        id: 25,
        name: "West",
        abbr: "W",
        deg: 270
    },
    {
        id: 26,
        name: "West by North",
        abbr: "WbN",
        deg: 281.25
    },
    {
        id: 27,
        name: "West-Northwest",
        abbr: "WNW",
        deg: 292.5
    },
    {
        id: 28,
        name: "Northwest by West",
        abbr: "NWbW",
        deg: 303.75
    },
    {
        id: 29,
        name: "Northwest",
        abbr: "NW",
        deg: 315
    },
    {
        id: 30,
        name: "Northwest by North",
        abbr: "NWbN",
        deg: 326.25
    },
    {
        id: 31,
        name: "North-Northwest",
        abbr: "NNW",
        deg: 337.5
    },
    {
        id: 32,
        name: "North by West",
        abbr: "NbW",
        deg: 348.75
    },
    {
        id: 33,
        name: "North",
        abbr: "N",
        deg: 360
    }
];
//https://www.surfertoday.com/windsurfing/how-to-read-wind-direction
const getWind = (deg) => {
    for (let i = 0; i < winds.length; i++) {
        if(deg > (winds[i].deg - 5.625) && deg < (winds[i].deg + 5.625))
            return winds[i].abbr;
    }
}