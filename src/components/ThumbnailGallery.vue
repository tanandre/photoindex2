<template>
  <div class="thumbnailGallery">
    <pagination v-if="pageCount > 1" :current-page="album.currentPage"
                :page-count="pageCount"></pagination>
    <thumbnail class="thumbnail" v-for="image in getImagesForCurrentPage()" :photo="image"
               :key="image.id" @click.native="onClickThumbnail(image)">
    </thumbnail>
  </div>
</template>

<script>
  import Thumbnail from './Thumbnail.vue'
  import Pagination from './Pagination.vue'

  let rows = 10
  export default {
    dependencies: ['navigator'],
    components: {
      Thumbnail,
      Pagination
    },
    props: ['album'],
    data: function () {
      return {
        pageCount: 1,
        imagesPerPage: 0
      }
    },
    mounted: function () {
      window.addEventListener('resize', this.calibrateImagesPerPage)
    },

    beforeDestroy: function () {
      window.removeEventListener('resize', this.calibrateImagesPerPage)
    },

    methods: {
      onClickThumbnail: function (photo) {
        this.navigator.setPhoto(photo.id)
      },
      calibratePageCount: function () {
        this.pageCount = Math.ceil(this.album.images.length / this.imagesPerPage)
      },
      resetCurrentPage: function () {
        if (this.album.currentPage >= this.pageCount) {
          this.navigator.setPage(1)
        }
      },
      calibrateImagesPerPage: function () {
        let width = window.screen.width
        if (width < 480) {
          this.imagesPerPage = 3 * rows
          return
        }
        if (width < 650) {
          this.imagesPerPage = 4 * rows
          return
        }
        if (width < 1024) {
          this.imagesPerPage = 5 * rows
          return
        }
        if (width < 1280) {
          this.imagesPerPage = 6 * rows
          return
        }
        if (width >= 1280) {
          this.imagesPerPage = 7 * rows
        }
      },
      getImagesForCurrentPage: function () {
        let images = this.album.images
        let begin = this.album.currentPage * this.imagesPerPage
        let end = Math.min(images.length, begin + this.imagesPerPage)
        return images.slice(begin, end)
      }
    },
    watch: {
      album: function () {
        this.calibrateImagesPerPage()
        this.calibratePageCount()
        this.resetCurrentPage()
      },
      imagesPerPage: function () {
        this.calibratePageCount()
      }
    }
  }
</script>

<style scoped>
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

  @media only screen and (max-width: 1280px) and (min-width: 1025px) {
    .thumbnail {
      width: calc(100% / 6);
    }
  }

  @media only screen and (min-width: 1280px) {
    .thumbnail {
      width: calc(100% / 7);
    }
  }
</style>
