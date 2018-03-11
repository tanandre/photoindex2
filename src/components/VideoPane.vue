<template>
  <div class="videoPane">
    <md-progress-bar class="loadingBar" v-if="loading" md-mode="indeterminate"></md-progress-bar>
    <video class="video" ref="videoNode" :src="videoUrl" :poster="thumbnailUrl" controls>
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
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
        return this.urlHelper.getVideoUrl(this.photo)
      },
      thumbnailUrl () {
        return this.urlHelper.getThumbnailUrl(this.photo)
      }
    },
    mounted () {
      this.$refs['videoNode'].addEventListener('progress', () => {
        this.loading = true
      })

      this.$refs['videoNode'].addEventListener('progress', () => {
        this.loading = false
      })
    }
  }
</script>

<style scoped>
  .video {
    width: 80%;
    height: 500px;
  }

  .loadingBar {
    position: absolute;
    width: 80%;
    top: 0;
  }

</style>
