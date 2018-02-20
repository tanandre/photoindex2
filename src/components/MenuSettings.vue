<template>
  <div>
    <md-toolbar class="md-transparent" md-elevation="0">
      <md-button class="md-icon-button" @click="onClose" title="close">
        <md-icon>arrow_back</md-icon>
      </md-button>
      <span class="md-title">Menu</span>
    </md-toolbar>
    <md-list>
      <md-list-item class="md-dense">
        <md-icon>perm_media</md-icon>
        <md-field>
          <label>Server URL:</label>
          <md-input @change="updateServerUrl" class="md-dense" v-model="serverUrl"></md-input>
        </md-field>
      </md-list-item>
      <md-list-item class="md-dense">
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
  import util from '../js/util'

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
    computed: {
      selectedTags: {
        get () {
          return util.tagsToArray(this.$route.query.q)
        },
        set (values) {
          this.navigator.setDateTags(this.$route.query.d, util.tagsToHashObject(values))
        }
      }
    },
    mounted () {
      Vue.http.get(this.urlHelper.getAllTags()).then(data => {
        this.stats.tags = data.body
      })
    },
    methods: {
      onClose () {
        this.$emit('close')
      },
      updateServerUrl () {
        this.$store.commit('serverUrl', this.serverUrl)
        localStorage.setItem('serverUrl', this.serverUrl)
      }
    },
    watch: {
    }
  }
</script>

<style scoped>
</style>
