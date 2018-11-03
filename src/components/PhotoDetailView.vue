<template>
  <transition name="fade">
    <div class="photoDetailView">
      <DetailsPane ref="detailsPane" class="photoDetailsPane" :photo="photo" v-on:toggleVideo="toggleVideo"
                   v-on:rotate="onRotate"></DetailsPane>
      <PhotoPane v-if="!isVideo" class="photoPane" :photo="photo" :rotate="rotate"></PhotoPane>
      <VideoPane v-if="isVideo" class="videoPane" :photo="photo"></VideoPane>
    </div>
  </transition>
</template>

<script>
  import PhotoPane from './PhotoPane.vue'
  import VideoPane from './VideoPane.vue'
  import DetailsPane from './DetailsPane.vue'

  export default {
    components: {PhotoPane, VideoPane, DetailsPane},
    props: ['photo'],
    data () {
      return {
        isVideo: false,
        rotate: 0
      }
    },
    mounted () {
      document.body.parentNode.classList.add('noScroll')
    },
    methods: {
      onRotate (direction) {
        this.rotate = this.rotate + direction
        if (this.rotate === -1) {
          this.rotate = 3
        } else if (this.rotate === 4) {
          this.rotate = 0
        }
      },
      toggleVideo () {
        this.isVideo = !this.isVideo
      }
    },
    destroyed () {
      document.body.parentNode.classList.remove('noScroll')
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
