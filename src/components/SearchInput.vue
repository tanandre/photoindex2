<template>
  <div class="searchInput">
    <div class="inputTag">
      <md-field>
        <md-input class="searchInput" v-model="searchTxt" placeholder="Search..."
                  @keydown="onKeyDown" v-on:keyup.enter="onEnter" autofocus></md-input>
      </md-field>
    </div>
    <div class="selectedTags">
      <md-chip md-deletable v-for="tag in tags" v-on:click="onCloseTag(tag)" :key="tag">{{tag}}
      </md-chip>
    </div>
  </div>
</template>

<script>
  export default {
    dependencies: ['navigator'],
    data: function () {
      let tags = this.$route.query.q
      return {
        searchTxt: '',
        tags: tags ? tags.split(',') : []
      }
    },
    methods: {
      onKeyDown: function (event) {
        event.stopPropagation()
      },
      onEnter: function () {
        if (this.searchTxt !== '') {
          this.addTag(this.searchTxt)
          this.searchTxt = ''
        }
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
      }
    },

    watch: {
      tags: function () {
        this.navigator.setTags(this.tags.join(','))
      }
    }
  }
</script>

<style scoped>
  .searchInput {
    white-space: nowrap;
    width: 300px;
  }

  .inputTag {
    width: 200px;
  }

  .selectedTags {
    display: inline-block;
    float: left;
  }

</style>
