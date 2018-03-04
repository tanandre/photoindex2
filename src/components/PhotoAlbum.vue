<template>
  <div class="photoAlbum">
    <photo-detail-view v-if="photo !== null" :photo="photo"></photo-detail-view>
    <EditTagsDialog></EditTagsDialog>
    <EditDatesDialog></EditDatesDialog>
    <EditRatingDialog></EditRatingDialog>
    <toolbar v-on:click-menu="showMenu = true"></toolbar>
    <MdDrawer md-fixed :md-active.sync="showMenu">
      <MenuSettings v-on:close="showMenu = false"></MenuSettings>
    </MdDrawer>
    <div class="container">
      <md-progress-bar v-if="loading" class="md-accent loadingBar" md-mode="indeterminate"></md-progress-bar>
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
  import EditDatesDialog from './EditDatesDialog.vue'
  import EditTagsDialog from './EditTagsDialog.vue'
  import EditRatingDialog from './EditRatingDialog.vue'
  import RetrieveListingAction from '../js/action/RetrieveListingAction'

  export default {
    dependencies: ['keyHandler', 'dataRetriever'],
    components: {
      ThumbnailGallery,
      PhotoDetailView,
      MenuSettings,
      Toolbar,
      ErrorToaster,
      EditDatesDialog,
      EditRatingDialog,
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
      new RetrieveListingAction(this.$store).execute(this.$route).then(() => {
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
    z-index: 3;
    left: 0;
    width: 100%;
    position: fixed;
  }

</style>
