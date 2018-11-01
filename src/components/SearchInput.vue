<template>
  <div>
    <div class="inputTag">
      <v-text-field v-model="searchTxt" placeholder="Search..." clearable prepend-icon="search" v-on:keyup.enter="onEnter" autofocus>
      </v-text-field>
    </div>
    <TagChips></TagChips>
  </div>
</template>

<script>
  import util from '../js/util'
  import TagChips from './TagChips.vue'

  export default {
    dependencies: ['navigator'],
    components: {
      TagChips
    },
    data() {
      return {
        searchTxt: ''
      }
    },
    methods: {
      onEnter() {
        if (this.searchTxt.startsWith('/')) {
          if (this.searchTxt === '/clear') {
            this.clearTags()
          }
        } else if (this.searchTxt !== '') {
          this.addTag(this.searchTxt)
        }
        this.searchTxt = ''
      },

      addTag(value) {
        if (util.isDate(value)) {
          let dateTags = util.tagsToArray(this.$route.query.d)
          this.setDateTags(dateTags.concat([value]))
        } else {
          let tags = util.tagsToArray(this.$route.query.q)
          this.setTags(tags.concat([value]))
        }
      },
      clearTags() {
        this.navigator.setBothTags(util.tagsToHashObject([]), util.tagsToHashObject([]), this.$route)
      },

      setTags(tags) {
        this.navigator.setTags(util.tagsToHashObject(tags), this.$route)
      },

      setDateTags(dateTags) {
        this.navigator.setDates(util.tagsToHashObject(dateTags), this.$route)
      }
    }
  }
</script>

<style scoped>
  .inputTag {
    display: inline-block;
  }
</style>
