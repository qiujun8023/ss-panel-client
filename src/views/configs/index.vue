<template>
  <div class="configs">
    <div class="weui-loadmore" v-show="isLoading">
      <i class="weui-loading"></i>
      <span class="weui-loadmore__tips">正在加载</span>
    </div>
    <div v-show="!isLoading">
      <div class="weui-cells__title">系统配置</div>
      <div class="weui-cells weui-cells_form weui-panel__bd">
        <div class="weui-cell" v-for="(config, index) in configs" :key="config.configId">
          <div class="weui-cell__hd">
            {{config.description}}
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="tel" v-model="config.newValue">
            <div
              class="weui-btn weui-btn_mini weui-btn_primary"
              v-show="config.newValue !== config.value"
              @click="update(index)">
              <i class="weui-loading" v-if="config.isLoading"></i>
              <span v-else>保存</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api'

export default {
  data () {
    return {
      isLoading: false,
      configs: []
    }
  },

  created () {
    this.fetch()
  },

  methods: {
    fetch () {
      this.isLoading = true
      Api('/api/configs').then(({ data }) => {
        this.isLoading = false
        for (let config of data) {
          config.newValue = config.value
        }
        this.configs = data
      }).catch(() => {
        this.isLoading = false
      })
    },

    change (index, key, value) {
      this.configs[index][key] = value
      this.$set(this.configs, index, this.configs[index])
    },

    update (index) {
      this.change(index, 'isLoading', true)
      Api(`/api/configs/${this.configs[index].configId}`, {
        method: 'PUT',
        body: {
          value: this.configs[index].newValue
        }
      }).then(({ data }) => {
        this.change(index, 'isLoading', false)
        this.change(index, 'value', this.configs[index].newValue)
      })
    }
  }
}
</script>

<style lang="less">
.configs {
  .weui-cell {
    display: block;
    .weui-cell__hd {
      margin-bottom: 10px;
      color: #999999;
      font-size: 14px;
    }
    .weui-cell__bd {
      .weui-btn {
        position: absolute;
        right: 0px;
        bottom: 22px;
        right: 10px;
      }
    }
  }
}
</style>
