<template>
  <div class="container">
    <svg width="100%" height="100%"></svg>
  </div>
  <button @click="creatScatterChart">1112</button>
</template>

<script>
import axisJson from '../data/scatter/axis.json'
import * as d3 from 'd3'
// import test from '../data/text.json'

export default {
  name: 'view3_2',
  data () {
    return {
      chartValue: {
      },
      chartConfig: {
        margin: 10,
        squareValue: 300,
        axisValue: [30, 80, 130, 180, 230]
      }
    }
  },
  methods: {
    getColor (idx, proportion) {
      const palette = [ // 从上到下：绿黄蓝紫灰红
        ['#2ca25f', '#99d8c9'],
        ['#fdae6b', '#ffeda0'],
        ['#3182bd', '#9ecae1'],
        ['#756bb1', '#bcbddc'],
        ['#636363', '#bdbdbd'],
        ['#f03b20', '#feb24c']
      ]
      const i = d3.interpolateLab(palette[idx][0], palette[idx][1])
      return i(proportion)
    },
    creatScatterChart () {
      // D3画图中this指代对象会发生改变
      const that = this
      const main = d3.select('.container svg')
        .append('g')
        .classed('main', true)
        .attr('transform', 'translate(' + 0 + ',' + 0 + ')')
      // const axiss = that.calAxiss()
      const coordinations = that.calSquareCoordinates(5)
      // console.log(coordinations)
      const squares = main.append('g')
        .classed('areas', true)
      squares.selectAll('g')
        .data(coordinations)
        .enter()
        .append('g')
        .attr('class', function (d, i) {
          return 'square' + (i + 1)
        })
      // console.log(coordinations.length)
      for (let i = 0; i < coordinations.length; i++) {
        const square = squares.select('.square' + (i + 1))
        const coordination = coordinations[i]
        // console.log(coordination.x)
        square.append('rect')
          .attr('x', coordination.x)
          .attr('y', coordination.y)
          .attr('width', that.chartConfig.squareValue)
          .attr('height', that.chartConfig.squareValue)
          .attr('stroke', 'red')
          .attr('fill', 'none')
        const axiss = square.append('g')
          .classed('axiss', true)
          .attr('transform', 'translate(' + coordination.x + ',' + coordination.y + ')')
        // console.log(that.calAxiss()[0][0])
        const axissValue = that.calAxiss()[0]
        axiss.selectAll('g')
          .data(axissValue)
          .enter()
          .append('g')
          .attr('class', function (d, i) {
            return 'axis' + (i + 1)
          })
        const smallSquares = square.append('g')
          .classed('smallSquares', true)
          .attr('transform', 'translate(' + coordination.x + ',' + coordination.y + ')')
        smallSquares.selectAll('g')
          .data(axissValue)
          .enter()
          .append('g')
          .attr('class', function (d, i) {
            return 'smallSquare' + (i + 1)
          })
        for (let k = 0; k < axissValue.length; k++) {
          const axis = axiss.select('.axis' + (k + 1))
          const smallSquare = smallSquares.select('.smallSquare' + (k + 1))
          if (i % 2 === 0) {
            axis.append('rect')
              .attr('x', that.chartConfig.axisValue[k])
              .attr('y', 10)
              .attr('width', 40)
              .attr('height', 10)
              .attr('fill', function (d, index) {
                return that.getColor(i, axissValue[k].proportion)
              })
          } else {
            axis.append('rect')
              .attr('y', that.chartConfig.axisValue[k])
              .attr('x', 10)
              .attr('width', 10)
              .attr('height', 40)
              .attr('fill', function (d, index) {
                return that.getColor(i, axissValue[k].proportion)
              })
          }
          smallSquare.append('rect')
            .attr('x', that.chartConfig.axisValue[k])
            .attr('y', that.chartConfig.axisValue[k])
            .attr('width', 40)
            .attr('height', 40)
            .attr('fill', function (d, index) {
              return that.getColor(i, axissValue[k].proportion)
            })
        }
      }
      // const squares = main.append('g')
      //   .classed('squares', true)
      // squares.selectAll('square')
      //   .data(coordinations)
      //   .enter()
      //   .append('rect')
      //   .attr('x', function (d) {
      //     return d.x
      //   })
      //   .attr('y', function (d) {
      //     return d.y
      //   })
      //   .attr('width', that.chartConfig.squareValue)
      //   .attr('height', that.chartConfig.squareValue)
      //   // .attr('fill', 'none')
    },
    // 获取axis.json文件里的数据，返回一个26*5的数组，元素为min，max，proportion
    calAxiss () {
      // keys为第一层26个title
      // key1为里面title，就一个，只有0可用
      // 读取数组里范围的格式：axisJson[keys[0]][0][keys1[0]][0][0]
      // 读取数组里比例的格式：axisJson[keys[0]][0][keys1[0]][1]
      const keys = Object.keys(axisJson)
      const axiss = []
      for (let i = 0; i < keys.length; i++) {
        const axis = []
        for (let k = 0; k < axisJson[keys[i]].length; k++) {
          const key1 = Object.keys(axisJson[keys[i]][k])
          const min = axisJson[keys[i]][k][key1[0]][0][0]
          const max = axisJson[keys[i]][k][key1[0]][0][1]
          const proportion = axisJson[keys[i]][k][key1[0]][1]
          axis.push({
            min: min,
            max: max,
            proportion: proportion
          })
        }
        axiss.push(axis)
      }
      return axiss
    },
    // 计算大正方形的起点坐标，idx为第idx个
    calSquareCoordinates (idx) {
      const coordinations = []
      for (let i = 0; i <= idx; i++) {
        coordinations.push((i % 2 === 0) ? { x: i / 2 * this.chartConfig.squareValue, y: (i / 2) * this.chartConfig.squareValue } : { x: (i + 1) / 2 * this.chartConfig.squareValue, y: (i - 1) / 2 * this.chartConfig.squareValue })
      }
      return coordinations
    }
  },
  mounted () {
    this.creatScatterChart()
  }
}
</script>

<style scoped>

.container {
  width: 1200px;
  height: 900px;
  border: 2px solid black;
}

</style>
