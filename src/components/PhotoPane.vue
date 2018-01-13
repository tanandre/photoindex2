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
      let thumbnailUrl = this.urlHelper.getThumbnailUrl(this.photo)
      let photoPane = this.$refs['photoPane']
      photoPane.style.backgroundImage = 'url(' + thumbnailUrl + ')'

      let url = this.urlHelper.getPhotoUrl(this.photo, 1000)
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
  }
</script>

<style scoped>
  .photoPane {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
