<template>
  <div class="container">
    <svg width="100%" height="100%"></svg>
  </div>
</template>

<script>
import industryRatioJson from '../data/line/ind_ratio_obj.json'
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
        monthRectHeight: 20
      }
    }
  },
  // computed: {
  //   // 计算下面坐标轴长度，逻辑将来在写
  //   axisLength: function () {
  //     return 4
  //   }
  // },
  methods: {
    creatLineChart () {
      const that = this
      const main = d3.select('.container svg')
        .append('g')
        .classed('main', true)
        // 可以这么写数据，圆中心位置
        .attr('transform', 'translate(' + 10 + ',' + 10 + ')')
      const rectAxiss = main.append('g')
        .classed('sectors', true)
      rectAxiss.selectAll('g')
        .data(industryRatioJson.软件开发)
        .enter()
        .append('g')
        .attr('class', function (d, i) {
          return 'rectAxis' + (i + 1)
        })
      console.log('1')
      for (let i = 0; i < industryRatioJson.软件开发.length; i++) {
        const rectAxis = rectAxiss.select('.sector' + (i + 1))
        rectAxis.append('rect')
          .attr('x', i * that.chartConfig.monthRectWidth)
          .attr('y', 0)
          .attr('width', that.chartConfig.monthRectWidth)
          .attr('height', that.chartConfig.monthRectHeight)
          .attr('fill', that.chartConfig.monthColor[i % 4])
      }
    },
    // 将坐标返回
    getLineData (file1, file2) {
      return file2
    }
  },
  mounted () {
    this.creatLineChart()
    console.log('2')
  }
}
</script>

<style scoped>

.container {
  width: 1000px;
  height: 600px;
  border: 2px solid black;
}

</style>
