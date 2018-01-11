<template>
  <div class="thumbnailGallery">
    <thumbnail class="thumbnail" v-for="image in getImagesForCurrentPage()" v-bind:photo="image"
               :key="image.id">
    </thumbnail>
  </div>
</template>

<script>
  import Thumbnail from './Thumbnail.vue'

  export default {
    components: {
      Thumbnail
    },
    props: ['album'],
    methods: {
      getImagesForCurrentPage: function () {
        let images = this.album.images
        let begin = this.album.currentPage * this.album.imagesPerPage
        let end = Math.min(images.length, begin + this.album.imagesPerPage)
        return images.slice(begin, end)
      }
    }
  }
</script>

<style scoped>
  .thumbnailGallery {
    overflow: hidden;
  }

  .thumbnail {
    height: 200px;
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
