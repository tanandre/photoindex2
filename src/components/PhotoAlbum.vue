<template>
  <div class="photoAlbum">
    <photo-detail-view v-if="selectedImage !== null"
                       :photo="selectedImage"></photo-detail-view>
    <md-toolbar class="md-dense">
      <md-button class="md-icon-button" @click="showMenu = true">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title">{{ title }}</h2>
      <small>{{album.images.length}}</small>
      <search-input v-model="tags" class="searchInput"></search-input>
      <md-progress-spinner v-if="loading" :md-diameter="30" :md-stroke="3" class="md-accent"
                           md-mode="indeterminate"></md-progress-spinner>
      <!--
      <pagination v-if="album.pageCount > 1" v-model="album.currentPage"
                  :page-count="album.pageCount"></pagination>
                  -->
    </md-toolbar>
    <md-drawer :md-active.sync="showMenu">
      <menu-settings></menu-settings>
    </md-drawer>

    <thumbnail-gallery v-bind:album="album"></thumbnail-gallery>
  </div>
</template>

<script>
  import ThumbnailGallery from './ThumbnailGallery.vue'
  import PhotoDetailView from './PhotoDetailView.vue'
  import MenuSettings from './MenuSettings.vue'
  import SearchInput from './SearchInput.vue'

  export default {
    dependencies: ['jsonLoader', 'urlHelper', 'navigator', 'keyHandler'],
    components: {
      ThumbnailGallery,
      SearchInput,
      PhotoDetailView,
      MenuSettings
    },
    data () {
      return {
        title: 'Photo Index',
        album: {
          images: [],
          imageItems: [],
          currentPage: 0
        },
        selectedImage: null,
        tags: [],
        loading: false,
        showMenu: false
      }
    },

    mounted: function () {
      window.addEventListener('keydown', this.onKeyDown)
      this.retrieveImages({})
    },

    beforeDestroy: function () {
      window.removeEventListener('keydown', this.onKeyDown)
    },

    methods: {
      onKeyDown: function (key) {
        if (this.selectedImage === null) {
          this.keyHandler.handlKeyEventGallery(event, this.album)
        } else {
          this.keyHandler.handlKeyEventPhoto(event, this.album, this.selectedImage)
        }
      },

      onHashChangedPage: function (page) {
        // TODO move pageCount back to album and verify not out of bouds
        if (page < 0) {
          return
        }
        this.album.currentPage = page
      },

      onHashChangedPhoto: function (photoId) {
        if (photoId === -1) {
          this.setSelectedImage(null)
          return
        }
        let foundPhoto = this.album.images.find(photo => {
          return photo.id === photoId
        })
        this.setSelectedImage(foundPhoto === undefined ? null : foundPhoto)
      },

      setSelectedImage: function (image) {
        this.selectedImage = image
      },

      retrieveImages: function (data) {
        // TODO cancel current one if still active
        this.loading = true
        this.jsonLoader.load(this.urlHelper.getListing(), {params: data}).then(response => {
          this.loading = false
          let images = response
          this.album = {
            images: images,
            imageItems: [],
            currentPage: (Number(this.$route.params.page) - 1)
          }
        }, err => {
          this.loading = false
          console.error(err)
        })
      }
    },
    watch: {
      tags: function (tags) {
        this.retrieveImages({tag: tags})
      },
      '$route.params.page': function (value) {
        this.onHashChangedPage(Number(value) - 1)
      },
      '$route.params.photoid': function (value) {
        this.onHashChangedPhoto(Number(value))
      }
    }
  }
</script>

<style scoped>
  .searchInput {
    margin-left: 10px;
  }

</style>
