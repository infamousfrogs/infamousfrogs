module.exports = {
    chart: {
        type: 'bar',
        height: 500
    },
    title: {
        // text: 'Historic World Population by Region'
        text: 'Daily Nutritional Value'
    },
    // subtitle: {
    //     text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
    // },
    xAxis: {
        // categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      title: {
          text: 'Nutrients'
      },
      tickInterval: 1,
      labels: {
        style: {
          fontSize: '10px'
        }
      }
    },

    yAxis: {
      title: {
          type: 'text',
          text: 'Percentage',
      },
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
    credits: {
        enabled: false
    },
    series: [{
    //     name: 'Year 1800',
    //     data: [107, 31, 635, 203, 2]
    // }, {
    //     name: 'Year 1900',
    //     data: [133, 156, 947, 408, 6]
    // }, {
    //     name: 'Year 2012',
    //     data: [1052, 954, 4250, 740, 38]
    }]
};
