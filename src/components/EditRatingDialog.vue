<template>
  <md-dialog md-active md-close-on-esc v-if="showEditRating">
    <md-dialog-title>Edit rating</md-dialog-title>
    <MdContent class="dialogContent">
      <MdButton class="md-icon-button" v-for='idx in 5' :key="idx" @click="rating = idx" :title="'rate ' + idx">
        <MdIcon v-if="idx <= rating">star</MdIcon>
        <MdIcon v-if="idx > rating">star_border</MdIcon>
      </MdButton>
      <MdIcon>favorite</MdIcon>
      <div v-if="response">{{response.rowCount}} photos updated</div>
      <md-progress-bar class="loadingBar" md-mode="indeterminate" v-if="loading"></md-progress-bar>
    </MdContent>
    <md-dialog-actions>
      <md-button class="md-primary" @click="onClose" title="close dialog">Close</md-button>
      <md-button class="md-primary" @click="saveRating" title="update images with date">
        Update ({{selectedPhotos.length}})
      </md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  export default {
    dependencies: ['dataUpdater'],
    data () {
      return {
        loading: false,
        response: null,
        rating: 0
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
      onClose () {
        this.$store.commit('showEditRating', false)
      },
      saveRating () {
        this.response = null
        this.loading = true
        let ids = this.selectedPhotos.map(p => p.id)
        return this.dataUpdater.updatePhotosRating(ids, this.rating).then(resp => {
          this.loading = false
          this.response = resp.body
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
