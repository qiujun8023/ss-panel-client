<template>
  <div class="node-token-detail">
    <div class="weui-cells__title">Token详情</div>
    <div class="weui-loadmore" v-if="isLoading">
      <i class="weui-loading"></i>
      <span class="weui-loadmore__tips">加载中...</span>
    </div>
    <div class="weui-form-preview" v-else>
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">{{token.token}}</label>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">用途描述</label>
          <span class="weui-form-preview__value">{{token.title}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">活跃时间</label>
          <span class="weui-form-preview__value">
            {{token.activedAt ? fromNow(token.activedAt) : '从未使用'}}
          </span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">创建时间</label>
          <span class="weui-form-preview__value">{{fromNow(token.createdAt)}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">更新时间</label>
          <span class="weui-form-preview__value">{{fromNow(token.updatedAt)}}</span>
        </div>
      </div>
      <div class="weui-form-preview__ft">
        <div class="weui-form-preview__btn weui-form-preview__btn_warn" @click="remove()">删除</div>
        <div class="weui-form-preview__btn weui-form-preview__btn_primary" @click="refresh()">重置</div>

        <div
          class="weui-form-preview__btn weui-form-preview__btn_primary"
          v-clipboard="token.token"
          @success="copySuccess"
          @error="copyError">
          复制
        </div>
        <router-link
          class="weui-form-preview__btn weui-form-preview__btn_primary"
          :to="{name: 'node-detail'}">
          返回
        </router-link>
      </div>
    </div>

    <div class="toast" :class="{show: showCopySuccess}">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">已复制</p>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api'
import { fromNow } from '@/libs/utils'

export default {
  data () {
    return {
      token: null,
      isLoading: false,
      showCopySuccess: false
    }
  },

  computed: {
    nodeId () {
      return this.$route.params.nodeId
    },
    tokenId () {
      return this.$route.params.tokenId
    }
  },

  created () {
    this.fetch()
  },

  methods: {
    fromNow,

    fetch () {
      this.isLoading = true
      Api(`/api/nodes/${this.nodeId}/tokens/${this.tokenId}`).then(({ data }) => {
        this.isLoading = false
        this.token = data
      })
    },

    refresh () {
      if (!confirm('你确定要重置吗?')) {
        return false
      }

      this.isLoading = true
      Api(`/api/nodes/${this.nodeId}/tokens/${this.tokenId}/refresh`, {
        method: 'POST'
      }).then(({ data }) => {
        this.isLoading = false
        this.token = data
      })
    },

    remove () {
      if (!confirm('你确定要删除?')) {
        return false
      }

      this.isLoading = true
      Api(`/api/nodes/${this.nodeId}/tokens/${this.tokenId}`, {
        method: 'DELETE'
      }).then(({ data }) => {
        this.isLoading = false
        this.$router.push({name: 'node-detail'})
      })
    },

    copySuccess () {
      if (this.showCopySuccess) {
        return
      }
      this.showCopySuccess = true
      setTimeout(() => {
        this.showCopySuccess = false
      }, 1000)
    },

    copyError () {
      alert('复制失败')
    }
  }
}
</script>

<style lang="less">
.node-token-detail {
  .weui-form-preview__btn_warn {
    color: #E64340
  }

  .toast {
    display: none;
  }

  .toast.show {
    display: block;
  }
}

</style>
