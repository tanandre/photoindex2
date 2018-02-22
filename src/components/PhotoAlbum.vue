<template>
  <div class="photoAlbum">
    <photo-detail-view v-if="photo !== null" :photo="photo"></photo-detail-view>
    <EditTagsDialog></EditTagsDialog>
    <PhotoUpdateDialog></PhotoUpdateDialog>
    <toolbar v-on:click-menu="showMenu = true"></toolbar>
    <md-drawer :md-active.sync="showMenu">
      <MenuSettings v-on:close="showMenu = false"></MenuSettings>
    </md-drawer>
    <div class="container">
      <md-progress-bar v-if="loading" class="loadingBar" md-mode="indeterminate"></md-progress-bar>
      <thumbnail-gallery class="gallery"></thumbnail-gallery>
    </div>
    <ErrorToaster></ErrorToaster>
  </div>
</template>

<script>
  import ThumbnailGallery from './ThumbnailGallery.vue'
  import PhotoDetailView from './PhotoDetailView.vue'
  import MenuSettings from './MenuSettings.vue'
  import Toolbar from './Toolbar.vue'
  import ErrorToaster from './ErrorToaster.vue'
  import PhotoUpdateDialog from './PhotoUpdateDialog.vue'
  import EditTagsDialog from './EditTagsDialog.vue'

  export default {
    dependencies: ['keyHandler', 'dataRetriever'],
    components: {
      ThumbnailGallery,
      PhotoDetailView,
      MenuSettings,
      Toolbar,
      ErrorToaster,
      PhotoUpdateDialog,
      EditTagsDialog
    },
    computed: {
      photo () {
        return this.$store.state.photo
      },
      loading () {
        return this.$store.state.loading
      }
    },
    data () {
      return {
        showMenu: false
      }
    },
    mounted () {
      window.addEventListener('keydown', this.onKeyDown)
      this.$store.dispatch('query', this.$route.query.q).then(() => {
        this.$store.dispatch('filter', this.$route.query.d)
        this.$store.commit('page', Number(this.$route.params.page))
        this.$store.dispatch('photo', Number(this.$route.params.photoid))
      })
    },

    beforeDestroy () {
      window.removeEventListener('keydown', this.onKeyDown)
    },

    methods: {
      onKeyDown (event) {
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
  .container {
    position: relative;
  }

  .loadingBar {
    opacity: 0.5;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
  }

</style>
