<template>
  <md-menu class="flex " md-size="medium" md-align-trigger>
    <md-button class="md-icon-button" md-menu-trigger>
      <md-icon>more_vert</md-icon>
    </md-button>
    <md-menu-content class="editMenu">
      <md-menu-item @click="showEditDialog('showEditDate')">
        <md-icon>event</md-icon>
        <span>Edit Dates</span>
      </md-menu-item>
      <md-menu-item @click="showEditDialog('showEditTags')">
        <md-icon>local_offer</md-icon>
        <span>Edit Tags</span>
      </md-menu-item>
      <md-menu-item @click="showEditDialog('showEditRating')">
        <md-icon>star</md-icon>
        <span>Edit Rating</span>
      </md-menu-item>
      <md-menu-item>
        <md-icon>favorite</md-icon>
        <span>Favorite</span>
      </md-menu-item>
      <md-menu-item>
        <md-icon>archive</md-icon>
        <span>Archive</span>
      </md-menu-item>
      <md-divider></md-divider>
      <md-menu-item>
        <md-icon>delete</md-icon>
        <span>Delete</span>
      </md-menu-item>
    </md-menu-content>
  </md-menu>
</template>

<script>
  export default {
    methods: {
      showEditDialog (value) {
        this.$store.commit(value, true)
      }
    }
  }
</script>

<style scoped>
</style>
