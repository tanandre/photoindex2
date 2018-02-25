<template>
  <md-menu class="flex " md-size="medium" md-align-trigger>
    <md-button class="md-icon-button" md-menu-trigger>
      <md-icon>more_vert</md-icon>
    </md-button>
    <md-menu-content class="editMenu">
      <md-menu-item @click="onClickEditDates">
        <md-icon>event</md-icon>
        <span>Edit Dates</span>
      </md-menu-item>
      <md-menu-item @click="onClickEditTags">
        <md-icon>local_offer</md-icon>
        <span>Edit Tags</span>
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
      onClickEditDates () {
        this.$store.commit('showEditDate', true)
      },
      onClickEditTags () {
        this.$store.commit('showEditTags', true)
      }
    }
  }
</script>

<style scoped>
</style>
