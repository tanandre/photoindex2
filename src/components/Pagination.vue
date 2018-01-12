<template>
  <div class="pagination">
    <md-button @click.native="onClick(idx)"
               class="paginationButton md-icon-button md-raised pageButton"
               v-if="shouldDisplay(idx)" v-for="idx in pageCount" :key="idx"
               :class="getCssClass(idx)">{{idx}}
    </md-button>
  </div>
</template>

<script>
  export default {
    props: ['value', 'pageCount'],
    data: function () {
      return {
        range: 1
      }
    },
    methods: {
      shouldDisplay: function (idx) {
        if (idx === this.pageCount) {
          return true
        }
        if (idx === 1) {
          return true
        }
        if (Math.abs((idx - 1) - this.value) <= this.range) {
          return true
        }
        return false
      },

      onClick: function (idx) {
        this.$emit('input', Number(idx) - 1)
      },

      getCssClass: function (idx) {
        if ((idx - 1) === this.value) {
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
