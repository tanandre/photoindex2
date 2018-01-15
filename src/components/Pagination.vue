<template>
  <div class="pagination">
    <md-button :class="getCssClass(idx)" v-if="shouldDisplay(idx)" v-for="idx in pageCount"
               :key="idx" @click="onClick(idx)"
               class="paginationButton md-icon-button md-raised pageButton">{{idx}}
    </md-button>
  </div>
</template>

<script>
  export default {
    dependencies: ['navigator'],
    props: ['currentPage', 'pageCount'],
    data: function () {
      return {
        range: 1
      }
    },
    methods: {
      onClick: function (idx) {
        this.navigator.setPage(idx)
      },

      shouldDisplay: function (idx) {
        if (this.pageCount < 20) {
          return true
        }
        if (idx === this.pageCount) {
          return true
        }
        if (idx === 1) {
          return true
        }
        if (Math.abs(idx - this.currentPage) <= this.range) {
          return true
        }
        return false
      },

      getCssClass: function (idx) {
        if (idx === this.currentPage) {
          return 'md-primary'
        }
        return ''
      }
    }
  }
</script>

<style scoped>
  .paginationButton:first-child {
    margin-right: 10px;
  }

  .paginationButton:last-child {
    margin-left: 10px;
  }
</style>
