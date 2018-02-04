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
    data () {
      return {
        range: 1
      }
    },
    computed: {
      page () {
        return this.$store.state.page
      },
      pageCount () {
        return this.$store.state.gallery.pageCount
      }
    },
    methods: {
      onClick (idx) {
        this.navigator.setPage(idx)
      },

      shouldDisplay (idx) {
        if (this.pageCount < 20) {
          return true
        }
        if (idx === this.pageCount) {
          return true
        }
        if (idx === 1) {
          return true
        }
        if (Math.abs(idx - this.$store.state.page) <= this.range) {
          return true
        }
        return false
      },

      getCssClass (idx) {
        if (idx === this.$store.state.page) {
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
