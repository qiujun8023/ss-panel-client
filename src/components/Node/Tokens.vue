<template>
  <div class="comp-node-tokens">
    <div class="weui-panel__hd">
      节点Token
      <i class="fa fa-plus-circle" @click="$emit('create')"></i>
    </div>
    <div class="weui-panel__bd">
      <div class="weui-media-box weui-media-box_small-appmsg">
        <div class="weui-loadmore" v-if="loading">
          <i class="weui-loading"></i>
          <span class="weui-loadmore__tips">正在加载</span>
        </div>
        <div class="weui-loadmore weui-loadmore_line" v-else-if="!tokens || !tokens.length">
          <span class="weui-loadmore__tips">暂无Token</span>
        </div>
        <div class="weui-cells" v-else>
          <router-link
            class="weui-cell weui-cell_access"
            v-for="token in tokens"
            :to="getDetailLink(token.nodeTokenId)"
            :key="token.tokenId">
            <div class="weui-cell__bd">
              {{token.title}}
            </div>
            <div class="weui-cell__ft">
              {{token.activedAt ? fromNow(token.activedAt) : '从未使用'}}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNow } from '@/libs/utils'

export default {
  props: ['loading', 'tokens'],

  methods: {
    fromNow,

    getDetailLink (tokenId) {
      let { nodeId } = this.$route.params
      return {
        name: 'node-token-detail',
        params: {
          nodeId,
          tokenId
        }
      }
    }
  }
}
</script>

<style lang="less">
.comp-node-tokens {
  .fa.fa-plus-circle {
    float: right;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
  }
  .weui-cell {
    color: #586C94;
    font-size: 14px;
  }
}
</style>

