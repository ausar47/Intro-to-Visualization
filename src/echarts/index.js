//Share of population with mental or substance disorders,
let currentCountry = "World";
let countryList = [];
let seleceNode = document.getElementById("choose");
let bar = echarts.init(document.getElementById("bar"));

barOption = {
  title:{
    text:currentCountry,
    left: "right",
    top:"tight",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {},
  grid: {
    top: "20%",
    left: "0%",
    right: "10%",
    bottom: "-20%",
    containLabel: true,
  },
  timeline: {
    axisType: "category",
    left: 20,
    right: 20,

    bottom: 10,
    autoPlay: true,

    playInterval: 500,
    controlStyle:{
      show:false,
    },
    data: [
      "1990",
      "1991",
      "1992",
      "1993",
      "1994",
      "1995",
      "1996",
      "1997",
      "1998",
      "1999",
      "2000",
      "2001",
      "2002",
      "2003",
      "2004",
      "2005",
      "2006",
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
    ],
    show:false,

  },
  xAxis: {
    type: "value",
    axisLabel: {
      formatter(e) {
        return e + "%";
      },
    },
  },
  yAxis: {
    type: "category",
    data: [
      "Eating disorders",
      "Schizophrenia",
      "Bipolar disorder",
      "Drug use disorders",
      "Alcohol use disorders",
      "Depressive disorders",
      "Anxiety disorders",
    ],
  },
  series: [
    {
      name: "",
      type: "bar",
      label: {
        show: true,
        position: "right",
        formatter(e) {
          return e.value + "%";
        },
      },
      emphasis: {
        focus: "series",
      },
      data: [],
    },
  ],
};
bar.setOption(barOption);
function barDataGet(year, country) {
  let seriesData = [];
  for (let i in barData) {
    if (barData[i]["Entity"] == country && barData[i]["Year"] == year) {
      seriesData = [
        barData[i]["Eating disorders"],
        barData[i]["Schizophrenia"],
        barData[i]["Bipolar disorder"],
        barData[i]["Drug use disorders"],
        barData[i]["Alcohol use disorders"],
        barData[i]["Depressive disorders"],
        barData[i]["Anxiety disorders"],
      ];
    }
  }
  barOption.series[0].data = seriesData;

  bar.setOption({
    series: barOption.series,
  });
}
barDataGet(1990, currentCountry);
bar.on("timelinechanged", (params) => {
  barDataGet(barOption.timeline.data[params.currentIndex], currentCountry);
});
let scatter = echarts.init(document.getElementById("scatter"));

let scatterOption = {
  grid: {
    left: "3%",
    right: "15%",
    top:"20%",
    bottom: "10%",
    containLabel: true,
  },
  timeline: {
    axisType: "category",
    left: 20,
    right: 20,

    bottom: 10,
    autoPlay: true,

    playInterval: 500,

    data: [
      "1990",
      "1991",
      "1992",
      "1993",
      "1994",
      "1995",
      "1996",
      "1997",
      "1998",
      "1999",
      "2000",
      "2001",
      "2002",
      "2003",
      "2004",
      "2005",
      "2006",
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
    ],
    controlStyle:{
      show:false,
    },
    show:false
  },
  legend: {},
  xAxis: {
    min: 10,
    max: 25,
    name: "Share of females",
    nameLocation: "middle",
    nameGap: 30,
    axisLabel: {
      formatter(e) {
        return e + "%";
      },
    },
  },
  yAxis: {
    min: 10,
    max: 20,
    name: "Share of males",
    nameLocation: "middle",
    nameGap: 30,
    axisLabel: {
      formatter(e) {
        return e + "%";
      },
    },
  },
  series: [],
};
scatter.setOption(scatterOption);
function scatterDataGet(year) {
  let scatterList = [];
  for (let i in scatterData) {
    if (scatterData[i]["Year"] == year) {
      scatterData[i]["position"] = "未知地区";
      scatterList.push(scatterData[i]);
    }
  }
  for (let i in scatterList) {
    let name = scatterList[i]["Entity"];
    for (let j in cMap) {
      if (name == cMap[j]["country_name"]) {
        scatterList[i]["position"] = cMap[j]["continent_cname"];
      }
    }
  }
  let series = [];
  for (let i in scatterList) {
    series.push(scatterList[i]["position"]);
  }
  series = Array.from(new Set(series));
  for (let i in series) {
    series[i] = {
      name: series[i],
      data: [],
      type: "scatter",
      emphasis: {
        focus: "self",
        label: {
          show: true,
          position: "outside",
          formatter(e) {
            return e.value[2];
          },
        },
      },
      label: {
        show: true,
        position: "outside",
        formatter(e) {
          if (e.data.symbolSize > 10) {
            return e.value[2];
          } else {
            return "";
          }
        },
      },
    };
  }

  for (let i in scatterList) {
    for (let j in series) {
      if (series[j]["name"] == scatterList[i]["position"]) {
        let size = scatterList[i]["value"] / 10000000;
        if (size > 50) size = 50;
        series[j].data.push({
          value: [
            scatterList[i]["y"],
            scatterList[i]["x"],
            scatterList[i]["Entity"],
            size,
          ],
          symbolSize: size,
        });
      }
    }
  }

  scatter.setOption({
    series: series,
  });
}
scatterDataGet(1990);
scatter.on("timelinechanged", (params) => {
  scatterDataGet(scatterOption.timeline.data[params.currentIndex]);
});

let lineSeries = [
  {
    name: "30-34",
    type: "line",
    data: [],
  },
  {
    name: "Under 5",
    type: "line",
    data: [],
  },
  {
    name: "15-19",
    type: "line",
    data: [],
  },
  {
    name: "10-14",
    type: "line",
    data: [],
  },
  {
    name: "25-29",
    type: "line",
    data: [],
  },
  {
    name: "5-14",
    type: "line",
    data: [],
  },
  {
    name: "50-69",
    type: "line",
    data: [],
  },
  {
    name: "Age-standardized",
    type: "line",
    data: [],
  },
  {
    name: "15-49",
    type: "line",
    data: [],
  },
  {
    name: "70+years",
    type: "line",
    data: [],
  },
  {
    name: "20-24",
    type: "line",
    data: [],
  },
  {
    name: "All Ages",
    type: "line",
    data: [],
  },
];

for (let i in lineData) {
  lineSeries[0].data.push(lineData[i]["30-34"]);
  lineSeries[1].data.push(lineData[i]["Under 5"]);
  lineSeries[2].data.push(lineData[i]["15-19"]);
  lineSeries[3].data.push(lineData[i]["10-14"]);
  lineSeries[4].data.push(lineData[i]["25-29"]);
  lineSeries[5].data.push(lineData[i]["5-14"]);
  lineSeries[6].data.push(lineData[i]["50-69"]);
  lineSeries[7].data.push(lineData[i]["Age-standardized"]);
  lineSeries[8].data.push(lineData[i]["15-49"]);
  lineSeries[9].data.push(lineData[i]["70+years"]);
  lineSeries[10].data.push(lineData[i]["20-24"]);
  lineSeries[11].data.push(lineData[i]["All Ages"]);
}
let line = echarts.init(document.getElementById("line"));

line.setOption({
  grid: {
    left: "3%",
    right: "15%",
    bottom: "0%",
    top:"40%",
    containLabel: true,
  },
  tooltip: {},
  legend: {},
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "1990",
      "1991",
      "1992",
      "1993",
      "1994",
      "1995",
      "1996",
      "1997",
      "1998",
      "1999",
      "2000",
      "2001",
      "2002",
      "2003",
      "2004",
      "2005",
      "2006",
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
    ],
  },
  yAxis: {
    type: "value",
    axisLabel: {
      formatter(e) {
        return e + "%";
      },
    },
  },
  label: {
    show: true,
    position: "right",
    color: "inherit",
    formatter(e) {
      if (e.name == 2019) {
        return e.seriesName;
      } else {
        return "";
      }
    },
  },
  series: lineSeries,
});
window.onresize = function () {
  bar.resize();
  scatter.resize();
  line.resize();
};
