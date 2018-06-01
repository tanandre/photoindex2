<template>
  <md-dialog md-active md-close-on-esc v-if="showEditRating">
    <md-dialog-title>Edit rating</md-dialog-title>
    <MdContent class="dialogContent">
      <RatingInput v-model="rating"></RatingInput>
      <div v-if="response">{{response.rowCount}} photos updated</div>
      <PromiseAwareLoader :promise="promise" v-if="promise !== null"></PromiseAwareLoader>
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
  import PromiseAwareLoader from './PromiseAwareLoader.vue'

  export default {
    dependencies: ['dataUpdater'],
    components: {
      RatingInput,
      PromiseAwareLoader
    },
    data () {
      return {
        promise: null,
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
        let ids = this.selectedPhotos.map(p => p.id)
        this.promise = this.dataUpdater.updatePhotosRating(ids, this.rating).then(resp => {
          this.response = resp.body
          new RetrieveListingAction(this.$store).execute(this.$route).then(() => {
            this.$store.commit('selectedPhotos', [])
          })
        }).catch(err => {
          console.error(err)
        })
      }
    },
    watch: {
      '$store.state.action.showEditRating' () {
        this.response = null
        this.promise = null
        this.rating = 0
      }
    }
  }
</script>

<style scoped>
</style>
