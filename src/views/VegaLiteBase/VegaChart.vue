<template>
    <div id="vegaLiteBar"></div>
</template>
  
<script>
import * as vega from "vega"
import * as vegalite from "vega-lite"
import vegaEmbed from "vega-embed"

export default {
  name: 'App',
  data() {
    return {
      chartSpec: {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A simple bar chart with embedded data.",
        "data": {
          "values": [
            {"a": "A", "b": 28},
            {"a": "B", "b": 55},
            {"a": "C", "b": 43},
            {"a": "D", "b": 91},
            {"a": "E", "b": 81},
            {"a": "F", "b": 53},
            {"a": "G", "b": 19},
            {"a": "H", "b": 87},
            {"a": "I", "b": 52}
          ]
        },
        "mark": "bar",
        "encoding": {
          "x": {"field": "a", "type": "ordinal"},
          "y": {"field": "b", "type": "quantitative"}
        }
      },
    };
  },
  methods: {
    chart() {
      vegaEmbed('#vegaLiteBar', this.chartSpec)
    }
  },
  mounted() {
    this.chart()
  }
};
</script>
  