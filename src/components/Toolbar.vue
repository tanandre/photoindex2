<template>
  <md-toolbar class="md-dense">
    <PhotoUpdateDialog v-if="showUpdateDates" v-on:close="showUpdateDates = false"></PhotoUpdateDialog>
    <div class="md-toolbar-section-start">
      <md-button class="md-icon-button" @click="onClickMenu">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title">{{ title }}</h2>
      <small>{{album.images.length}}</small>
      <search-input class="searchInput"></search-input>
      <pagination></pagination>
    </div>
    <div class="md-toolbar-section-end" v-if="selectedPhotos.length > 0">
      <md-button class="md-icon-button" @click="selectedPhotos = []">
        <md-icon>clear</md-icon>
      </md-button>
      <h2 class="md-title">{{selectedPhotos.length}} selected</h2>


      <md-menu md-size="medium" md-align-trigger>
        <md-button class="md-icon-button" md-menu-trigger>
          <md-icon>more_vert</md-icon>
        </md-button>

        <md-menu-content class="editMenu">
          <md-menu-item @click="showUpdateDates = true">
            <md-icon>event</md-icon>
            <span>Edit Dates</span>
          </md-menu-item>
          <md-menu-item>
            <md-icon>label</md-icon>
            <span>Edit Tags</span>
          </md-menu-item>
          <md-menu-item>
            <md-icon>delete</md-icon>
            <span>Delete</span>
          </md-menu-item>
        </md-menu-content>
      </md-menu>


    </div>
  </md-toolbar>
</template>

<script>
  import SearchInput from './SearchInput.vue'
  import Pagination from './Pagination.vue'
  import PhotoUpdateDialog from './PhotoUpdateDialog.vue'

  export default {
    components: {
      SearchInput,
      Pagination,
      PhotoUpdateDialog
    },
    data () {
      return {
        title: 'PhotoIndex',
        showUpdateDates: false
      }
    },
    computed: {
      album () {
        return this.$store.state.album
      },
      selectedPhotos: {
        get () {
          return this.$store.state.selectedPhotos
        },
        set (value) {
          this.$store.commit('selectedPhotos', value)
        }
      }
    },

    methods: {
      onClickEditDates () {
        this.showUpdateDates = true
        console.log('this.showUpdateDates', this.showUpdateDates)
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

</style>
