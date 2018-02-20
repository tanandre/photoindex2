<template>
  <md-dialog md-active v-if="showEditDate">
    <md-dialog-title>Change date & time</md-dialog-title>
    <MdContent class="dialogContent">
      <div class="item">
        <MdIcon>event</MdIcon>
        <input class="inputStyle" type="date" v-model="date"/>
      </div>
      <div class="item">
        <MdIcon>query_builder</MdIcon>
        <input class="inputStyle" v-model="time"/>
      </div>
      <div v-if="response">{{response.rowCount}} photos updated</div>
      <md-progress-bar class="loadingBar" md-mode="indeterminate" v-if="loading"></md-progress-bar>
    </MdContent>
    <md-dialog-actions>
      <md-button class="md-primary" @click="onClose" title="close dialog">Close</md-button>
      <md-button class="md-primary" @click="saveDate" title="update images with date">
        Update ({{selectedPhotos.length}})
      </md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  import Vue from 'vue'

  export default {
    dependencies: ['urlHelper'],
    data () {
      return {
        loading: false,
        response: null
      }
    },
    computed: {
      date () {
        return this.selectedPhotos.length === 0 ? '' : this.selectedPhotos[0].date.substring(0, 10)
      },

      time () {
        return this.selectedPhotos.length === 0 ? '' : this.selectedPhotos[0].date.substring(11)
      },

      selectedPhotos () {
        return this.$store.state.selection.selectedPhotos
      },

      showEditDate () {
        return this.$store.state.action.showEditDate
      }
    },
    methods: {
      onClose () {
        this.$store.commit('showEditDate', false)
      },
      saveDate () {
        this.loading = true
        let ids = this.selectedPhotos.map(p => p.id)
        let datetime = (this.date.trim() + ' ' + this.time.trim())
        Vue.http.post(this.urlHelper.getPhotoUpdateUrl(), {
          date: datetime,
          id: ids
        }, {
          emulateJSON: true
        }).then(resp => {
          this.loading = false
          this.response = resp.body
          console.log('success', resp.body)
        }).catch(err => {
          this.loading = false
          console.error('error', err)
        })
      }
    }
  }
</script>

<style scoped>
  .inputStyle {
    font-size: 1.2em;
    border: none;
    background-color: transparent;
    color: inherit;
    font-family: inherit;
    background-color: #555;
    padding: 5px 10px;
    margin: 0 10px;
    width: 80%;
  }

  .dialogContent {
    padding: 0 10px;
  }

  .item {
    padding: 10px;
  }
</style>
