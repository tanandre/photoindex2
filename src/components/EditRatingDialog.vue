<template>
  <md-dialog md-active md-close-on-esc v-if="showEditRating">
    <md-dialog-title>Edit rating</md-dialog-title>
    <MdContent class="dialogContent">
      <RatingInput v-model="rating"></RatingInput>
      <div v-if="response">{{response.rowCount}} photos updated</div>
      <md-progress-bar class="loadingBar" md-mode="indeterminate" v-if="loading"></md-progress-bar>
    </MdContent>
    <md-dialog-actions>
      <md-button class="md-primary" @click="close" title="close dialog">Close</md-button>
      <md-button class="md-primary" @click="saveRating" title="update images with date">
        Update ({{selectedPhotos.length}})
      </md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  import RatingInput from './RatingInput.vue'
  import RetrieveListingAction from '../js/action/RetrieveListingAction'

  export default {
    dependencies: ['dataUpdater'],
    components: {
      RatingInput
    },
    data () {
      return {
        loading: false,
        response: null,
        rating: 1
      }
    },
    computed: {
      selectedPhotos () {
        return this.$store.state.photo ? [this.$store.state.photo] : this.$store.state.selection.selectedPhotos
      },

      showEditRating () {
        return this.$store.state.action.showEditRating
      }
    },
    methods: {
      close () {
        this.$store.commit('showEditRating', false)
      },
      saveRating () {
        this.response = null
        this.loading = true
        let ids = this.selectedPhotos.map(p => p.id)
        return this.dataUpdater.updatePhotosRating(ids, this.rating).then(resp => {
          this.loading = false
          this.response = resp.body
          new RetrieveListingAction(this.$store).execute(this.$route).then(() => {
            this.$store.commit('selectedPhotos', [])
            this.close()
          })
        }).catch(err => {
          this.loading = false
          console.error(err)
        })
      }
    },
    watch: {
      '$store.state.action.showEditRating' () {
        this.response = null
        this.loading = false
        this.rating = 0
      }
    }
  }
</script>

<style scoped>
</style>
