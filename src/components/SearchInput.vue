<template>
  <div>
    <div class="inputTag">
      <md-field>
        <md-input class="searchInput" v-model="searchTxt" placeholder="Search..."
                  v-on:keyup.enter="onEnter" autofocus></md-input>
      </md-field>
    </div>
    <md-chip md-deletable v-for="tag in tags" v-on:click="onCloseTag(tag)" :key="tag">{{tag}}
    </md-chip>
  </div>
</template>

<script>
  export default {
    dependencies: ['navigator'],
    data () {
      return {
        searchTxt: ''
      }
    },
    computed: {
      tags () {
        return this.navigator.tagsToArray(this.$route.query.q)
      }
    },
    methods: {
      onEnter () {
        if (this.searchTxt.startsWith('/')) {
          if (this.searchTxt === '/clear') {
            this.clearTags()
          }
        } else if (this.searchTxt !== '') {
          this.addTag(this.searchTxt)
        }
        this.searchTxt = ''
      },

      onCloseTag (tag) {
        this.removeTag(tag)
      },
      addTag (value) {
        this.setTags(this.tags.concat([value]))
      },
      removeTag (tag) {
        let found = this.tags.indexOf(tag)
        if (found > -1) {
          this.tags.splice(found, 1)
          this.setTags(this.tags)
        }
      },
      clearTags () {
        this.setTags([])
      },
      setTags (tags) {
        this.navigator.setTags(this.navigator.tagsToHashObject(tags))
      }
    }
  }
</script>

<style scoped>
  .inputTag {
    display: inline-block;
  }

</style>
