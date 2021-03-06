<template>
  <div class="thumbnailGallery" ref="gallery">
    <HUDGallery></HUDGallery>
    <thumbnail class="thumbnail" :class="{ selected: isSelected(image) }" v-for="image in imagesForCurrentPage"
               :photo="image"
               :key="image.id" @click.native="onClickThumbnail(image, $event)">
      <v-icon class="selectedIcon" v-if="isSelected(image)">check_circle</v-icon>
    </thumbnail>
    <div v-if="!loading && images.length === 0">No photos matching query or filter</div>
  </div>
</template>

<script>
  import Thumbnail from './Thumbnail.vue'
  import HUDGallery from './HUDGallery.vue'
  import util from '@/js/util'

  export default {
    dependencies: ['navigator'],
    components: {
      Thumbnail,
      HUDGallery
    },
    computed: {
      imagesForCurrentPage () {
        return util.imagesForCurrentPage(this.$store.state.album.images, this.$store.state.gallery)
      },
      images () {
        return this.$store.state.album.images
      },
      loading () {
        return this.$store.state.loading
      }

    },
    methods: {
      isSelected (photo) {
        return util.arrayContains(this.$store.state.selection.selectedPhotos, photo)
      },

      updatePhotoSelection (photo) {
        if (this.isSelected(photo)) {
          this.$store.commit('deselectPhoto', photo)
          return
        }

        let selectedPhotos = this.$store.state.selection.selectedPhotos
        if (selectedPhotos.length === 0) {
          this.$store.commit('selectPhoto', photo)
          return
        }
        let images = this.$store.state.album.images
        let lastIndex = images.indexOf(selectedPhotos[selectedPhotos.length - 1])
        let currentIndex = images.indexOf(photo)
        if (currentIndex > lastIndex) {
          for (let index = lastIndex + 1; index <= currentIndex; index++) {
            this.$store.commit('selectPhoto', images[index])
          }
        } else {
          for (let index = currentIndex; index < lastIndex; index++) {
            this.$store.commit('selectPhoto', images[index])
          }
        }
      },

      onClickThumbnail (photo, event) {
        if (event.ctrlKey) {
          if (this.isSelected(photo)) {
            this.$store.commit('deselectPhoto', photo)
          } else {
            this.$store.commit('selectPhoto', photo)
          }
        } else if (event.shiftKey) {
          this.updatePhotoSelection(photo)
        } else {
          this.navigator.setPhoto(photo.id)
        }
      }
    },
    watch: {
      '$store.state.gallery.page' () {
        window.scrollTo(0, 0)
      }
    }
  }
</script>

<style scoped>
  .thumbnail {
    height: 200px;
  }

  .thumbnailGallery {
    overflow: hidden;
  }

  .thumbnailGallery .thumbnail.selected {
    border: 1px solid yellow;
    opacity: 1;
  }

  .selectedIcon {
    float: right;
    background-color: rgba(55, 55, 55, 0.3);
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
