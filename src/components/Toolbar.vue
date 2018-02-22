<template>
  <md-toolbar class="md-dense" :class="{ 'md-primary': selectedPhotos.length > 0 }">
    <md-button class="md-icon-button" @click="onClickMenu">
      <md-icon>menu</md-icon>
    </md-button>
    <h2 class="md-title">{{ title }}</h2>
    <search-input class="searchInput"></search-input>
    <span>{{album.images.length}} photos</span>
    <pagination></pagination>
    <div v-if="selectedPhotos.length > 0" class="md-toolbar-section-end">
      <ToolbarSelection class="toolbarEnd"></ToolbarSelection>
    </div>
    <!--<div>

      <md-button class="md-icon-button" @click="selectedPhotos = []">
        <md-icon>clear</md-icon>
      </md-button>
      <h2 class="md-title">{{selectedPhotos.length}} selected</h2>
      <md-menu md-size="medium" md-align-trigger>
        <md-button class="md-icon-button" md-menu-trigger>
          <md-icon>more_vert</md-icon>
        </md-button>

        <md-menu-content class="editMenu">
          <md-menu-item @click="onClickEditDates()">
            <md-icon>event</md-icon>
            <span>Edit Dates</span>
          </md-menu-item>
          <md-menu-item>
            <md-icon>label</md-icon>
            <span>Edit Tags</span>
          </md-menu-item>
          <md-menu-item>
            <md-icon>favorite</md-icon>
            <span>Favorite</span>
          </md-menu-item>
          <md-divider></md-divider>
          <md-menu-item>
            <md-icon>delete</md-icon>
            <span>Delete</span>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    -->

    <!--</div>-->
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
  .searchInput {
    margin-left: 10px;
  }

  .toolbarEnd {
    float: right;
  }

</style>
