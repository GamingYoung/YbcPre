<template>
  <div class="container">
    <svg width="100%" height="100%"></svg>
  </div>
  <button @click="creatRingChart(2)">circul_2</button>
  <button @click="creatRingChart(3)">circul_3</button>
</template>

<script>
import * as d3 from 'd3'
import circleJson2 from '../data/circul/circul_2.json'
import circleJson3 from '../data/circul/circul_3.json'

export default {
  name: 'view3_3',
  data () {
    return {
      chartValue: {
        k: 5
      },
      chartConfig: {
        ringColor: ['#2ca25f', '#fdae6b', '#3182bd', '#756bb1', '#636363', '#f03b20'],
        circleColor: '#99ccff',
        outerRadius: [80, 100, 120, 140, 160, 180],
        innerRadius: [70, 90, 110, 130, 150, 170],
        circleRadius: 60,
        arcRadius: 45
      }
    }
  },
  methods: {
    creatRingChart (idx) {
      const that = this
      let fileName
      switch (idx) {
        case 2: {
          fileName = circleJson2
          break
        }
        case 3: {
          fileName = circleJson3
          break
        }
      }
      const ringData = that.getCircleData(fileName)
      const main = d3.select('.container svg')
        .append('g')
        .classed('main', true)
        .attr('transform', 'translate(' + 200 + ',' + 200 + ')')
      const circle = main.append('circle')
      circle.attr('cx', 0)
        .attr('cy', 0)
        .attr('r', that.chartConfig.circleRadius)
        .attr('fill', that.chartConfig.circleColor)
      // 设置扇形原点位置,本质是将画笔g移到该有的位置
      const innerArcRight = main.append('g').attr('transform', 'translate(' + 5 + ',' + 0 + ')')
      const arcsRight = d3.arc()
        .outerRadius(that.chartConfig.arcRadius)
        .innerRadius(0)
        .startAngle(0)
        .endAngle(Math.PI * ringData[0].rightCircle)
      const arcRight = innerArcRight.append('path')
        .attr('d', arcsRight)
      arcRight.attr('fill', 'blue')
      const innerArcLeft = main.append('g').attr('transform', 'translate(' + -5 + ',' + 0 + ')')
      const arcsLeft = d3.arc()
        .outerRadius(that.chartConfig.arcRadius)
        .innerRadius(0)
        .startAngle(Math.PI)
        .endAngle(Math.PI * (ringData[0].leftCircle + 1))
      const arcLeft = innerArcLeft.append('path')
        .attr('d', arcsLeft)
      arcLeft.attr('fill', 'blue')
      for (let i = 0; i < ringData[0].proportionLength; i++) {
        const arcs1 = d3.arc()
          .outerRadius(that.chartConfig.outerRadius[i])
          .innerRadius(that.chartConfig.innerRadius[i])
          .startAngle(0)
          .endAngle(Math.PI * ringData[0].proportions[i])
        const arc = main.append('path')
          .attr('d', arcs1)
        arc.attr('fill', that.chartConfig.ringColor[i])
      }
      console.log(ringData)
    },
    getCircleData (file) {
      const key = Object.keys(file)
      const keys = Object.keys(file[key[0]])
      const ringData = []
      for (let i = 0; i < this.chartValue.k; i++) {
        const proportion = []
        let temp = 0
        for (let j = 2; file[key[0]][keys[i]][j] !== undefined; j++) {
          proportion.push(file[key[0]][keys[i]][j])
          temp = j - 1
        }
        ringData.push({
          proportionLength: temp,
          leftCircle: file[key[0]][keys[i]][0],
          rightCircle: file[key[0]][keys[i]][1],
          proportions: proportion
        })
      }
      return ringData
    }
  }
}
</script>

<style scoped>

.container {
  width: 1000px;
  height: 1000px;
  border: 2px solid black;
}

</style>
