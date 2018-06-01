<template>
  <div class="photoPane" ref="photoPane"
       :class="{'rotate90': rotate == 1, 'rotate180': rotate == 2, 'rotate270': rotate == 3}">
    <md-progress-bar class="loadingBar" v-if="status == 'loading'" md-mode="indeterminate"></md-progress-bar>
    <div class="errorPane" v-if="errorMsg">
      <mdIcon class="md-size-2x" v-if="status === 'error'">error_outline</mdIcon>
      <div>{{errorMsg}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    dependencies: ['urlHelper', 'photoLoader'],
    props: ['photo', 'rotate'],
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
        this.errorMsg = ''
        let thumbnailUrl = this.urlHelper.getThumbnailUrl(this.photo)
        let photoPane = this.$refs['photoPane']
        photoPane.style.backgroundImage = 'url(' + thumbnailUrl + ')'

        if (this.promise && !this.promise.isDone()) {
          this.promise.cancel()
        }

        let url = this.urlHelper.getPhotoUrl(this.photo, 2)
        // TODO cancel promise if existing
        this.promise = this.photoLoader.load(url).then(() => {
          this.status = 'completed'
          photoPane.style.backgroundImage = 'url(' + url + ')'
        }, (err) => {
          this.status = 'error'
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
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.2);
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

  .photoPane.rotate90 {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .photoPane.rotate180 {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .photoPane.rotate270 {
    -webkit-transform: rotate(270deg);
    transform: rotate(270deg);
  }
</style>
