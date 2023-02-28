<template>
  <div class="container">
    <svg width="100%" height="100%"></svg>
  </div>
  <button @click="creatScatterChart">111</button>
</template>

<script>
import axisJson from '../data/scatter/axis.json'
import pointJson2 from '../data/scatter/point_2.json'
import pointObjJson2 from '../data/scatter/point_obj_2.json'
import * as d3 from 'd3'
// import test from '../data/text.json'

export default {
  name: 'view3_2',
  data () {
    return {
      chartValue: {
        showAll: [4, 6, 10, 13, 15, 16]
      },
      chartConfig: {
        margin: 10,
        squareValue: 270,
        axisValue: [30, 80, 130, 180, 230]
      }
    }
  },
  methods: {
    getColor (idx, proportion) {
      const palette = [ // 从上到下：绿黄蓝紫灰红
        // ['#2ca25f', '#99d8c9'],
        ['#2ca25f', '#f03b20'],
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
      const coordinations = that.calSquareCoordinates(5)
      const squares = main.append('g')
        .classed('squares', true)
      squares.selectAll('g')
        .data(coordinations)
        .enter()
        .append('g')
        .attr('class', function (d, i) {
          return 'square' + (i + 1)
        })
      const axissValue = that.getAxiss()[0]
      for (let i = 0; i < coordinations.length; i++) {
        const square = squares.select('.square' + (i + 1))
        const coordination = coordinations[i]
        square.append('rect')
          .attr('x', coordination.x)
          .attr('y', coordination.y)
          .attr('width', that.chartConfig.squareValue)
          .attr('height', that.chartConfig.squareValue)
          // .attr('stroke', 'red')
          .attr('fill', 'none')
        const axiss = square.append('g')
          .classed('axiss', true)
          .attr('transform', 'translate(' + coordination.x + ',' + coordination.y + ')')
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
              // 按照 4 3 2 1 0进行作图
              .attr('x', that.chartConfig.axisValue[axissValue.length - 1 - k])
              .attr('y', 10)
              .attr('width', 40)
              .attr('height', 10)
              .attr('fill', function (d, index) {
                return that.getColor(i, axissValue[k].proportion)
              })
            for (let j = 0; j < axissValue.length; j++) {
              smallSquare.append('rect')
                .attr('x', that.chartConfig.axisValue[k])
                .attr('y', that.chartConfig.axisValue[j])
                .attr('width', 40)
                .attr('height', 40)
                .attr('fill', 'none')
                .attr('stroke-width', 1)
                .attr('stroke', 'black')
                .attr('stroke-dasharray', 5)
            }
          } else {
            axis.append('rect')
              .attr('y', that.chartConfig.axisValue[axissValue.length - 1 - k])
              .attr('x', 10)
              .attr('width', 10)
              .attr('height', 40)
              .attr('fill', function (d, index) {
                return that.getColor(i, axissValue[k].proportion)
              })
            for (let j = 0; j < axissValue.length; j++) {
              smallSquare.append('rect')
                .attr('x', that.chartConfig.axisValue[j])
                .attr('y', that.chartConfig.axisValue[k])
                .attr('width', 40)
                .attr('height', 40)
                .attr('fill', 'none')
                .attr('stroke-width', 1)
                .attr('stroke', 'black')
                .attr('stroke-dasharray', 5)
            }
          }
        }
      }
      const pointsData = that.getPoints(pointJson2)
      const pointsCoordinates = that.calPointsCoordinates(pointsData, that.getAxiss()[0], that.getAxiss()[2], 0)
      const pointsObjData = that.getPoints(pointObjJson2)
      const pointsObjCoordinates = that.calPointsCoordinates(pointsObjData, that.getAxiss()[0], that.getAxiss()[2], 0)
      const points = main.append('g')
        .classed('points', true)
      points.selectAll('points')
        .data(pointsCoordinates)
        .enter()
        .append('circle')
        .attr('cx', function (d) {
          return d.x
        })
        .attr('cy', function (d) {
          return d.y
        })
        .attr('r', 2)
        .attr('fill', function (d, index) {
          return that.getColor(0, axissValue[d.axis].proportion)
        })
      points.selectAll('points')
        .data(pointsObjCoordinates)
        .enter()
        .append('circle')
        .attr('cx', function (d) {
          return d.x
        })
        .attr('cy', function (d) {
          return d.y
        })
        .attr('r', 2)
        .attr('fill', function (d, index) {
          return that.getColor(0, axissValue[d.axis].proportion)
        })
    },
    // 获取axis.json文件里的数据，返回一个26*5的数组，元素为min，max，proportion
    getAxiss () {
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
    // 获取point和point_obj文件里点的数据，返回一个数组，元素为x,y,axis
    getPoints (fileName) {
      const pointsFile = fileName
      const pointKeys = Object.keys(pointsFile)
      const points = []
      for (let i = 0; i < pointKeys.length; i++) {
        const x = pointsFile[pointKeys[i]][0][0]
        const y = pointsFile[pointKeys[i]][0][1]
        const axis = pointsFile[pointKeys[i]][1]
        points.push({
          name: pointKeys[i],
          x: x,
          y: y,
          axis: axis
        })
      }
      return points
    },
    // 传入数据分别为点数据，本轴数据，外轴数据，奇偶判别
    // 按轴输出点的坐标,以及对应的颜色
    calPointsCoordinates (pointsData, axisData1, axisData2, flag) {
      const points = []
      for (let i = 0; i < pointsData.length; i++) {
        const sliceX = pointsData[i].axis.slice(2, 3) // 将来容易在这里出错
        const sliceY = this.calSliceY(pointsData[i].y, axisData2)
        if (flag === 0) {
          const x = this.chartConfig.axisValue[axisData1.length - 1 - sliceX] + 40 - (pointsData[i].x - axisData1[sliceX].min) / (axisData1[sliceX].max - axisData1[sliceX].min) * 40
          const y = this.chartConfig.axisValue[axisData2.length - 1 - sliceY] + 40 - (pointsData[i].y - axisData2[sliceY].min) / (axisData2[sliceY].max - axisData2[sliceY].min) * 40
          if (i === 19) console.log(axisData2[sliceY].max - axisData2[sliceY].min)
          points.push({
            x: x,
            y: y,
            axis: sliceX
          })
        } else {
          const y = this.chartConfig.axisValue[axisData1.length - 1 - sliceX] + 40 - (pointsData[i].x - axisData1[sliceX].min) / (axisData1[sliceX].max - axisData1[sliceX].min) * 40
          const x = this.chartConfig.axisValue[axisData2.length - 1 - sliceY] + 40 - (pointsData[i].y - axisData2[sliceY].min) / (axisData2[sliceY].max - axisData2[sliceY].min) * 40
          points.push({
            x: x,
            y: y,
            axis: sliceX
          })
        }
      }
      return points
    },
    calSliceY (y, axisData) {
      for (let i = 0; i < axisData.length; i++) {
        if (y <= axisData[i].max && y >= axisData[i].min) {
          return i
        }
      }
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
  /*border: 2px solid black;*/
}

.smallSquare rect {
  border: 2px solid black;
}

.axiss rect {
  border: 2px solid black;
}

</style>
