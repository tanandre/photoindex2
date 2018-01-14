<template>
  <div class="pagination">

    <router-link v-if="shouldDisplay(idx)" v-for="idx in pageCount" :key="idx"
                 :to="'/album/gallery/' + idx">
      <md-button :class="getCssClass(idx)"
                 class="paginationButton md-icon-button md-raised pageButton">{{idx}}
      </md-button>
    </router-link>
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
        if (this.pageCount < 20) {
          return true
        }
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
