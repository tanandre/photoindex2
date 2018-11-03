<template>
  <v-app dark>
    <photo-detail-view v-if="photo !== null" :photo="photo"></photo-detail-view>
    <v-navigation-drawer clipped fixed v-model="showMenu" app>
      <MenuSettings v-on:close="showMenu = false"></MenuSettings>
    </v-navigation-drawer>
    <toolbar app v-on:click-menu="showMenu = !showMenu"></toolbar>
    <v-content app>
      <v-progress-linear v-if="loading" class="loadingBar" :indeterminate="true"></v-progress-linear>
      <thumbnail-gallery class="gallery"></thumbnail-gallery>
    </v-content>
    <EditRatingDialog></EditRatingDialog>
    <EditTagsDialog></EditTagsDialog>
    <EditTagGroupsDialog></EditTagGroupsDialog>
    <EditDatesDialog></EditDatesDialog>
    <ErrorToaster></ErrorToaster>
  </v-app>
</template>

<script>
  import ThumbnailGallery from './ThumbnailGallery.vue'
  import PhotoDetailView from './PhotoDetailView.vue'
  import MenuSettings from './MenuSettings.vue'
  import Toolbar from './Toolbar.vue'
  import RetrieveListingAction from '@/js/action/RetrieveListingAction'
  import EditRatingDialog from '@/components/EditRatingDialog.vue'
  import EditDatesDialog from '@/components/EditDatesDialog.vue'
  import EditTagsDialog from '@/components/EditTagsDialog.vue'
  import EditTagGroupsDialog from '@/components/EditTagGroupsDialog.vue'
  import ErrorToaster from '@/components/ErrorToaster.vue'

  export default {
    dependencies: ['keyHandler'],
    components: {
      ThumbnailGallery,
      PhotoDetailView,
      MenuSettings,
      Toolbar,
      ErrorToaster,
      EditRatingDialog,
      EditDatesDialog,
      EditTagGroupsDialog,
      EditTagsDialog
    },
    computed: {
      photo() {
        return this.$store.state.photo
      },
      loading() {
        return this.$store.state.loading
      }
    },
    data() {
      return {
        showMenu: false
      }
    },
    mounted() {
      window.addEventListener('keydown', this.onKeyDown)
      new RetrieveListingAction(this.$store).execute(this.$route).then(() => {
        this.$store.commit('page', Number(this.$route.params.page))
        this.$store.dispatch('photo', Number(this.$route.params.photoid))
      })
    },

    beforeDestroy() {
      window.removeEventListener('keydown', this.onKeyDown)
    },

    methods: {
      onKeyDown(event) {
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
  .loadingBar {
    margin: 0;
    z-index: 3;
    left: 0;
    width: 100%;
    position: fixed;
  }
</style>
