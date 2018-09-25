<template>
  <div class="comp-traffic-chart-sum">
    <div class="traffic">
      <ve-gauge
        height="100%"
        :data="chartData"
        :settings="chartSetting">
      </ve-gauge>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: ['user'],

  data () {
    return {
      chartSetting: {
        seriesMap: {
          used: {
            radius: '85%',
            splitNumber: 5,
            axisLine: {
              lineStyle: {
                color: [[0.3, '#fc6c84'], [0.7, '#56b0f1'], [1, '#00d5ae']],
                width: 25
              }
            },
            detail: {
              formatter: (value) => value + '% 剩余',
              padding: [80, 0, 0, 0],
              fontSize: 18,
              lineHeight: 36
            }
          }
        }
      }
    }
  },

  computed: {
    trafficPercent () {
      if (_.isEmpty(this.user)) {
        return 0
      }
      let limit = this.user.trafficLimit || 0
      let used = (this.user.flowUp + this.user.flowDown) || 0
      return _.floor((limit - used) / limit * 100)
    },

    chartData () {
      return {
        columns: ['type', 'value'],
        rows: [
          { type: 'used', value: this.trafficPercent }
        ]
      }
    }
  }
}

</script>

<style lang="less">
.comp-traffic-chart-sum {
  .traffic {
    width: 100%;
    height: 200px;
    background-color: rgba(209, 140, 71, 0.31);
    text-align: center;
    position: relative;
  }
}
</style>
