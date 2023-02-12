<template>
  <div class="container">
    <svg width="100%" height="100%"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import axis from '../data/scatter/axis.json'

export default {
  name: 'view3_2',
  data () {
    return {
      chartValue: {
      },
      chartConfig: {

      }
    }
  },
  methods: {
    creatScatterChart () {
      const main = d3.select('.container svg')
        .append('g')
        .classed('main', true)
    },
    calAxis () {

    },
    mounted () {
      this.creatScatterChart()
    }

  }
}
</script>

<style scoped>

.container {
  width: 1300px;
  height: 750px;
  border: 2px solid black;
}

</style>
