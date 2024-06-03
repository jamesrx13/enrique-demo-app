/// <reference path="../vendor/js/papaparse.js"/>
/// <reference path="../vendor/js/apexchart.js"/>
/// <reference path="../vendor/js/moment.js"/>

document.addEventListener('DOMContentLoaded', () => {

    const series = [
        {
            name: 'TEMPERATURA',
            data: [],
        },
        {
            name: 'PRESION',
            data: [],
        }
    ]

    var options = {
        series: [],
        chart: {
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        title: {
            text: 'Stock Price Movement',
            align: 'left'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
            },
        },
    };
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    Papa.parse('../data/CICL0002.csv', {
        download: true,
        skipEmptyLines: true,
        complete: (csv) => {

            let isFirst = true
            const allXaxis = []

            csv.data.forEach(row => {

                if (!isFirst) {
                    series[0].data.push(row[0])
                    series[1].data.push(row[1])
                    // DateTime
                    let currentDateTime = row[6] + ' ' + row[7]

                    currentDateTime = moment(currentDateTime, 'YYYY/MM/DD A hh:mm:ss')
                    allXaxis.push(currentDateTime.format('YYYY-MM-DD HH:mm:ss'))
                }

                isFirst = false
            })

            chart.updateSeries(series)

            chart.updateOptions({
                xaxis: {
                    categories: allXaxis,
                    type: "datetime",
                    tickAmount: 4,
                },
            })

        }
    })

})

