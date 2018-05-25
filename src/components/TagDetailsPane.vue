<template>
  <div class="tagDetailsPane chips">
    <md-chip v-for="tag in tags" :key="tag.name" md-clickable @click="onClickTag(tag)">{{tag.name}}
    </md-chip>
  </div>
</template>

<script>
  import util from '../js/util'

  export default {
    props: ['photo'],
    data () {
      return {
        tags: []
      }
    },
    methods: {
      onClickTag (tag) {
        this.$store.state.service.navigator.setTags(util.tagsToHashObject([tag.name]), this.$route)
        this.$store.state.service.navigator.clearPhoto()
      },
      loadTags () {
        this.tags = []
        this.$store.state.service.dataRetriever.retrieveTags(this.photo).then(data => {
          this.status = 'completed'
          this.tags = data.body
        }, () => {
          this.status = 'error'
          this.isDone = true
        }, () => {
          this.status = 'loading'
        })
      }
    },
    mounted () {
      this.loadTags()
    },
    watch: {
      'photo' () {
        if (!this.photo) {
          this.tags = []
          return
        }
        this.loadTags()
      }
    }
  }
</script>

<style scoped>
</style>
