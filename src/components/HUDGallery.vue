<template>
  <transition name="fade">
    <div v-if="showHUD" class="hudGallery">
      <div>
        <span>Photos:</span>
        <span>{{album.images.length}} / {{album.all.length}}</span>
      </div>
      <div>
        <span>Period (all):</span>
        <span>{{period}}</span>
      </div>
      <div>
        <span>Period (display):</span>
        <span>{{displayedPeriod}}</span>
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
      <div>
        <span>Selected photos:</span>
        <span>{{selectedPhotos.length}}</span>
      </div>
      <div>
        <span>Loading:</span>
        <span>{{loading}}</span>
      </div>
      <div>
        <span>Errors:</span>
        <span>{{errors.length}}</span>
      </div>
      <div>
        <span>Tags:</span>
        <TagChips></TagChips>
      </div>
    </div>
  </transition>
</template>

<script>
  import util from '@/js/util'
  import TagChips from './TagChips.vue'

  export default {
    dependencies: ['thumbnailLoader'],
    components: {
      TagChips
    },
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
      selectedPhotos () {
        return this.$store.state.selection.selectedPhotos
      },
      loading () {
        return this.$store.state.loading
      },
      album () {
        return this.$store.state.album
      },
      errors () {
        return this.$store.state.errors
      },
      period () {
        return this.getPeriod(this.$store.state.album.images)
      },
      displayedPeriod () {
        return this.getPeriod(this.imagesForCurrentPage())
      }
    },
    methods: {
      imagesForCurrentPage () {
        return util.imagesForCurrentPage(this.$store.state.album.images, this.$store.state.gallery)
      },

      getPeriod (images) {
        if (images.length === 0) {
          return ''
        }
        let begin = images[0].date.substring(0, 11)
        let end = images[images.length - 1].date.substring(0, 11)
        if (begin === end) {
          return begin
        }
        return begin + ' / ' + end
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
    font-family: "Bahnschrift";
    /*font-size: 10px;*/
    color: rgb(0, 168, 224);
    height: 100%;
    z-index: 3;
    padding: 10px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }

  .fade-enter, .fade-leave-to {
    transform: translateX(-100%);
  }
</style>
