<template>
  <div>
    <md-toolbar class="md-transparent" md-elevation="0">
      <span class="md-title">Menu</span>
    </md-toolbar>
    <md-list>
      <md-list-item>
        <md-icon>perm_media</md-icon>
        <md-field>
          <label>Server URL:</label>
          <md-input v-model="serverUrl"></md-input>
        </md-field>
      </md-list-item>
    </md-list>
    <md-button class="md-raised md-primary" @click="storeSettings()">Save</md-button>
    <md-card>
      <span>Photo count: {{stats.photo[0].photoCount}}</span>
      <md-chip v-for="tag in stats.tags" :key="tag.name" md-clickable @click="onClickTag(tag)">{{tag.name}}</md-chip>
    </md-card>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    dependencies: ['urlHelper', 'navigator'],
    props: ['showMenu'],
    data: () => {
      return {
        stats: {
          photo: [{
            photoCount: 0
          }],
          tags: []
        },
        serverUrl: localStorage.getItem('serverUrl')
      }
    },
    mounted: function () {
      Vue.http.get(this.urlHelper.getStats()).then(data => {
        this.stats = data.body
      })
    },
    methods: {
      onClickTag: function (tag) {
        this.navigator.setTags(this.navigator.tagsToHashObject([tag.name]))
      },

      storeSettings: function () {
        localStorage.setItem('serverUrl', this.serverUrl)
      }
    }
  }
</script>

<style scoped>
</style>
