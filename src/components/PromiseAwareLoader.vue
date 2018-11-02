<template>
  <v-progress-linear v-if="loading" class="loadingBar" :indeterminate="true"></v-progress-linear>
</template>

<script>
  export default {
    props: ['promise'],
    data () {
      return {
        loading: true
      }
    },
    mounted () {
      this.bindPromise()
    },
    methods: {
      bindPromise () {
        this.loading = true
        this.promise.then(() => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    watch: {
      'promise' (promise) {
        if (promise) {
          this.bindPromise()
        }
      }
    }
  }
</script>
