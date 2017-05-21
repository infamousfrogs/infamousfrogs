module.exports = {
  popoverNutrition: {
    chart: {
        type: 'bar',
        height: 600,
        // renderTo: 'chart'
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
  },

  dialogNutrition: {
    chart: {
        polar: true,
        type: 'line'
    },

    title: {
        // text: 'Budget vs spending',
        text: 'Nutritional Comparison',
        x: -80
    },

    pane: {
        size: '80%'
    },

    xAxis: {
        // categories: ['Sales', 'Marketing', 'Development', 'Customer Support',
        //         'Information Technology', 'Administration'],
        tickmarkPlacement: 'on',
        lineWidth: 0
    },

    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
    },

    tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.1f}% Daily Value</b><br/>'
    },

    legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 70,
        layout: 'vertical'
    },

    series: [
    //     name: 'Tender Biscuits for Two',
    //     data: [43000, 19000, 60000, 35000, 17000],
    //     pointPlacement: 'on'
    // }, {
    //     name: 'Blueberry Smoothie Pops',
    //     data: [50000, 39000, 42000, 31000, 26000],
    //     pointPlacement: 'on'
    ]
  }
};
