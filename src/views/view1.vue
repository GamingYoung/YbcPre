<template>
  <div class="container1">
    <svg width="100%" height="100%"></svg>
  </div>
</template>

<script>
import axisJson from '../data/parallelCoordinate/axis.json'
import corrDetailJson from '../data/parallelCoordinate/corr_detail.json'
import paraDetailJson from '../data/parallelCoordinate/para_detail.json'
import * as d3 from 'd3'
export default {
  name: 'view_1',
  data () {
    return {
      chartConfig: {
        axis: { width: 10, height: 90 },
        axisMargin: { left: 90, top: 10 }
      },
      chartValue: {
        axisValue: ['4', '9', '16', '21', '25', '28', '31'],
        copData: [4, 9, 16, 21, 25, 28, 31]
      }
    }
  },
  methods: {
    creatPCchart () {
      const that = this
      const main = d3.select('.container1 svg')
        .append('g')
        .classed('main', true)
        // 可以这么写数据，圆中心位置
        .attr('transform', 'translate(' + 0 + ',' + 0 + ')')

      // 画坐标轴
      const axisData = that.getAxisData(axisJson)
      const axiss = main.append('g')
        .classed('axiss', true)
      axiss.selectAll('g')
        .data(axisData.axisPosition)
        .enter()
        .append('g')
        .attr('class', function (d, i) {
          return 'axis' + (i + 1)
        })
      for (let i = 0; i < axisData.axisPosition.length; i++) {
        const axis = axiss.select('.axis' + (i + 1))
        axis.append('rect')
          .attr('x', axisData.axisPosition[i].x)
          .attr('y', axisData.axisPosition[i].y)
          .attr('width', that.chartConfig.axis.width)
          .attr('height', that.chartConfig.axis.height)
          .attr('fill', 'none')
          .attr('stroke-width', 2)
          .attr('stroke', 'black')
      }

      // 画公司标注
      const markData = that.getMarkData(axisData.axissValue, paraDetailJson)
      const marks = main.append('g')
        .classed('lines', true)
      marks.selectAll('g')
        .data(markData.mark)
        .enter()
        .append('g')
        .attr('class', function (d, i) {
          return 'mark' + (i + 1)
        })
      for (let i = 0; i < markData.mark.length; i++) {
        const mark = marks.select('.mark' + (i + 1))
        mark.append('line')
          .attr('x1', markData.mark[i][0])
          .attr('y1', markData.mark[i][1])
          .attr('x2', markData.mark[i][0] + 10)
          .attr('y2', markData.mark[i][1])
          .style('stroke', 'green')
          .style('stroke-width', 0.5)
      }

      // 画线
      const lines = main.append('g')
        .classed('lines', true)
      lines.selectAll('g')
        .data(markData.line)
        .enter()
        .append('g')
        .attr('class', function (d, i) {
          return 'line' + (i + 1)
        })
      for (let i = 0; i < markData.line.length; i++) {
        let lineGanerator = lines.select('.line' + (i + 1))
        lineGanerator = d3.line()
          .curve(d3.curveCatmullRom)
        const linePath = lineGanerator(markData.line[i])
        main.append('path')
          .attr('d', linePath)
          .attr('fill', 'none')
          .attr('stroke-width', 1)
          .attr('stroke', 'yellow')
      }
      const lineData = that.getLineData(axisData.axissValue, corrDetailJson)
      const copLine = d3.line()
        .curve(d3.curveCatmullRom)
      const copPath = copLine(lineData[0]) // 如果是0的话将来要不改数据传输回来的形式要不前面加判断
      main.append('path')
        .attr('d', copPath)
        .attr('fill', 'none')
        .attr('stroke-width', 2)
        .attr('stroke', 'green')
      const copCorLine = d3.line()
        .curve(d3.curveCatmullRom)
      const copCorPath = copCorLine(lineData[1]) // 如果是0的话将来要不改数据传输回来的形式要不前面加判断
      main.append('path')
        .attr('d', copCorPath)
        .attr('fill', 'none')
        .attr('stroke-width', 2)
        .attr('stroke', 'red')
    },

    getMarkData (axis, cop) {
      const keys = Object.keys(cop)
      const data = []
      const mark = []
      for (let i = 0; i < keys.length; i++) {
        const copData = []
        for (let j = 0; j < 7; j++) {
          const key = Object.keys(axis[j])
          for (let k = 0; k < axis[j][key[0]].length; k++) {
            if (Number(cop[keys[i]][j]) <= axis[j][key[0]][k].max && Number(cop[keys[i]][j]) >= axis[j][key[0]][k].min) {
              copData.push([this.chartConfig.axis.width / 2 + j * (this.chartConfig.axis.width + this.chartConfig.axisMargin.left), (4 - k) * (this.chartConfig.axis.height + this.chartConfig.axisMargin.top) + this.chartConfig.axis.height * (axis[j][key[0]][k].max - Number(cop[keys[i]][j])) / (axis[j][key[0]][k].max - axis[j][key[0]][k].min)])
              mark.push([j * (this.chartConfig.axis.width + this.chartConfig.axisMargin.left), (4 - k) * (this.chartConfig.axis.height + this.chartConfig.axisMargin.top) + this.chartConfig.axis.height * (axis[j][key[0]][k].max - Number(cop[keys[i]][j])) / (axis[j][key[0]][k].max - axis[j][key[0]][k].min)])
              break
            }
          }
        }
        data.push(copData)
      }
      return { line: data, mark: mark }
    },

    getLineData (axis, cop) {
      const keys = Object.keys(cop)
      const data = []
      for (let i = 0; i < keys.length; i++) {
        const point = []
        for (let j = 0; j < 7; j++) {
          const key = Object.keys(axis[j])
          for (let k = 0; k < axis[j][key[0]].length; k++) {
            if (Number(cop[keys[i]][this.chartValue.copData[j]]) <= axis[j][key[0]][k].max && Number(cop[keys[i]][this.chartValue.copData[j]]) >= axis[j][key[0]][k].min) {
              point.push([this.chartConfig.axis.width / 2 + j * (this.chartConfig.axis.width + this.chartConfig.axisMargin.left), (4 - k) * (this.chartConfig.axis.height + this.chartConfig.axisMargin.top) + this.chartConfig.axis.height * (axis[j][key[0]][k].max - Number(cop[keys[i]][this.chartValue.copData[j]])) / (axis[j][key[0]][k].max - axis[j][key[0]][k].min)])
              break
            }
          }
        }
        data.push(point)
      }
      return data
    },

    getAxisData (file) {
      const keys = Object.keys(file)
      let pos = 0
      const axissValue = []
      const axisPosition = []
      for (let i = 0; i < keys.length; i++) {
        const axisValue = []
        if (keys[i] === this.chartValue.axisValue[pos]) {
          for (let k = 0; k < file[keys[i]].length; k++) {
            const key1 = Object.keys(file[keys[i]][k])
            const min = file[keys[i]][k][key1[0]][0][0]
            const max = file[keys[i]][k][key1[0]][0][1]
            axisValue.push({
              min: min,
              max: max
            })
            axisPosition.push({
              x: (this.chartConfig.axis.width + this.chartConfig.axisMargin.left) * pos,
              y: (this.chartConfig.axis.height + this.chartConfig.axisMargin.top) * k
            })
          }
          axissValue.push({
            axis: axisValue,
            key: keys[i]
          })
          pos += 1
        }
      }
      // 交换axiss第3个与第4个元素
      axissValue.splice(2, 1, ...axissValue.splice(3, 1, axissValue[2]))
      const axis = {
        axissValue: axissValue,
        axisPosition: axisPosition
      }
      return axis
    }
  },
  mounted () {
    this.creatPCchart()
  }
}
</script>

<style scoped>

.container1 {
  width: 800px;
  height: 600px;
  /* border: 2px solid black; */
}

</style>
