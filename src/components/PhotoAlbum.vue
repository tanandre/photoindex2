<template>
  <v-app dark>
    <toolbar v-on:click-menu="showMenu = !showMenu"></toolbar>
    <photo-detail-view v-if="photo !== null" :photo="photo"></photo-detail-view>
    <v-navigation-drawer clipped fixed v-model="showMenu" app>
      <MenuSettings v-on:close="showMenu = false"></MenuSettings>
    </v-navigation-drawer>

    <!-- <MdDrawer md-fixed :md-active.sync="showMenu">
      <MenuSettings v-on:close="showMenu = false"></MenuSettings>
    </MdDrawer> -->
    <v-content class="container">
      <v-progress-linear v-if="loading" class="loadingBar" :indeterminate="true"></v-progress-linear>
      <thumbnail-gallery class="gallery"></thumbnail-gallery>
    </v-content>
  </v-app>
</template>

<script>
  import ThumbnailGallery from './ThumbnailGallery.vue'
  import PhotoDetailView from './PhotoDetailView.vue'
  import MenuSettings from './MenuSettings.vue'
  import Toolbar from './Toolbar.vue'
  import RetrieveListingAction from '../js/action/RetrieveListingAction'

  export default {
    dependencies: ['keyHandler', 'dataRetriever'],
    components: {
      ThumbnailGallery,
      PhotoDetailView,
      MenuSettings,
      Toolbar,
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
