<template>
  <div ref="thumbnail" class="thumbnail highlightable">
    <md-progress-bar v-if="status == 'loading'" class="loadingBar" md-mode="indeterminate"></md-progress-bar>
    <md-tooltip md-direction="bottom">{{photo.date}}</md-tooltip>
    <mdIcon v-if="isVideo">videocam</mdIcon>
    <mdIcon class="errorIcon" v-if="status === 'error'">not_interested</mdIcon>
    <slot></slot>
  </div>
</template>

<script>
  import util from '../js/util'

  function isElementInViewport (el) {
    let rect = el.getBoundingClientRect()
    return rect.bottom > 0 && rect.right > 0 && rect.top <
      (window.innerHeight || document.documentElement.clientHeight) && rect.left <
      (window.innerWidth || document.documentElement.clientWidth)
  }

  export default {
    dependencies: ['urlHelper', 'thumbnailLoader'],
    props: ['photo'],
    data () {
      return {
        status: 'idle',
        isDone: false,
        promise: null
      }
    },
    computed: {
      isVideo () {
        return util.isVideo(this.photo)
      }
    },

    mounted () {
      ['DOMContentLoaded', 'load', 'scroll', 'resize'].forEach((event) => {
        window.addEventListener(event, this.loadThumbnailIfInViewport)
      })
      this.loadThumbnailIfInViewport()
    },

    beforeDestroy () {
      ['DOMContentLoaded', 'load', 'scroll', 'resize'].forEach((event) => {
        window.removeEventListener(event, this.loadThumbnailIfInViewport)
      })

      this.status = 'destroyed'
      if (this.promise) {
        this.promise.cancel()
      }
    },

    updated () {
      this.loadThumbnailIfInViewport()
    },

    methods: {
      loadThumbnailIfInViewport () {
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
    background-color: #222;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    float: left;
    position: relative;
    cursor: pointer;
    border: 2px solid #222;
  }

  .errorIcon {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -12px;
    margin-top: -12px;
  }

  .highlightable:hover {
    opacity: 1;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.9);
    transform: scale(1.05);
    z-index: 10;
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

  .loadingBar {
    position: absolute;
    width: 100%;
    top: 0;
  }

</style>
