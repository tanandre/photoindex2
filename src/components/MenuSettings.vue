<template>
  <div>
    <md-toolbar class="md-transparent" md-elevation="0">
      <md-button class="md-icon-button" @click="onClose" title="close">
        <md-icon>arrow_back</md-icon>
      </md-button>
      <span class="md-title">Menu</span>
    </md-toolbar>
    <md-list>
      <md-list-item>
        <md-icon>perm_media</md-icon>
        <md-field>
          <label>Server URL:</label>
          <md-input @change="updateServerUrl" v-model="serverUrl"></md-input>
        </md-field>
      </md-list-item>
      <md-list-item>
        <md-icon>photo_camera</md-icon>
        <md-field>
          <label for="tags">Device</label>
          <md-select v-model="selectedTags" name="tags" id="tags" multiple>
            <md-option v-for="tag in stats.tags" :key="tag.name" :value="tag.name">{{tag.name}}</md-option>
          </md-select>
        </md-field>
      </md-list-item>
    </md-list>
    <md-card>
      <span>Photo count: {{stats.photo[0].photoCount}}</span>
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
        selectedTags: [],
        stats: {
          photo: [{
            photoCount: 0
          }],
          tags: []
        },
        serverUrl: localStorage.getItem('serverUrl')
      }
    },
    mounted () {
      Vue.http.get(this.urlHelper.getStats()).then(data => {
        this.stats = data.body
      })
    },
    methods: {
      onClose () {
        this.$emit('close')
      },
      onClickTag (tag) {
        this.navigator.setTags(this.navigator.tagsToHashObject([tag.name]))
      },

      updateServerUrl () {
        this.$store.commit('serverUrl', this.serverUrl)
        localStorage.setItem('serverUrl', this.serverUrl)
      }
    },
    watch: {
      'selectedTags' () {
        this.navigator.setTags(this.navigator.tagsToHashObject(this.selectedTags))
      }
    }
  }
</script>

<style scoped>
</style>
