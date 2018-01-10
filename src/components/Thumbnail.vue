<template>
  <div ref="thumbnail" class="thumbnail highlightable">
    <md-progress-bar v-if="status == 'loading'" md-mode="indeterminate"></md-progress-bar>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    dependencies: ['urlHelper', 'imageLoader'],
    props: ['photo'],
    data: function () {
      return {
        status: 'loading'
      }
    },
    mounted: function () {
      let thumbnail = this.$refs['thumbnail']
      let url = this.urlHelper.getThumbnailUrl(this.photo)

      this.imageLoader.load(url).then(() => {
        this.status = 'completed'
        thumbnail.style.backgroundImage = 'url(' + url + ')'
      })
    },
    methods: {
      getImageUrl: function (photo) {
        return this.urlHelper.getThumbnailUrl(photo)
      }
    }
  }
</script>

<style scoped>
  .thumbnail {
    height: 200px;
    display: inline-block;
    border: 1px solid grey;
    background-size: cover;
    background-position: center;
  }

  @media only screen and (max-width: 480px) {
    .thumbnail {
      width: calc(100% / 3);
    }
  }

  @media only screen and (max-width: 650px) and (min-width: 481px) {
    .thumbnail {
      width: calc(100% / 4);
    }
  }

  @media only screen and (max-width: 1024px) and (min-width: 481px) {
    .thumbnail {
      width: calc(100% / 5);
    }
  }

  @media only screen and (min-width: 1025px) {
    .thumbnail {
      width: calc(100% / 7);
    }
  }

</style>
