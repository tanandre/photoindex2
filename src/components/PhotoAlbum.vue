<template>
  <div class="photoAlbum">
    <md-toolbar>
      <md-button class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title">{{ title }}</h2>
      <search-input v-model="tags" class="searchInput"></search-input>
    </md-toolbar>
    <thumbnail-gallery v-bind:album="album"></thumbnail-gallery>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Assembler from '../js/Assembler'
  import ThumbnailGallery from './ThumbnailGallery.vue'
  import SearchInput from './SearchInput.vue'
  import injector from 'vue-inject'

  export default {
    components: {
      ThumbnailGallery,
      SearchInput
    },
    data () {
      return {
        title: 'Photo Index',
        album: {
          images: [],
          imageItems: []
        },
        tags: []
      }
    },
    mounted: function () {
      let serverUrl = this.$route.query.server
      new Assembler(injector).assemble(serverUrl)
      this.retrieveImages(serverUrl)
    },
    methods: {
      retrieveImages: function (serverUrl) {
        let urlHelper = injector.get('urlHelper')

        Vue.http.get(urlHelper.getListing()).then(response => {
          let index = Math.round(Math.random() * 1000)
          this.album = {
            images: response.body.splice(index, 30)
          }
        }).catch(err => {
          console.error(err)
        })
      }
    },
    watch: {
      album: function (value) {
        console.log('watch', arguments)
      },
      tags: function (tags) {
        console.log('watchTags', tags)
      }
    }
  }
</script>

<style scoped>
  .searchInput {
    margin-left: 10px;
  }
</style>
