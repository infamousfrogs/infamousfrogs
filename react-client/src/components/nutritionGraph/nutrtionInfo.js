module.exports = {
    chart: {
        type: 'bar'
    },
    title: {
        // text: 'Historic World Population by Region'
        text: 'Daily Nutritional Value'
    },
    // subtitle: {
    //     text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
    // },
    xAxis: {
        // categories: data.nutrientTitle,
        categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
        title: {
            text: 'Percent'
        }
    },
    yAxis: {
        min: 0,
        // title: {
        //     text: 'Population (millions)',
        //     align: 'high'
        // },
        labels: {
            overflow: 'justify'
        }
    },
    // tooltip: {
        // valueSuffix: ' millions'
    // },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    // legend: {
    //     layout: 'vertical',
    //     align: 'right',
    //     verticalAlign: 'top',
    //     x: -40,
    //     y: 80,
    //     floating: true,
    //     borderWidth: 1,
    //     // backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
    //     backgroundColor: '#FFFFFF',
    //
    //     shadow: true
    // },
    credits: {
        enabled: false
    },
    // series: null
    // series: [{
    //     data: data.percentDaily
    // }]
    // series: null
    // series: {data: null}
    series: [{
        name: 'Year 1800',
        data: [107, 31, 635, 203, 2]
    }, {
        name: 'Year 1900',
        data: [133, 156, 947, 408, 6]
    }, {
        name: 'Year 2012',
        data: [1052, 954, 4250, 740, 38]
    }]
};
