<template>
  <div class="comp-traffic-chart-stat">
    <div class="traffic">
      <ve-histogram
        height="100%"
        :grid="grid"
        :tooltip="tooltip"
        :xAxis="xAxis"
        :yAxis="yAxis"
        :series="series"></ve-histogram>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

const TRAFFIC_MULTIPLE = 1073741824

export default {
  props: ['data', 'loading'],

  computed: {
    date () {
      if (this.loading) {
        return []
      }
      return this.data.map(item => item.date)
    },

    flow () {
      if (this.loading) {
        return []
      }
      return this.data.map(item => _.round((item.flowUp + item.flowDown) / TRAFFIC_MULTIPLE, 2))
    },

    shadow () {
      if (this.loading) {
        return []
      }
      return _.fill(Array(this.data.length), _.ceil(_.max(this.flow)) || 1)
    },

    grid () {
      return {
        top: '20%',
        left: '8%',
        right: '8%',
        bottom: '8%'
      }
    },

    tooltip () {
      return {
        show: false
      }
    },

    xAxis () {
      return [{
        type: 'category',
        data: this.date,
        axisLabel: {
          textStyle: {
            color: '#fff'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#eee'
          }
        }
      }]
    },

    yAxis () {
      return {
        axisLabel: {
          textStyle: {
            color: '#fff'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#eee'
          }
        },
        splitLine: {
          show: false
        }
      }
    },

    series () {
      return [{
        // For shadow
        type: 'bar',
        itemStyle: {
          normal: { color: 'rgba(0,0,0,0.05)' }
        },
        barGap: '-100%',
        barCategoryGap: '40%',
        data: this.shadow,
        animation: false
      }, {
        type: 'bar',
        itemStyle: {
          normal: {
            color: 'rgba(54, 162, 235, 0.8)'
          },
          emphasis: {
            color: 'rgba(54, 162, 235, 1)'
          }
        },
        data: this.flow
      }]
    }
  }
}

</script>

<style lang="less">
.comp-traffic-chart-stat {
  .traffic {
    width: 100%;
    height: 200px;
    background-color: rgba(209, 140, 71, 0.31);
    text-align: center;
    position: relative;
  }
}
</style>
