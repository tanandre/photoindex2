<template>
  <md-snackbar md-position="center" :md-duration="Infinity" md-active
               v-if="errors.length > 0"
               md-persistent>
    <ul>
      <li v-for="error in errors">{{error}}</li>
    </ul>
    <md-button class="md-primary" @click="errors = []">Close</md-button>
  </md-snackbar>
</template>

<script>
  export default {
    props: ['error'],
    computed: {
      errors: {
        get () {
          return this.$store.state.errors.reverse()
        },
        set (errors) {
          this.$store.commit('errors', errors)
        }
      }
    }
  }
</script>

<style scoped>
</style>
