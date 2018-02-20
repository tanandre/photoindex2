<template>
  <md-dialog md-active>
    <md-dialog-title>Change date & time ({{selectedPhotos.length}})</md-dialog-title>
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
      <md-button class="md-primary" @click="onClose">Close</md-button>
      <md-button class="md-primary" @click="saveDate">Save</md-button>
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
        response: null,
        date: this.$store.state.selectedPhotos[0].date.substring(0, 10),
        time: this.$store.state.selectedPhotos[0].date.substring(11)
      }
    },
    computed: {
      selectedPhotos () {
        return this.$store.state.selectedPhotos
      }
    },
    methods: {
      onClose () {
        this.$emit('close')
      },
      saveDate () {
        this.loading = true
        let ids = this.$store.state.selectedPhotos.map(p => p.id)
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
    border: none;
    background-color: transparent;
    color: inherit;
    font-family: inherit;
  }

  .dialogContent {
    padding: 0 10px;
  }

  .item {
    padding: 10px;
  }
</style>
