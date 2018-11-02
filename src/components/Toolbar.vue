<template>
  <v-toolbar app fixed clipped-left dense class="toolbar" :class="{'primary': selectedPhotos.length > 0}">
    <v-toolbar-side-icon @click.stop="onClickMenu"></v-toolbar-side-icon>
    <v-toolbar-title>{{title}}</v-toolbar-title>
    <search-input class="searchInput"></search-input>
    <div :title="album.images.length + ' photos'">
      <span>{{photoCountLabel}}</span>
      <span> photos</span>
    </div>
    <pagination></pagination>
    <div v-if="selectedPhotos.length > 0">
      <ToolbarSelection class="toolbarEnd"></ToolbarSelection>
    </div>
  </v-toolbar>
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
    z-index: 3;
    position:sticky;
  }

  .searchInput {
    margin-left: 10px;
  }

  .toolbarEnd {
    float: right;
  }

</style>
