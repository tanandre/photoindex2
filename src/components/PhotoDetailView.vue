<template>
  <div class="photoDetailView">
    <md-button class="md-icon-button" @click="onClose">
      <md-icon>clear</md-icon>
    </md-button>
    <div>details</div>
    <div>photo</div>
  </div>
</template>

<script>
  export default {
    dependencies: ['urlHelper', 'photoLoader'],
    props: ['photo'],

    mounted: function () {
    },
    methods: {
      onClose: function () {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>
  .photoDetailView {
    background-color: darkblue;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }


</style>
