<template>
  <div class="photoDetailView">
    <photo-pane class="photoPane" :photo="photo"></photo-pane>
    <details-pane :photo="photo"></details-pane>
  </div>
</template>

<script>
  import PhotoPane from './PhotoPane.vue'
  import DetailsPane from './DetailsPane.vue'

  export default {
    components: {PhotoPane, DetailsPane},
    props: ['photo'],
    mounted: function () {
      document.body.classList.add('noScroll')
    },
    beforeDestroy: function () {
      document.body.classList.remove('noScroll')
    }
  }
</script>

<style scoped>
  .photoDetailView {
    background-color: #000;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }

  .photoPane {
    position: absolute;
    width: 80%;
    height: 100%;
  }

</style>
