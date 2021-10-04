<template>
  <v-menu offset-y>
    <v-btn flat fab small slot="activator">
      <v-icon>more_vert</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile @click="showEditDialog('showEditDate')">
        <v-list-tile-action>
          <v-icon>event</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <span>Edit Dates</span>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="showEditDialog('showEditTags')">
        <v-list-tile-action>
          <v-icon>local_offer</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <span>Edit Tags</span>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="showEditDialog('showEditRating')">
        <v-list-tile-action>
          <v-icon>star</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <span>Edit Rating</span>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="updatePhotosRating(6)">
        <v-list-tile-action>
          <v-icon>favorite</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <span>Favorite</span>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="updatePhotosRating(0)">
        <v-list-tile-action>
          <v-icon>archive</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <span>Archive</span>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>delete</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <span>Delete</span>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
  import RetrieveListingAction from '@/js/action/RetrieveListingAction'

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

          new RetrieveListingAction(this.$store).execute(this.$route).then(() => {
            this.$store.commit('selectedPhotos', [])
          })
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
