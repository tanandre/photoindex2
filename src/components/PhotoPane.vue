<template>
  <div class="photoPane" ref="photoPane">
    <md-progress-bar v-if="status == 'loading'" md-mode="indeterminate"></md-progress-bar>
  </div>
</template>

<script>
  export default {
    dependencies: ['urlHelper', 'photoLoader'],
    props: ['photo'],
    data: function () {
      return {
        status: 'idle'
      }
    },
    mounted: function () {
      this.drawPhoto()
    },
    methods: {
      drawPhoto: function () {
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
          this.isDone = true
        }, () => {
          this.status = 'loading'
        })
      }
    },
    watch: {
      photo: function () {
        this.drawPhoto()
      }
    },
    beforeDestroy: function () {
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
</style>
