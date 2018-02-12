<template>
  <div class="photoPane" ref="photoPane">
    <md-progress-bar class="loadingBar" v-if="status == 'loading'" md-mode="indeterminate"></md-progress-bar>
    <div class="errorPane">
      <mdIcon class="md-size-2x" v-if="status === 'error'">error_outline</mdIcon>
      <div>{{errorMsg}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    dependencies: ['urlHelper', 'photoLoader'],
    props: ['photo'],
    data () {
      return {
        status: 'idle',
        errorMsg: ''
      }
    },
    mounted () {
      this.drawPhoto()
    },
    methods: {
      drawPhoto () {
        let thumbnailUrl = this.urlHelper.getThumbnailUrl(this.photo)
        let photoPane = this.$refs['photoPane']
        photoPane.style.backgroundImage = 'url(' + thumbnailUrl + ')'

        if (this.promise && !this.promise.isDone()) {
          this.promise.cancel()
        }

        let url = this.urlHelper.getPhotoUrl(this.photo, 1000)
        // TODO cancel promise if existing
        this.promise = this.photoLoader.load(url).then(() => {
          this.status = 'completed'
          photoPane.style.backgroundImage = 'url(' + url + ')'
        }, (err) => {
          console.error(err)
          this.status = 'error'
          console.error(err)
          this.errorMsg = 'error loading: ' + err
          this.isDone = true
        }, () => {
          this.status = 'loading'
        })
      }
    },
    watch: {
      photo () {
        this.drawPhoto()
      }
    },
    beforeDestroy () {
      if (this.promise) {
        this.promise.cancel()
      }
    }
  }
</script>

<style scoped>
  .photoPane {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .errorPane {
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
  }

  .loadingBar {
    position: absolute;
    width: 100%;
    top: 0;
  }
</style>
