<template>
  <div class="thumbnailGallery">
    <thumbnail v-for="image in album.images" v-bind:photo="image" :key="image.id"></thumbnail>
  </div>
</template>

<script>
  import Thumbnail from './Thumbnail.vue'

  export default {
    components: {
      Thumbnail
    },
    props: ['album'],
    data () {
      return {}
    },
    mounted: function () {
      console.log('mounted')
    }
  }
</script>

<style scoped>
</style>
