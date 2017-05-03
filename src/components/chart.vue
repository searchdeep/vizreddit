<template>
  <div :id="config.chart_id"></div>
</template>

<script>
import c3 from 'c3'
export default {
  name: 'chart',

  props: ['config'],

  cchart: {},

  methods: {
    render (cdata) {
      if (!cdata) return
      this.cchart.load(cdata)
      this.cchart.legend.show()
    }
  },

  mounted () {
    var genData = {
      bindto: '#' + this.config.chart_id,
      data: this.config.data,
      size: {height: 225}
    }
    if (this.config.options) {
      genData = Object.assign(genData, this.config.options)
    }
    this.cchart = c3.generate(genData)
  },

  watch: {
    'config.data.columns': function () {
      this.render(this.config.data)
    }
  }
}
</script>

<style>

.c3-text {
  fill: rgb(0,0,0) !important;
}

.c3-bar {
  stroke-opacity: 1 !important;
  fill-opacity: 0.5 !important;
  stroke-width: 2 !important;
}

.c3-bar._expanded_ {
  fill-opacity: 0.75 !important;
}

.c3-axis .tick line {
  stroke: #aaa;
}

.c3-xgrid, .c3-ygrid {
  stroke-opacity: 0.3;
  stroke-dasharray: 0 0 !important;
}

.c3-zoom-rect {
  stroke-width: 0 !important;
  stroke: #aaa;
  opacity: 1 !important;
  fill-opacity: 0 !important;
  stroke-opacity: 1 !important;
}


.c3 text {
  font-size: 11px;
  font-family: 'Open Sans';
}

.c3-tooltip-container,.common-tooltip {
    background: rgba(255,255,255,.97);
    box-shadow: 0 0 0 1px #dfdfdf,0 .15rem .5rem rgba(0,0,0,.1);
    border-radius: 2px;
    border: none;
    padding: 1rem;
    z-index: 2
}

.c3-tooltip-container table.c3-tooltip,.common-tooltip table.c3-tooltip {
    background: 0 0;
    table-layout: auto;
    empty-cells: show;
    box-shadow: none;
    opacity: 1
}

.c3-tooltip-container table.c3-tooltip tr,.common-tooltip table.c3-tooltip tr {
    border: none;
    padding: 0
}

.c3-tooltip-container table.c3-tooltip th,.common-tooltip table.c3-tooltip th {
    color: #333;
    -webkit-font-feature-settings: 'tnum';
    -moz-font-feature-settings: 'tnum';
    font-feature-settings: 'tnum';
    font-size: 1.5rem;
    padding: 0 0 .5rem;
    background-color: transparent
}

.c3-tooltip-container table.c3-tooltip h4,.common-tooltip table.c3-tooltip h4 {
    border-top: 1px solid #f1f1f1;
    left: -1rem;
    margin-bottom: -.3rem;
    margin-top: .4rem;
    padding-top: .5rem;
    position: relative;
    text-indent: 1rem;
    width: calc(100% + 2rem)
}

.c3-tooltip-container table.c3-tooltip td,.common-tooltip table.c3-tooltip td {
    color: #333;
    font-size: 1.4rem;
    line-height: 1.2rem;
    padding: 0;
    white-space: nowrap;
    border: none;
    background-color: transparent
}

.c3-tooltip-container table.c3-tooltip td>span,.common-tooltip table.c3-tooltip td>span {
    display: inline-block;
    height: 0.9rem;
    margin-right: 1rem;
    position: relative;
    top: -1px;
    width: 0.9rem
}

.c3-tooltip-container table.c3-tooltip td.value,.common-tooltip table.c3-tooltip td.value {
    -webkit-font-feature-settings: 'tnum';
    -moz-font-feature-settings: 'tnum';
    font-feature-settings: 'tnum';
    font-size: 1.2 rem;
    padding-left: 2rem;
    text-align: right;
    top: .05rem
}

.c3-tooltip-container table.c3-tooltip td.empty,.common-tooltip table.c3-tooltip td.empty {
    color: #999
}

.c3chart .table {
    table-layout: fixed;
    line-height: normal;
    border-radius: 3px;
    border-style: hidden;
    border-collapse: collapse;
    box-shadow: 0 0 0 2px #f1f1f1;
}

.c3-chart-arc {
  opacity: 0.8!important;
}
</style>
