<template>
  <transition name="fade">
    <div v-if="showHUD" class="hudGallery">
      <div>
        <span>Photos:</span>
        <span>{{album.images.length}} / {{album.all.length}}</span>
      </div>
      <div>
        <span>Period:</span>
        <span>{{period}}</span>
      </div>
      <div>
        <span>Queue:</span>
        <span>{{queue.length}}</span>
      </div>
      <div>
        <span>Workers:</span>
        <span>({{getActiveWorkeres(thumbnailLoader.workers).length}}</span>
        <span>/ {{thumbnailLoader.workers.length}})</span>
      </div>
      <!--<div v-for="worker in thumbnailLoader.workers">-->
      <!--<span>{{worker._isAvailable}}</span>-->
      <!--</div>-->
    </div>
  </transition>
</template>

<script>
  import util from '../js/util'

  export default {
    dependencies: ['thumbnailLoader'],
    data: function () {
      return {
        date: {
          begin: new Date(),
          end: new Date()
        },
        queue: this.thumbnailLoader.queue.queue
      }
    },
    mounted () {
      this.thumbnailLoader.queue.watchable.watch(queue => {
        this.queue = queue
      })
    },
    computed: {
      showHUD () {
        return this.$store.state.action.showHUD
      },
      album () {
        return this.$store.state.album
      },
      period () {
        let imagesForCurrentPage = this.imagesForCurrentPage();
        if (imagesForCurrentPage.length === 0) {
          return ''
        }
        let begin = imagesForCurrentPage[0].date.substring(0, 11)
        let end = imagesForCurrentPage[imagesForCurrentPage.length - 1].date.substring(0, 11)
        return begin === end ? begin : begin + ' ' + end
      }
    },
    methods: {
      imagesForCurrentPage () {
        return util.imagesForCurrentPage(this.$store.state.album.images, this.$store.state.gallery)
      },
      getActiveWorkeres (workers) {
        return workers.filter(w => !w._isAvailable)
      }
    }

  }
</script>

<style scoped>
  .hudGallery {
    position: fixed;
    background-color: rgba(32, 32, 32, 0.6);
    font-family: "Courier New";
    /*font-size: 10px;*/
    color: rgb(0, 168, 224);
    height: 100%;
    z-index: 3;
    padding: 10px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
