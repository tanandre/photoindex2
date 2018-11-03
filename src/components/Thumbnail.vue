<template>
  <div ref="thumbnail" class="thumbnail highlightable" v-on:mouseover="mouseOver">
    <v-progress-linear v-if="status == 'loading'" class="loadingBar" :indeterminate="true"></v-progress-linear>
    <v-icon v-if="status == 'inQueue' || status == 'loading'" class="center">crop_original</v-icon>
    <v-tooltip bottom>
      <div class="overlay" slot="activator">
        <v-icon v-if="isFavorite && status == 'completed'">favorite</v-icon>
        <v-icon v-if="isVideo && status == 'completed'">videocam</v-icon>
        <v-icon class="errorIcon" v-if="status === 'error'">not_interested</v-icon>
        <slot></slot>
      </div>
      <span>{{photo.date}}</span>
    </v-tooltip>
  </div>
</template>

<script>
  import util from '@/js/util'

  function isElementInViewport(el) {
    let rect = el.getBoundingClientRect()
    return rect.bottom > 0 && rect.right > 0 && rect.top <
      (window.innerHeight || document.documentElement.clientHeight) && rect.left <
      (window.innerWidth || document.documentElement.clientWidth)
  }

  export default {
    dependencies: ['urlHelper', 'thumbnailLoader'],
    props: ['photo'],
    data() {
      return {
        status: 'idle',
        isDone: false,
        promise: null
      }
    },
    computed: {
      isVideo() {
        return util.isVideo(this.photo)
      },
      isFavorite() {
        return this.photo.rating === 6
      }
    },

    mounted() {
      ['DOMContentLoaded', 'load', 'scroll', 'resize'].forEach((event) => {
        window.addEventListener(event, this.loadThumbnailIfInViewport)
      })
      this.loadThumbnailIfInViewport()
    },

    beforeDestroy() {
      ['DOMContentLoaded', 'load', 'scroll', 'resize'].forEach((event) => {
        window.removeEventListener(event, this.loadThumbnailIfInViewport)
      })

      this.status = 'destroyed'
      if (this.promise) {
        this.promise.cancel()
      }
    },

    updated() {
      this.loadThumbnailIfInViewport()
    },

    methods: {
      mouseOver() {
        //        console.log('mouseOver2')
      },
      loadThumbnailIfInViewport() {
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

        this.status = 'inQueue'
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
  .overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .thumbnail {
    display: inline-block;
    background-size: cover;
    background-color: #333;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    float: left;
    position: relative;
    cursor: pointer;
    border: 1px solid #222;
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
    z-index: 2;
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
    margin: 0;
    position: absolute;
    width: 100%;
    top: 0;
  }

  .center {
    position: absolute;
    opacity: 0.5;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
