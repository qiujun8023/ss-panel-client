<template>
  <div class="nodes weui-panel weui-panel_access">
    <div class="weui-panel__hd weui-panel_link">
      <router-link
        class="weui-cell weui-cell_access weui-cell_link"
        :to="{name: 'node-add'}">
        <div class="weui-cell__bd">添加节点</div>
        <span class="weui-cell__ft"></span>
      </router-link>
    </div>
    <div class="weui-panel__bd">
      <div class="weui-loadmore" v-if="isLoading">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">加载中...</span>
      </div>
      <div class="weui-loadmore weui-loadmore_line" v-else-if="!items || !items.length">
        <span class="weui-loadmore__tips">暂无服务</span>
      </div>
      <router-link
        class="weui-media-box weui-media-box_appmsg"
        :to="{name: 'node-detail', params: {nodeId: item.nodeId}}"
        :key="item.nodeId"
        v-for="item in items">
        <div class="weui-media-box__hd">
          <span class="flag-icon" :class="['flag-icon-' + item.location]"></span>
        </div>
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title">
            <span>{{item.name}}</span>
            <span class="hidden" v-if="!item.isVisible">
              <i class="fa fa-eye-slash"></i>
            </span>
          </h4>
          <p class="weui-media-box__desc">{{item.description}}</p>
          <ul class="weui-media-box__info">
            <li class="weui-media-box__info__meta">
              {{item.server}}
            </li>
            <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">
              {{item.method}}
            </li>
          </ul>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Api from '@/api'

export default {
  data () {
    return {
      isLoading: false,
      items: []
    }
  },

  created () {
    this.fetch()
  },

  methods: {
    fetch () {
      this.isLoading = true
      Api('/api/nodes').then(({ data }) => {
        this.isLoading = false
        this.items = data
      }).catch(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="less">
.nodes {
  .weui-media-box__info {
    margin-top: 10px;
  }
  .flag-icon {
    width: 55px;
    line-height: 60px;
  }

  .weui-media-box__title  {
    .hidden {
      float: right;
      color: #FB7886;
    }
  }

  .weui-panel__hd.weui-panel_link {
    padding: 0;
  }
}
</style>
