<template>
  <div class="tagDetailsPane chips">
    <v-chip v-for="tag in tags" :key="tag.name" close @click="onClickTag(tag)">{{tag.name}}
    </v-chip>
  </div>
</template>

<script>
  import util from '@/js/util'

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
        this.navigator.setTags(util.tagsToHashObject([tag.name]), this.$route)
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
