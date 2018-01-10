<template>
  <div class="photoAlbum">
    <md-toolbar>
      <md-button class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title">{{ title }}</h2>
    </md-toolbar>
    <thumbnail-gallery v-bind:album="album"></thumbnail-gallery>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Assembler from '../js/Assembler'
  import ThumbnailGallery from './ThumbnailGallery.vue'

  export default {
    components: {
      ThumbnailGallery
    },
    data () {
      return {
        title: 'Photo Index',
        album: {
          images: [],
          imageItems: []
        }
      }
    },
    mounted: function () {
      let serverUrl = this.$route.query.server
      Assembler.assemble(serverUrl)

      Vue.http.get(serverUrl + '/listing').then(response => {
        let index = Math.round(Math.random() * 1000)
        this.album = {
          images: response.body.splice(index, 30)
        }
      }).catch(err => {
        console.error(err)
      })
    },
    watch: {
      album: function (value) {
        console.log('watch', arguments)
      }
    }
  }
</script>

<style scoped>
</style>
