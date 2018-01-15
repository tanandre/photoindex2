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
      <search-input class="searchInput"></search-input>
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

    <thumbnail-gallery :album="album"></thumbnail-gallery>
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
        loading: false,
        showMenu: false
      }
    },

    mounted: function () {
      window.addEventListener('keydown', this.onKeyDown)
      let tags = this.$route.query.q
      this.retrieveImages({tag: (tags ? tags.split(',') : [])})
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
        if (page < 0) {
          return
        }
        this.album.currentPage = page
      },

      onHashChangedPhoto: function (photoId) {
        let foundPhoto = photoId === -1 ? null : this.album.images.find(photo => {
          return photo.id === photoId
        })
        this.setSelectedImage(foundPhoto === undefined ? null : foundPhoto)
      },

      setSelectedImage: function (image) {
        this.selectedImage = image
      },

      retrieveImages: function (data) {
        console.log('retrieve images')
        // TODO cancel current one if still active
        this.loading = true
        this.jsonLoader.load(this.urlHelper.getListing(), {params: data}).then(response => {
          this.loading = false
          let images = response
          console.log('setting album')
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
      '$route.params.page': function (value) {
        this.onHashChangedPage(Number(value) - 1)
      },
      '$route.params.photoid': function (value) {
        this.onHashChangedPhoto(Number(value))
      },
      '$route.query': function (query, old) {
        if (JSON.stringify(query) !== JSON.stringify(old)) {
          let tags = query.q
          this.retrieveImages({tag: (tags ? tags.split(',') : [])})
        }
      }
    }
  }
</script>

<style scoped>
  .searchInput {
    margin-left: 10px;
  }

</style>
