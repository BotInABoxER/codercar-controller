<template>
  <client-only>
    <RealtimeChart :chart-data="chartData" :options="chartOptions" />
  </client-only>
</template>

<script>
export default {
  data: () => ({
    chartData: {},
    dataArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    someNumber: 0,
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      title: 'Distance Sensor Readings',
      scales: {
        xAxes: [{
          type: 'linear',
          display: true,
          gridLines: {
            display: true
          },
          scaleLabel: {
            display: true,
            labelString: 'time'
          }
        }],
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            display: true
          },
          scaleLabel: {
            display: true,
            labelString: 'cm'
          }
        }]
      },
      legend: {
        display: true
      }
    }
  }),
  mounted () {
    this.updateChartData()
    setInterval(() => {
      this.updateChartData()
      const newDataArray = [...this.dataArray]
      newDataArray.shift()
      newDataArray.push(this.getRandomChartValues())
      this.dataArray = newDataArray
    }, 500)
  },
  methods: {
    getRandomChartValues() {
      this.someNumber = this.someNumber + 1
      return this.someNumber
    },
    updateChartData () {
      const currentIteration = this.getRandomChartValues()
      // console.log(this.dataArray.map((datapoint) => {
      //   return { x: datapoint, y: this.someNumber }
      // }))
      this.chartData = {
        labels: [currentIteration, currentIteration + 10],
        datasets: [
          {
            label: 'Distance Sensor Readings',
            backgroundColor: 'transparent',
            borderColor: 'blue',
            fill: false,
            // data: this.dataArray
            data: this.dataArray.map((datapoint) => {
              return { x: datapoint, y: this.getRandomChartValues() }
            })
          }
        ]
      }
    }
  }
}
</script>
