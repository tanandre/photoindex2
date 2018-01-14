<template>
  <div>
    <md-toolbar class="md-transparent" md-elevation="0">
      <span class="md-title">Settings</span>
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
  </div>
</template>

<script>
  export default {
    props: ['showMenu'],
    data: () => {
      return {
        serverUrl: localStorage.getItem('serverUrl')
      }
    },
    methods: {
      storeSettings: function () {
        localStorage.setItem('serverUrl', this.serverUrl)
      }
    }
  }
</script>

<style scoped>
</style>
