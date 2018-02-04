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
    data: function () {
      return {
        tags: []
      }
    },
    methods: {
      onClickTag: function (tag) {
        this.navigator.setTags(this.navigator.tagsToHashObject([tag]))
        this.navigator.clearPhoto()
      },
      loadTags: function () {
        this.tags = []

        this.dataRetriever.retrieveTags(this.photo).then(data => {
          this.status = 'completed'
          this.tags = data.body.tags
        }, (err) => {
          console.error(err)
          this.status = 'error'
          this.isDone = true
        }, () => {
          this.status = 'loading'
        })
      }
    },
    mounted: function () {
      this.loadTags()
    },
    watch: {
      'photo': function () {
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
