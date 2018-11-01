<template>
  <div id="app">
    <router-view/>
    <EditRatingDialog></EditRatingDialog>
    <EditTagsDialog></EditTagsDialog>
    <EditTagGroupsDialog></EditTagGroupsDialog>
    <EditDatesDialog></EditDatesDialog>
    <ErrorToaster></ErrorToaster>
  </div>
</template>

<script>
  import Vue from 'vue'
  import injector from 'vue-inject'
  import Assembler from './js/Assembler'
  import EditRatingDialog from './components/EditRatingDialog.vue'
  import EditDatesDialog from './components/EditDatesDialog.vue'
  import EditTagsDialog from './components/EditTagsDialog.vue'
  import EditTagGroupsDialog from './components/EditTagGroupsDialog.vue'
  import ErrorToaster from './components/ErrorToaster.vue'

  export default {
    components: {
      ErrorToaster,
      EditRatingDialog,
      EditDatesDialog,
      EditTagGroupsDialog,
      EditTagsDialog
    },
    name: 'PhotoIndex',
    beforeCreate () {
      new Assembler(injector, Vue.http, this.$router, this.$store).assemble()
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
