<template>
  <div ref="thumbnail" class="thumbnail highlightable">
    <md-progress-bar v-if="status == 'loading'" md-mode="indeterminate"></md-progress-bar>
    <md-tooltip md-direction="bottom">{{photo.date}}</md-tooltip>
    <span v-if="status === 'error'">error</span>
    <slot></slot>
  </div>
</template>

<script>
  function isElementInViewport (el) {
    let rect = el.getBoundingClientRect()
    return rect.bottom > 0 && rect.right > 0 && rect.top <
      (window.innerHeight || document.documentElement.clientHeight) && rect.left <
      (window.innerWidth || document.documentElement.clientWidth)
  }

  export default {
    dependencies: ['urlHelper', 'thumbnailLoader'],
    props: ['photo'],
    data: function () {
      return {
        status: 'idle',
        isDone: false,
        promise: null
      }
    },

    mounted: function () {
      ['DOMContentLoaded', 'load', 'scroll', 'resize'].forEach((event) => {
        window.addEventListener(event, this.loadThumbnailIfInViewport)
      })
      this.loadThumbnailIfInViewport()
    },

    beforeDestroy: function () {
      ['DOMContentLoaded', 'load', 'scroll', 'resize'].forEach((event) => {
        window.removeEventListener(event, this.loadThumbnailIfInViewport)
      })

      this.status = 'destroyed'
      if (this.promise) {
        this.promise.cancel()
      }
    },

    updated: function () {
      this.loadThumbnailIfInViewport()
    },

    methods: {
      loadThumbnailIfInViewport: function () {
        if (this.isDone) {
          return
        }

        if (!isElementInViewport(this.$el)) {
          // console.log('not in viewport');
          // cancel queued items that have not been started
          if (this.promise && !this.promise.hasProgress()) {
            this.status = 'canceled'
            this.promise.cancel()
            this.promise = null
          }
          return
        }

        // already on the queue
        if (this.promise) {
          return
        }

        this.status = 'in queue'
        let thumbnail = this.$refs['thumbnail']

        let url = this.urlHelper.getThumbnailUrl(this.photo)
        this.promise = this.thumbnailLoader.load(url).then(() => {
          this.status = 'completed'
          thumbnail.style.backgroundImage = 'url(' + url + ')'
        }, (err) => {
          console.error(err)
          this.status = 'error'
          this.isDone = true
        }, () => {
          this.status = 'loading'
        })
      }
    }
  }
</script>

<style scoped>
  .thumbnail {
    display: inline-block;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    float: left;
    position: relative;
    cursor: pointer;
  }

  .highlightable:hover {
    opacity: 1;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.9);
    transform: scale(1.05);
    z-index: 1000;
  }

  .highlightable {
    z-index: 1;
    opacity: .75;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.15);
    -moz-transition: opacity .3s ease-out;
    -webkit-transition: opacity .3s ease-out;
    -o-transition: opacity .3s ease-out;
    transition: all .3s ease-out;
  }

</style>
