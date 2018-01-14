<template>
  <div class="photoAlbum">
    <photo-detail-view v-if="selectedImage !== null" v-bind:photo="selectedImage"
                       v-on:close="selectedImage = null"></photo-detail-view>
    <md-toolbar class="md-dense">
      <md-button class="md-icon-button">
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
    <thumbnail-gallery v-bind:album="album"
                       v-on:select="selectImage"></thumbnail-gallery>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Assembler from '../js/Assembler'
  import ThumbnailGallery from './ThumbnailGallery.vue'
  import PhotoDetailView from './PhotoDetailView.vue'
  import SearchInput from './SearchInput.vue'
  import injector from 'vue-inject'

  export default {
    components: {
      ThumbnailGallery,
      SearchInput,
      PhotoDetailView
    },
    data () {
      return {
        title: 'Photo Index',
        album: {
          images: [],
          imageItems: []
        },
        selectedImage: null,
        tags: [],
        loading: false
      }
    },

    mounted: function () {
      let serverUrl = this.$route.query.server
      new Assembler(injector, Vue.http).assemble(serverUrl)

      window.addEventListener('keydown', this.onKeyDown)
      this.retrieveImages({})
    },

    beforeDestroy: function () {
      window.removeEventListener('keydown', this.onKeyDown)
    },

    methods: {
      onKeyDown: function (key) {
        if (this.selectedImage === null) {
          // todo
        } else {
          if (key.keyCode === 27) {
            this.selectedImage = null
          } else if (key.keyCode === 37) {
            this.selectImageByIndex(this.album.images.indexOf(this.selectedImage) - 1)
          } else if (key.keyCode === 39) {
            this.selectImageByIndex(this.album.images.indexOf(this.selectedImage) + 1)
          }
        }
      },

      selectImageByIndex: function (index) {
        if (index < 0 || index >= this.album.images.length) {
          return
        }
        this.selectImage(this.album.images[index])
      },

      selectImage: function (image) {
        this.selectedImage = image
      },
      retrieveImages: function (data) {
        let urlHelper = injector.get('urlHelper')
        let jsonLoader = injector.get('jsonLoader')

        // TODO cancel current one if still active
        this.loading = true
        jsonLoader.load(urlHelper.getListing(), {params: data}).then(response => {
          this.loading = false
          let images = response
          this.album = {
            images: images,
            imageItems: []
          }
        }, err => {
          this.loading = false
          console.error(err)
        })
      }
    },
    watch: {
      album: function (value) {
        console.log('watch', arguments)
      },
      tags: function (tags) {
        this.retrieveImages({tag: tags})
      }
    }
  }
</script>

<style scoped>
  .searchInput {
    margin-left: 10px;
  }

</style>
