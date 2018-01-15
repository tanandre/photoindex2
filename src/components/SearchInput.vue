<template>
  <div>
    <div class="inputTag">
      <md-field>
        <md-input class="searchInput" v-model="searchTxt" placeholder="Search..."
                  @keydown="onKeyDown" v-on:keyup.enter="onEnter" autofocus></md-input>
      </md-field>
    </div>
    <md-chip md-deletable v-for="tag in tags" v-on:click="onCloseTag(tag)" :key="tag">{{tag}}
    </md-chip>
  </div>
</template>

<script>
  export default {
    dependencies: ['navigator'],
    data: function () {
      return {
        searchTxt: '',
        tags: this.navigator.tagsToArray(this.$route.query.q)
      }
    },
    methods: {
      onKeyDown: function (event) {
        event.stopPropagation()
      },
      onEnter: function () {
        if (this.searchTxt.startsWith('/')) {
          if (this.searchTxt === '/clear') {
            this.clearTags()
          }
        } else if (this.searchTxt !== '') {
          this.addTag(this.searchTxt)
        }
        this.searchTxt = ''
      },

      onCloseTag: function (tag) {
        this.removeTag(tag)
      },

      addTag: function (value) {
        let found = this.tags.indexOf(value)
        if (found === -1) {
          this.tags.push(value)
        }
      },

      removeTag: function (tag) {
        let found = this.tags.indexOf(tag)
        if (found > -1) {
          this.tags.splice(found, 1)
        }
      },

      clearTags: function () {
        this.tags = []
      }

    },

    watch: {
      tags: function () {
        this.navigator.setTags(this.navigator.tagsToHashObject(this.tags))
      }
    }
  }
</script>

<style scoped>
  .inputTag {
    display: inline-block;
  }

  .selectedTags {
    vertical-align: middle;
    display: inline-block;
  }

</style>
