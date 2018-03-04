<template>
  <div class="pagination">
    <md-button :class="getCssClass(idx)" v-if="shouldDisplay(idx)" v-for="idx in pageCount"
               :key="idx" @click="onClick(idx)"
               class="paginationButton md-raised pageButton">{{idx}}
    </md-button>
  </div>
</template>

<script>
  export default {
    dependencies: ['navigator'],
    data () {
      return {
        range: 2
      }
    },
    computed: {
      page () {
        return this.$store.state.gallery.page
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
        if (this.pageCount < 6) {
          return true
        }
        if (idx === 1 || idx === this.pageCount) {
          return true
        }

        if (this.page === 1 || this.page === 2) {
          return idx < 6
        }

        if (Math.abs(idx - this.page) <= this.range) {
          return true
        }

        return false
      },

      getCssClass (idx) {
        if (idx === this.page) {
          return 'md-primary'
        }
        return ''
      }
    }
  }
</script>

<style scoped>
  .paginationButton {
    width: 40px;
    min-width: inherit;
    margin: 0;
  }
</style>
