<template>
  <md-progress-bar class="loadingBar" md-mode="indeterminate" v-if="loading"></md-progress-bar>
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
