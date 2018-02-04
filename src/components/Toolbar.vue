<template>
  <md-toolbar class="md-dense">
    <md-button class="md-icon-button" @click="onClickMenu">
      <md-icon>menu</md-icon>
    </md-button>
    <h2 class="md-title">{{ title }}</h2>
    <small>{{album.images.length}}</small>
    <search-input class="searchInput"></search-input>
    <md-progress-spinner v-if="loading" :md-diameter="30" :md-stroke="3" class="md-accent"
                         md-mode="indeterminate"></md-progress-spinner>
    <pagination></pagination>
  </md-toolbar>
</template>

<script>
  import SearchInput from './SearchInput.vue'
  import Pagination from './Pagination.vue'

  export default {
    props: ['loading'],
    components: {
      SearchInput,
      Pagination
    },
    data () {
      return {
        title: 'PhotoIndex'
      }
    },
    computed: {
      album: function () {
        return this.$store.state.album
      }
    },

    methods: {
      onClickMenu: function () {
        this.$emit('click-menu')
      }
    }
  }
</script>

<style scoped>
  .searchInput {
    margin-left: 10px;
  }

</style>
