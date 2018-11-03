<template>
  <div class="videoPane">
    <v-progress-linear v-if="loading" class="loadingBar" :indeterminate="true"></v-progress-linear>
    <video class="video" ref="videoNode" :src="videoUrl" :poster="thumbnailUrl" controls>
      <!--<source :src="videoUrl" type="video/mp4">-->
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
  import util from '@/js/util'

  export default {
    dependencies: ['urlHelper'],
    props: ['photo'],
    data () {
      return {
        loading: false
      }
    },
    computed: {
      videoUrl () {
        return this.urlHelper.getVideoUrl(this.photo, (util.browser.isChrome() || util.browser.isFirefox()) ? 'mp4' : 'original')
      },
      thumbnailUrl () {
        return this.urlHelper.getThumbnailUrl(this.photo)
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
