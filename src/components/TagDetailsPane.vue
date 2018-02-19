<template>
  <div class="tagDetailsPane chips">
    <md-chip v-for="tag in tags" :key="tag.name" md-clickable @click="onClickTag(tag)">{{tag.name}}
    </md-chip>
  </div>
</template>

<script>
  import util from '../js/util'

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
//        this.navigator.setTags(this.navigator.tagsToHashObject([tag.name]))

        this.navigator.setDateTags(this.$route.query.d, util.tagsToHashObject([tag.name]))
        this.navigator.clearPhoto()
      },
      loadTags () {
        this.tags = []

        this.dataRetriever.retrieveTags(this.photo).then(data => {
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
