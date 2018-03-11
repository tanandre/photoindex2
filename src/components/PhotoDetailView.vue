<template>
  <div class="photoDetailView">
    <DetailsPane class="photoDetailsPane" :photo="photo"></DetailsPane>
    <PhotoPane v-if="!isVideo" class="photoPane" :photo="photo"></PhotoPane>
    <VideoPane v-if="isVideo" class="videoPane" :photo="photo"></VideoPane>
  </div>
</template>

<script>
  import util from '../js/util'
  import PhotoPane from './PhotoPane.vue'
  import VideoPane from './VideoPane.vue'
  import DetailsPane from './DetailsPane.vue'

  export default {
    components: {PhotoPane, VideoPane, DetailsPane},
    props: ['photo'],
    computed: {
      isVideo () {
        return util.isVideo(this.photo)
      }
    },
    mounted () {
      document.body.classList.add('noScroll')
    },
    beforeDestroy () {
      document.body.classList.remove('noScroll')
    }
  }
</script>

<style scoped>
  .photoDetailView {
    background: linear-gradient(to right, #111, #222);
    width: 100%;
    height: 100%;
    z-index: 4;
    position: fixed;
    top: 0;
  }

  .photoDetailsPane {
    position: absolute;
    right: 0;
    width: 20%;
    height: 100%;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.9);
    z-index: 2;
  }

  .photoPane {
    position: absolute;
    width: 80%;
    height: 100%;
  }

</style>
