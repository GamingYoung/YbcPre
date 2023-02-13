<template>
  <div class="container">
    <svg width="100%" height="100%"></svg>
  </div>
  <button @click="creatRingChart(2)">circul_2</button>
</template>

<script>
import * as d3 from 'd3'
import circleJson2 from '../data/circul/circul_2.json'
import circleJson3 from '../data/circul/circul_3.json'

export default {
  name: 'view3_3',
  data () {
    return {
      chartConfig: {
        ringColor: ['#2ca25f', '#fdae6b', '#3182bd', '#756bb1', '#636363', '#f03b20'],
        circleColor: '#99d8c9'
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
        .attr('transform', 'translate(' + 100 + ',' + 100 + ')')
      const arcs = d3.arc().innerRadius(0).outerRadius(100).startAngel
      const arc = main.append('g')
        .classed('arc', true)
      arc.append('path')
        .attr('d', arcs)
      console.log(ringData)
    },
    getCircleData (file) {
      const key = Object.keys(file)
      const keys = Object.keys(file[key[0]])
      const ringData = []
      for (let i = 0; i < 5; i++) { // 这个5将来得改
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
  width: 300px;
  height: 300px;
  border: 2px solid black;
}

</style>
