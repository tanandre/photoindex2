<template>
  <md-snackbar md-position="center" :md-duration="Infinity" :md-active.sync="showSnackbar"
               md-persistent>
    <span>{{error}}</span>
    <md-button class="md-primary" @click="showSnackbar = false">Close</md-button>
  </md-snackbar>
</template>

<script>
  export default {
    props: ['error'],
    data: () => {
      return {
        showSnackbar: false
      }
    }
  }
</script>

<style scoped>
</style>
