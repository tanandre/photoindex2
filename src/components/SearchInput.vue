<template>
  <div>
    <div class="inputTag">
      <md-field>
        <md-input class="searchInput" v-model="searchTxt" placeholder="Search..."
                  v-on:keyup.enter="onEnter" autofocus></md-input>
      </md-field>
    </div>
    <md-chip md-deletable v-for="tag in dateTags" v-on:click="onCloseTag(tag)" :key="tag">{{tag}}
    </md-chip>
    <md-chip md-deletable v-for="tag in tags" v-on:click="onCloseTag(tag)" :key="tag">{{tag}}
    </md-chip>
  </div>
</template>

<script>
  import util from '../js/util'

  export default {
    dependencies: ['navigator'],
    data () {
      return {
        searchTxt: ''
      }
    },
    computed: {
      tags () {
        return util.tagsToArray(this.$route.query.q)
      },
      dateTags () {
        return util.tagsToArray(this.$route.query.d)
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
        if (util.isDate(tag)) {
          this.removeDateTag(tag)
        } else {
          this.removeTag(tag)
        }
      },
      addTag (value) {
        if (util.isDate(value)) {
          this.setDateTags(this.dateTags.concat([value]))
        } else {
          this.setTags(this.tags.concat([value]))
        }
      },
      removeTag (tag) {
        let found = this.tags.indexOf(tag)
        if (found > -1) {
          this.tags.splice(found, 1)
          this.setTags(this.tags)
        }
      },
      removeDateTag (tag) {
        let foundD = this.dateTags.indexOf(tag)
        if (foundD > -1) {
          this.dateTags.splice(foundD, 1)
          this.setDateTags(this.dateTags)
        }
      },
      clearTags () {
        this.setBothTags([], [])
      },
      setTags (tags) {
        this.setBothTags(tags, this.dateTags)
      },
      setDateTags (dateTags) {
        this.setBothTags(this.tags, dateTags)
      },
      setBothTags (tags, dateTags) {
        this.navigator.setDateTags(util.tagsToHashObject(dateTags), util.tagsToHashObject(tags))
      }
    }
  }
</script>

<style scoped>
  .inputTag {
    display: inline-block;
  }

</style>
