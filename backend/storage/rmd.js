const ChartjsNode = require('chartjs-node');
const fs = require("fs");
const constants = require("./tstmerging/constants.js");

let random =  process.argv[2];
let data = JSON.parse(fs.readFileSync("/tmp/data" + random + ".json"));

const COLORS_IN_ORDER = constants.RATINGS_IN_ORDER.map(rating => constants.RATINGS_CHARTS_MAP[rating].color);
// list that adds up to 7 in  order of good, bad, normal
let pieChartDataList = constants.RATINGS_IN_ORDER.map(rating => Object.values(data.days).filter(x => x == rating).length);

let pieChartFileName = "/tmp/pieChart" + data.random + ".png";
let barChartFileName = "/tmp/barChart" + data.random + ".png";
var chartNodePie = new ChartjsNode(235, 235);
var myChartDataPie = {
        datasets: [{
            data: pieChartDataList,
            backgroundColor: COLORS_IN_ORDER,
            borderColor: COLORS_IN_ORDER,
            borderWidth: 1
        }]
    };
var chartJsOptions = {
    type: 'pie',
    data: myChartDataPie,
    options: {}
};

chartNodePie.drawChart(chartJsOptions)
.then(() => {
    return chartNodePie.getImageBuffer('image/png');
})
.then(buffer => {
    return chartNodePie.getImageStream('image/png');
})
.then(streamResult => {
    return chartNodePie.writeImageToFile('image/png', pieChartFileName);
});
let daysInOrder = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
var chartNodeBar = new ChartjsNode(232, 232);  //232
let backgroundColor = daysInOrder.map(day => constants.RATINGS_CHARTS_MAP[data.days[day]].color);
let barChartData = [];
for (let day of daysInOrder) {
    let rating = data.days[day];
    barChartData.push(constants.RATINGS_CHARTS_MAP[rating].number);
}
console.log("<weeklychartgeneratorbinary>", JSON.stringify(data), JSON.stringify(backgroundColor), JSON.stringify(barChartData));
var chartJsOptionsBar = {
    type: 'bar',
    data: {
        labels: daysInOrder,
        datasets: [{
            backgroundColor: backgroundColor,
            data: barChartData
        }]
    },
    options: {
        scales: {
            xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    fontColor: "#FFF", // this here
                    display: false,
                },
            }],
            yAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                    drawBorder: false,
                    display: false,
                },
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 3,
                    display: false,
                },

            }]
        },
        legend: { display: false },
        title: { display: false }
    }
};
chartNodeBar.drawChart(chartJsOptionsBar)
    .then(() => {
        return chartNodeBar.getImageBuffer('image/png');
    })
    .then(buffer => {
        return chartNodeBar.getImageStream('image/png');
    })
    .then(streamResult => {
        return chartNodeBar.writeImageToFile('image/png', barChartFileName);
    });