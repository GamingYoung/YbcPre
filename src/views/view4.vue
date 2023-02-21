<template>
  <div class="container">
    <svg width="100%" height="100%"></svg>
  </div>
</template>

<script>
import industryRatioJson from '../data/line/ind_ratio_obj.json'
import industryLineJson from '../data/line/ind_line_obj.json'
import copJson from '../data/line/ind_copp.json'
import ringJson from '../data/line/ring_obj.json'
import * as d3 from 'd3'
export default {
  name: 'view_4',
  data () {
    return {
      chartValue: {
        count: 1
      },
      chartConfig: {
        monthColor: ['#9ACD32', '#FF4500', '#FFC125', '#B0C4DE'],
        monthRectWidth: 100,
        monthRectHeight: 20,
        circleMinRadius: 5,
        circleMaxRadius: 15,
        ringMinRadius: 20,
        ringMaxRadius: 30,
        lineRadius: 40,
        count: 1
      }
    }
  },
  computed: {
    // 计算下面坐标轴长度，逻辑将来在写
    axisLength: function () {
      return 4
    }
  },
  methods: {
    creatLineChart () {
      const that = this
      const keys = Object.keys(industryRatioJson)
      const main = d3.select('.container svg')
        .append('g')
        .classed('main', true)
        .attr('transform', 'translate(' + 0 + ',' + 0 + ')')

      // 画彩色坐标轴
      const rectAxiss = main.append('g')
        .classed('sectors', true)
      rectAxiss.selectAll('g')
        .data(industryRatioJson[keys[0]] + industryRatioJson[keys[1]])
        .enter()
        .append('g')
        .attr('class', function (d, i) {
          return 'rectAxis' + (i + 1)
        })
      for (let i = 0; i < industryRatioJson[keys[0]].length + industryRatioJson[keys[1]].length; i++) {
        const rectAxis = rectAxiss.select('.rectAxis' + (i + 1))
        if (i < industryRatioJson[keys[0]].length) {
          rectAxis.append('rect')
            .attr('x', i * that.chartConfig.monthRectWidth)
            .attr('y', 0)
            .attr('width', that.chartConfig.monthRectWidth)
            .attr('height', that.chartConfig.monthRectHeight)
            .attr('fill', that.chartConfig.monthColor[i % 4])
        } else {
          rectAxis.append('rect')
            .attr('x', (i - industryRatioJson[keys[0]].length) * that.chartConfig.monthRectWidth)
            .attr('y', 580)
            .attr('width', that.chartConfig.monthRectWidth)
            .attr('height', that.chartConfig.monthRectHeight)
            .attr('fill', that.chartConfig.monthColor[(i - industryRatioJson[keys[0]].length) % 4])
        }
      }

      // 画中间虚线
      const axis = main.append('line')
        .classed('axis', true)
      axis.attr('x1', 0)
        .attr('y1', 299)
        .attr('x2', 1590)
        .attr('y2', 299)
        .attr('stroke-width', 2)
        .attr('stroke', 'black')
        .style('stroke-dasharray', '5.5')

      // 绘制折线图
      const linesPoints = this.getLineData(industryRatioJson, industryLineJson, copJson)
      const lines = main.append('g')
      for (let j = 0; j < 2; j++) {
        lines.selectAll('g')
          .data(linesPoints[j])
          .enter()
          .append('g')
          .attr('class', function (d, i) {
            return 'line' + (i + 1)
          })
        for (let i = 0; i < linesPoints[j].length - 1; i++) {
          const line = lines.select('.line' + (i + 1))
          line.append('line')
            .attr('x1', linesPoints[j][i].x)
            .attr('y1', linesPoints[j][i].y)
            .attr('x2', linesPoints[j][i + 1].x)
            .attr('y2', linesPoints[j][i + 1].y)
            .attr('stroke-width', 2)
            .attr('stroke', 'black')
        }
      }
      const copLines = main.append('g')
      copLines.selectAll('g')
        .data(linesPoints[2])
        .enter()
        .append('g')
        .attr('class', function (d, i) {
          return 'line' + (i + 1)
        })
      for (let i = 0; i < linesPoints[2].length - 1; i++) {
        const line = copLines.select('.line' + (i + 1))
        line.append('line')
          .attr('x1', linesPoints[2][i].x)
          .attr('y1', linesPoints[2][i].y)
          .attr('x2', linesPoints[2][i + 1].x)
          .attr('y2', linesPoints[2][i + 1].y)
          .attr('stroke-width', 1)
          .attr('stroke', 'yellow')
      }

      // 定义线性渐变
      const defs = main.append('defs')
      const linearGradient = defs.append('linearGradient')
        .attr('id', 'linearColor')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%')
      const stop1 = linearGradient.append('stop')
        .attr('offset', '0%')
      stop1.style('stop-color', 'red')
      const stop2 = linearGradient.append('stop')
        .attr('offset', '100%')
      stop2.style('stop-color', 'blue')
      // 画圆环
      const ringsData = that.getRingData(ringJson)
      const views = main.append('g')
        .classed('views', true)
      views.selectAll('g')
        .data(ringsData[0])
        .enter()
        .append('g')
        .attr('class', function (d, i) {
          return 'view' + (i + 1)
        })
      for (let i = 0; i < ringsData[0].length; i++) {
        let view = views.select('.view' + (i + 1))
        view = main.append('g').attr('transform', 'translate(' + linesPoints[0][i].x + ',' + linesPoints[0][i].y + ')')
        const path = d3.path()
        path.arc(0, 0, that.chartConfig.lineRadius, -Math.PI, 0.5 * Math.PI)
        view.append('path')
          .attr('d', path.toString())
          .style('fill', 'lightgrey')
          .style('stroke', 'url(#' + linearGradient.attr('id') + ')')
          .style('stroke-width', '2')
        // 画圆
        const circle = view.append('circle')
        circle.attr('cx', 0)
          .attr('cy', 0)
          .attr('r', ringsData[0][i].circleRadius)
          .attr('fill', 'green')
        // 画环
        const arcs = view.append('g')
          .classed('arcs', true)
        arcs.selectAll('g')
          .data(ringsData[0][i].ringsWidth)
          .enter()
          .append('g')
          .attr('class', function (d, i) {
            return 'arc' + (i + 1)
          })
        for (let j = 0; j < ringsData[0][i].ringsWidth.length; j++) {
          let arc = arcs.select('.arc' + (i + 1))
          arc = d3.arc()
            .outerRadius(ringsData[0][i].ringsWidth[j])
            .innerRadius(that.chartConfig.ringMinRadius)
            .startAngle(j * 2 * Math.PI / 5)
            .endAngle((j + 1) * 2 * Math.PI / 5)
          const outArc = view.append('path')
            .attr('d', arc)
          if (ringsData[0][i].ringsProportion[j] === 0) {
            outArc.attr('fill', 'blue')
          } else if (ringsData[0][i].ringsProportion[j] > 0) {
            outArc.attr('fill', 'red')
          } else {
            outArc.attr('fill', 'green')
          }
        }
      }
    },

    // 将环图坐标返回
    getRingData (file) {
      const keyInd = Object.keys(file)
      const ringsData = []
      for (let i = 0; i < keyInd.length; i++) {
        const keyMonth = Object.keys(file[keyInd[i]])
        const copSum = []
        let circleRadius = 0
        const ringData = []
        let ringMax = 0
        for (let j = 0; j < keyMonth.length; j++) {
          copSum[j] = 0
          for (let k = 0; k < 5; k++) {
            copSum[j] += file[keyInd[i]][keyMonth[j]][k][1]
            ringMax = file[keyInd[i]][keyMonth[j]][k][1] > ringMax ? file[keyInd[i]][keyMonth[j]][k][1] : ringMax
          }
        }
        const circleMin = Math.min.apply(null, copSum)
        const circleMax = Math.max.apply(null, copSum)
        for (let j = 0; j < keyMonth.length; j++) {
          const ringsWidth = []
          const ringsProportion = []
          const linesColor = []
          for (let k = 0; k < 5; k++) {
            const ringWidth = this.chartConfig.ringMinRadius + file[keyInd[i]][keyMonth[j]][k][1] / ringMax * (this.chartConfig.ringMaxRadius - this.chartConfig.ringMinRadius)
            let ringProportion = 0
            const lineColor = []
            if (j === 0) {
              lineColor.push({
                head: 'black',
                rear: 'black'
              })
            } else {
              ringProportion = (file[keyInd[i]][keyMonth[j]][k][1] - file[keyInd[i]][keyMonth[j - 1]][k][1]) / ringMax
              lineColor.push({
                head: file[keyInd[i]][keyMonth[j]][k][0][0] < file[keyInd[i]][keyMonth[j - 1]][k][0][0] ? 'red' : 'green',
                rear: file[keyInd[i]][keyMonth[j]][k][0][1] < file[keyInd[i]][keyMonth[j - 1]][k][0][1] ? 'red' : 'green'
              })
            }
            circleRadius = this.chartConfig.circleMinRadius + (copSum[j] - circleMin) / (circleMax - circleMin) * (this.chartConfig.circleMaxRadius - this.chartConfig.circleMinRadius)
            ringsWidth.push(ringWidth)
            ringsProportion.push(ringProportion)
            linesColor.push(lineColor)
          }
          ringData.push({
            circleRadius: circleRadius,
            ringsWidth: ringsWidth,
            ringsProportion: ringsProportion,
            linesColor: linesColor
          })
        }
        ringsData.push(ringData)
      }
      console.log(ringsData)
      return ringsData
    },

    // 将折线图坐标返回
    getLineData (file1, file2, file3) {
      const keys1 = Object.keys(file1)
      const linesPoints = []
      for (let j = 0; j < keys1.length; j++) {
        const max = Math.max.apply(null, file1[keys1[j]])
        const min = Math.min.apply(null, file1[keys1[j]])
        const linesPoint = []
        for (let i = 0; i < file1[keys1[j]].length; i++) {
          const x = 50 + i * this.chartConfig.monthRectWidth
          const y = j === 0 ? 80 + (max - file1[keys1[j]][i]) / (max - min) * 160 : 360 + (max - file1[keys1[j]][i]) / (max - min) * 160
          const name = file2[keys1[j]][i]
          linesPoint.push({
            x: x,
            y: y,
            name: name
          })
        }
        linesPoints.push(linesPoint)
      }
      const keys3 = Object.keys(file3)
      const key3 = Object.keys(file3[keys3[0]])
      const ratio = []
      for (let i = 0; i < key3.length; i++) {
        ratio.push(file3[keys3[0]][key3[i]][1])
      }
      const max = Math.max.apply(null, ratio)
      const min = Math.min.apply(null, ratio)
      const linesPoint = []
      for (let i = 0; i < key3.length; i++) {
        const x = 50 + i * this.chartConfig.monthRectWidth
        const y = 80 + (max - ratio[i]) / (max - min) * 160
        const name = file3[keys3[0]][key3[i]][0]
        linesPoint.push({
          x: x,
          y: y,
          name: name
        })
      }
      linesPoints.push(linesPoint)
      return linesPoints
    }
  },
  mounted () {
    this.creatLineChart()
  }
}
</script>

<style scoped>

.container {
  width: 1600px;
  height: 600px;
  border: 2px solid black;
}

.line axis {
  fill-opacity: 0.5;
  stroke-width: 3;
}

</style>
