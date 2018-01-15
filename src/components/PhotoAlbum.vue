<template>
  <div class="photoAlbum">
    <photo-detail-view v-if="album.selectedImage !== null"
                       :photo="album.selectedImage"></photo-detail-view>
    <toolbar :album="album" :loading="loading" v-on:click-menu="showMenu = true"></toolbar>
    <md-drawer :md-active.sync="showMenu">
      <menu-settings></menu-settings>
    </md-drawer>

    <thumbnail-gallery :album="album"></thumbnail-gallery>

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
    dependencies: ['jsonLoader', 'urlHelper', 'navigator', 'keyHandler'],
    components: {
      ThumbnailGallery,
      PhotoDetailView,
      MenuSettings,
      Toolbar
    },
    data () {
      return {
        album: {
          images: [],
          imageItems: [],
          currentPage: (Number(this.$route.params.page)),
          selectedImage: null
        },
        loading: false,
        showMenu: false,
        showSnackbar: false,
        error: null
      }
    },

    mounted: function () {
      window.addEventListener('keydown', this.onKeyDown)
      this.retrieveImages({tag: this.navigator.tagsToArray(this.$route.query.q)})
    },

    beforeDestroy: function () {
      window.removeEventListener('keydown', this.onKeyDown)
    },

    methods: {
      onKeyDown: function (event) {
        if (this.album.selectedImage === null) {
          this.keyHandler.handlKeyEventGallery(event, this.album)
        } else {
          this.keyHandler.handlKeyEventPhoto(event, this.album)
        }
      },

      onHashChangedPage: function (page) {
        this.setCurrentPage(page)
      },

      onHashChangedPhoto: function (photoId) {
        let foundPhoto = photoId === -1 ? null : this.album.images.find(photo => {
          return photo.id === photoId
        })
        this.setSelectedImage(foundPhoto === undefined ? null : foundPhoto)
      },

      setCurrentPage: function (page) {
        this.album.currentPage = page
      },

      setSelectedImage: function (image) {
        this.album.selectedImage = image
      },

      setAlbum: function (album) {
        this.album = album
      },

      retrieveImages: function (data) {
        if (this.promise && !this.promise.isDone()) {
          this.promise.cancel()
        }

        this.loading = true
        this.promise =
          this.jsonLoader.load(this.urlHelper.getListing(), {params: data}).then(response => {
            this.loading = false
            this.setAlbum({
              images: response.body,
              imageItems: [],
              currentPage: this.album.currentPage,
              selectedImage: null
            })
          }, err => {
            this.loading = false
            this.error = err
            this.showSnackbar = true
            console.error(err)
          })
      }
    },
    watch: {
      '$route.params.page': function (value) {
        this.onHashChangedPage(Number(value))
      },
      '$route.params.photoid': function (value) {
        this.onHashChangedPhoto(Number(value))
      },
      '$route.query': function (query, old) {
        if (JSON.stringify(query) !== JSON.stringify(old)) {
          this.retrieveImages({tag: this.navigator.tagsToArray(query.q)})
        }
      }
    }
  }
</script>

<style scoped>
</style>
