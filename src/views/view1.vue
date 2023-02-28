<template>
  <div class="container">
    <svg width="100%" height="100%"></svg>
  </div>
</template>

<script>
import axisJson from '../data/parallelCoordination/axis.json'
import * as d3 from 'd3'
export default {
  name: 'view_1',
  data () {
    return {
      chartValue: {
        axisValue: ['4', '9', '16', '21', '25', '28', '31']
      },
      chartConfig: {
        axisValue: [0, 50, 100, 150, 200, 250, 300]
      }
    }
  },
  methods: {
    createParallelCoordinate () {
      const that = this
      const main = d3.select('.container svg')
        .append('g')
        .classed('main', true)
        .attr('transform', 'translate(' + 0 + ',' + 0 + ')')
      // 画平行坐标轴
      const axisData = that.getAxisData(axisJson)
      const parallelsCoordinates = main.append('g')
        .classed('parallelsCoordinates', true)
      parallelsCoordinates.selectAll('g')
        .data(axisData[0].axis + axisData[1].axis + axisData[2].axis + axisData[3].axis + axisData[4].axis + axisData[5].axis + axisData[6].axis)
        .enter()
        .append('g')
        .attr('class', function (d, i) {
          return 'parallelCoordinates' + (i + 1)
        })
      for (let i = 0; i < axisData.length; i++) {
        for (let j = 0; j < axisData[i].axis.length; j++) {
          const parallelCoordinates = parallelsCoordinates.select('.parallelCoordinates' + (i * 5 + j + 1))
          parallelCoordinates.append('rect')
            .attr('x', i * 120)
            .attr('y', j * 100)
            .attr('width', 10)
            .attr('height', 90)
            .attr('stroke', 'black')
            .attr('fill', 'none')
        }
      }
      console.log(axisData)
    },
    getAxisData (file) {
      const keys = Object.keys(file)
      const axiss = []
      let temp = 0
      console.log(keys)
      for (let i = 0; i < keys.length; i++) {
        const axis = []
        if (keys[i] === this.chartValue.axisValue[temp]) {
          for (let k = 0; k < axisJson[keys[i]].length; k++) {
            const key1 = Object.keys(axisJson[keys[i]][k])
            const min = axisJson[keys[i]][k][key1[0]][0][0]
            const max = axisJson[keys[i]][k][key1[0]][0][1]
            axis.push({
              min: min,
              max: max
            })
          }
          temp += 1
          axiss.push({
            axis: axis,
            key: keys[i]
          })
        }
      }
      return axiss
    }
  },
  mounted () {
    this.createParallelCoordinate()
  }
}
</script>

<style scoped>

.container {
  width: 1000px;
  height: 1200px;
  border: 2px solid black;
}

</style>
