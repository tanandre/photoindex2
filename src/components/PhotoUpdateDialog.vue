<template>
  <md-dialog md-active>
    <md-dialog-title>Update date & time</md-dialog-title>
    <MdContent class="dialogContent">
      <div>Updating date and time of {{selectedPhotos.length}} photos</div>
      <md-list>
        <md-list-item>
          <MdIcon>event</MdIcon>
          <md-field>
            <input class="inputStyle" type="date" v-model="date"/>
          </md-field>
        </md-list-item>
        <md-list-item>
          <MdIcon>query_builder</MdIcon>
          <md-field>
            <input class="inputStyle" v-model="time"/>
          </md-field>
        </md-list-item>
      </md-list>

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
        let ids = this.$store.state.selectedPhotos.map(p => p.id)
        let datetime = (this.date.trim() + ' ' + this.time.trim())
        Vue.http.post(this.urlHelper.getPhotoUpdateUrl(), {
          date: datetime,
          id: ids
        }, {
          emulateJSON: true
        }).then(resp => {
          console.log('success', resp.body)
        }).catch(err => {
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
</style>
