<template>
  <div class="thumbnailGallery">
    <thumbnail class="thumbnail" v-for="image in imagesForCurrentPage" :photo="image"
               :key="image.id" @click.native="onClickThumbnail(image)">
    </thumbnail>
  </div>
</template>

<script>
  import Thumbnail from './Thumbnail.vue'

  export default {
    dependencies: ['navigator'],
    components: {
      Thumbnail
    },
    computed: {
      pageCount () {
        return this.$store.state.gallery.pageCount
      },
      imagesPerPage () {
        return this.$store.state.gallery.thumbnailsPerPage
      },
      imagesForCurrentPage () {
        let imagesPerPage = this.imagesPerPage
        let images = this.$store.state.album.images
        let begin = (this.$store.state.page - 1) * imagesPerPage
        let end = Math.min(images.length, begin + imagesPerPage)
        return images.slice(begin, end)
      }

    },
    methods: {
      onClickThumbnail (photo) {
        this.navigator.setPhoto(photo.id)
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
