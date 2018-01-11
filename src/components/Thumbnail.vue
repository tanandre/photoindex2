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
      let url = this.urlHelper.getThumbnailUrl(this.photo)

      this.imageLoader.load(url).then(() => {
        this.status = 'completed'
        this.$refs['thumbnail'].style.backgroundImage = 'url(' + url + ')'
      })
    }
  }
</script>

<style scoped>
  .thumbnail {
    height: 200px;
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
