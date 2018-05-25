<template>
  <div class="videoPane">
    <md-progress-bar class="loadingBar" v-if="loading" md-mode="indeterminate"></md-progress-bar>
    <video class="video" ref="videoNode" :src="videoUrl" :poster="thumbnailUrl" controls>
      <!--<source :src="videoUrl" type="video/mp4">-->
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
  import util from '../js/util'

  export default {
    props: ['photo'],
    data () {
      return {
        loading: false
      }
    },
    computed: {
      videoUrl () {
        return this.$store.state.service.urlHelper.getVideoUrl(this.photo, (util.browser.isChrome() || util.browser.isFirefox()) ? 'mp4' : 'original')
      },
      thumbnailUrl () {
        return this.$store.state.service.urlHelper.getThumbnailUrl(this.photo)
      }
    },
    mounted () {
//      this.$refs['videoNode'].addEventListener('progress', () => {
//        this.loading = true
//      })
//
//      this.$refs['videoNode'].onloadeddata = () => {
//        this.loading = false
//      }
    }
  }
</script>

<style scoped>
  .videoPane {
    height: 100%;
  }

  .video {
    width: 80%;
    height: 100%;
  }

  .loadingBar {
    position: absolute;
    width: 80%;
    top: 0;
  }

</style>
