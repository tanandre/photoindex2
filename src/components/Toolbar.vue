<template>
  <md-toolbar class="md-dense">
    <md-button class="md-icon-button" @click="onClickMenu">
      <md-icon>menu</md-icon>
    </md-button>
    <h2 class="md-title">{{ title }}</h2>
    <small>{{album.images.length}}</small>
    <search-input class="searchInput"></search-input>
    <pagination></pagination>
  </md-toolbar>
</template>

<script>
  import SearchInput from './SearchInput.vue'
  import Pagination from './Pagination.vue'

  export default {
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
      album () {
        return this.$store.state.album
      }
    },

    methods: {
      onClickMenu () {
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
