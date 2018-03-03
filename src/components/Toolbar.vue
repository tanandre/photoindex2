<template>
  <md-toolbar class="md-dense toolbar" :class="{ 'md-primary': selectedPhotos.length > 0 }">
    <md-button class="md-icon-button" @click="onClickMenu">
      <md-icon>menu</md-icon>
    </md-button>
    <h2 class="md-title">{{ title }}</h2>
    <search-input class="searchInput"></search-input>
    <span>{{photoCountLabel}}</span>
    <span> photos</span>
    <pagination></pagination>
    <div v-if="selectedPhotos.length > 0" class="md-toolbar-section-end">
      <ToolbarSelection class="toolbarEnd"></ToolbarSelection>
    </div>
  </md-toolbar>
</template>

<script>
  import SearchInput from './SearchInput.vue'
  import Pagination from './Pagination.vue'
  import ToolbarSelection from './ToolbarSelection.vue'

  export default {
    components: {
      SearchInput,
      Pagination,
      ToolbarSelection
    },
    data () {
      return {
        title: 'PhotoIndex'
      }
    },
    computed: {
      photoCountLabel () {
        let count = this.album.images.length
        return (count > 1000) ? Math.round(count / 1000) + 'k' : count
      },
      album () {
        return this.$store.state.album
      },
      selectedPhotos: {
        get () {
          return this.$store.state.selection.selectedPhotos
        },
        set (value) {
          this.$store.commit('selectedPhotos', value)
        }
      }
    },

    methods: {
      onClickEditDates () {
        this.$store.commit('showEditDate', true)
      },
      onClickMenu () {
        this.$emit('click-menu')
      }
    }
  }
</script>

<style scoped>
  .toolbar {
    top: 0;
    position: fixed;
    z-index: 3;
  }

  .searchInput {
    margin-left: 10px;
  }

  .toolbarEnd {
    float: right;
  }

</style>
