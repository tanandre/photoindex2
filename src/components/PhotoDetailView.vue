<template>
  <div class="photoDetailView">
    <details-pane class="photoDetailsPane" :photo="photo"></details-pane>
    <photo-pane class="photoPane" :photo="photo"></photo-pane>
  </div>
</template>

<script>
  import PhotoPane from './PhotoPane.vue'
  import DetailsPane from './DetailsPane.vue'

  export default {
    components: {PhotoPane, DetailsPane},
    props: ['photo'],
    mounted () {
      document.body.classList.add('noScroll')
    },
    beforeDestroy () {
      document.body.classList.remove('noScroll')
    }
  }
</script>

<style scoped>
  .photoDetailView {
    background: linear-gradient(to right, #111 , #222);
    width: 100%;
    height: 100%;
    z-index: 1000;
    position: fixed;
  }

  .photoDetailsPane {
    position: absolute;
    right: 0;
    width: 20%;
    height: 100%;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.9);
  }

  .photoPane {
    position: absolute;
    width: 80%;
    height: 100%;
  }

</style>
