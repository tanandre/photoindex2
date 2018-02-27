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
      <md-menu-item @click="updatePhotosRating(6)">
        <md-icon>favorite</md-icon>
        <span>Favorite</span>
      </md-menu-item>
      <md-menu-item @click="updatePhotosRating(0)">
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
    dependencies: ['dataUpdater'],
    computed: {
      selectedPhotos () {
        return this.$store.state.photo ? [this.$store.state.photo] : this.$store.state.selection.selectedPhotos
      }
    },
    methods: {
      showEditDialog (value) {
        this.$store.commit(value, true)
      },
      updatePhotosRating (value) {
        this.$store.commit('loading', true)
        let ids = this.selectedPhotos.map(p => p.id)
        return this.dataUpdater.updatePhotosRating(ids, value).then(resp => {
          this.$store.commit('loading', false)
          this.response = resp.body
        }).catch(err => {
          this.$store.commit('loading', false)
          this.loading = false
          console.error(err)
        })
      }
    }
  }
</script>

<style scoped>
</style>
