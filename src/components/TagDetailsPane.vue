<template>
  <div class="tagDetailsPane chips">
    <md-chip v-for="tag in tags" :key="tag" md-clickable @click="onClickTag(tag)">{{tag}}
    </md-chip>
  </div>
</template>

<script>
  export default {
    dependencies: ['navigator', 'dataRetriever'],
    props: ['photo'],
    data () {
      return {
        tags: []
      }
    },
    methods: {
      onClickTag (tag) {
        this.navigator.setTags(this.navigator.tagsToHashObject([tag]))
        this.navigator.clearPhoto()
      },
      loadTags () {
        this.tags = []

        this.dataRetriever.retrieveTags(this.photo).then(data => {
          this.status = 'completed'
          this.tags = data.body.tags
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
