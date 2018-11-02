<template>
  <v-snackbar bottom v-model="showErrors">
    <ul>
      <li v-for="error in errors">{{error}}</li>
    </ul>
    <v-btn class="primary" @click="errors = []">Close</v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    computed: {
      showErrors: {
        get() {
          return this.$store.state.errors.length > 0
        },
        set() {
          this.$store.commit('errors', [])
        }
      },
      errors: {
        get() {
          return this.$store.state.errors.reverse()
        },
        set(errors) {
          this.$store.commit('errors', errors)
        }
      }
    }
  }
</script>

<style scoped>
</style>
