<template>
  <div class="photoAlbum">
    <photo-detail-view v-if="photo !== null" :photo="photo"></photo-detail-view>

    <toolbar :loading="loading" v-on:click-menu="showMenu = true"></toolbar>
    <md-drawer :md-active.sync="showMenu">
      <menu-settings></menu-settings>
    </md-drawer>

    <thumbnail-gallery></thumbnail-gallery>

    <md-snackbar md-position="center" :md-duration="Infinity" :md-active.sync="showSnackbar"
                 md-persistent>
      <span>{{error}}</span>
      <md-button class="md-primary" @click="showSnackbar = false">Close</md-button>
    </md-snackbar>
  </div>
</template>

<script>
  import ThumbnailGallery from './ThumbnailGallery.vue'
  import PhotoDetailView from './PhotoDetailView.vue'
  import MenuSettings from './MenuSettings.vue'
  import Toolbar from './Toolbar.vue'

  export default {
    dependencies: ['keyHandler', 'dataRetriever'],
    components: {
      ThumbnailGallery,
      PhotoDetailView,
      MenuSettings,
      Toolbar
    },
    computed: {
      photo: function () {
        return this.$store.state.photo
      }
    },
    data: function () {
      return {
        loading: false,
        showMenu: false,
        showSnackbar: false,
        error: null
      }
    },

    mounted: function () {
      window.addEventListener('keydown', this.onKeyDown)
      this.$store.dispatch('query', this.$route.query.q).then(() => {
        this.$store.commit('page', Number(this.$route.params.page))
        this.$store.dispatch('photo', Number(this.$route.params.photoid))
      })
    },

    beforeDestroy: function () {
      window.removeEventListener('keydown', this.onKeyDown)
    },

    methods: {
      onKeyDown: function (event) {
        if (this.$store.state.photo === null) {
          this.keyHandler.handlKeyEventGallery(event)
        } else {
          this.keyHandler.handlKeyEventPhoto(event)
        }
      }
    }
  }
</script>

<style scoped>
</style>
