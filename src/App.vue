<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import Vue from 'vue'
  import injector from 'vue-inject'
  import Assembler from './js/Assembler'

  export default {
    name: 'PhotoIndex',
    beforeCreate: function () {
      let serverUrl = localStorage.getItem('serverUrl')
      new Assembler(injector, Vue.http, this.$router, this.$store).assemble(serverUrl === null ? 'http://kanji:1337' : serverUrl)
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
