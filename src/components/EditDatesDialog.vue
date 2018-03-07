<template>
  <md-dialog md-active md-close-on-esc v-if="showEditDate">
    <md-dialog-title>Edit date & time</md-dialog-title>
    <MdContent class="dialogContent">
      <MdChip v-for="date in suggestedDates" :key="date" md-clickable @click="onClickSuggestedDate(date)">{{date}}
      </MdChip>
      <md-list class="md-double-line">
        <md-list-item>
          <MdIcon>event</MdIcon>
          <div class="md-list-item-text">
            <input class="inputStyle" type="date" v-model="date"/>
            <div>
              <span class="originalValue">{{referenceDate}}</span>
              <span class="offsetValue" v-if="isOffset"> ({{daysOffset}} days)</span>
            </div>
          </div>
        </md-list-item>
        <md-list-item>
          <MdIcon>query_builder</MdIcon>
          <div class="md-list-item-text">
            <input class="inputStyle" v-model="time"/>
            <div>
              <span class="originalValue">{{referenceTime}}</span>
              <span class="offsetValue" v-if="isOffset"> ({{timeOffset}})</span>
            </div>
          </div>
        </md-list-item>
      </md-list>
      <md-checkbox v-model="isOffset" class="offsetCheckbox md-primary">Update Offset
      </md-checkbox>
      <div v-if="response">{{response.rowCount}} photos updated</div>
      <md-progress-bar class="loadingBar" md-mode="indeterminate" v-if="loading"></md-progress-bar>
    </MdContent>
    <md-dialog-actions>
      <md-button class="md-primary" @click="onClose" title="close dialog">Close</md-button>
      <md-button class="md-primary" @click="save" title="update images with date">
        Update ({{selectedPhotos.length}})
      </md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  import dateUtil from '../js/DateUtil'
  import RetrieveListingAction from '../js/action/RetrieveListingAction'

  export default {
    dependencies: ['dataUpdater'],
    data () {
      return {
        suggestedDates: [],
        loading: false,
        response: null,
        isOffset: false,
        date: '',
        time: ''
      }
    },
    computed: {
      referenceDate () {
        return this.selectedPhotos.length === 0 ? '' : this.selectedPhotos[0].date.substring(0, 10)
      },
      referenceTime () {
        return this.selectedPhotos.length === 0 ? '' : this.selectedPhotos[0].date.substring(11)
      },
      daysOffset () {
        let date1 = new Date(this.referenceDate)
        let date2 = new Date(this.date)
        let timeDiff = date2.getTime() - date1.getTime()
        return Math.ceil(timeDiff / (1000 * 3600 * 24))
      },
      timeOffset () {
        return '00:00'
      },
      selectedPhotos () {
        return this.$store.state.photo ? [this.$store.state.photo] : this.$store.state.selection.selectedPhotos
      },

      showEditDate () {
        return this.$store.state.action.showEditDate
      }
    },
    methods: {
      onClose () {
        this.$store.commit('showEditDate', false)
      },

      onClickSuggestedDate (date) {
        this.date = date
      },

      save () {
        this.loading = true
        this.response = null
        let promise = this.isOffset ? this.saveDateOffset() : this.saveDate()
        promise.then(resp => {
          this.loading = false
          this.response = resp.body
          new RetrieveListingAction(this.$store).execute(this.$route)
        }).catch(err => {
          this.loading = false
          console.error(err)
        })
      },

      saveDate () {
        let ids = this.selectedPhotos.map(p => p.id)
        let datetime = (this.date.trim() + ' ' + this.time.trim())

        return this.dataUpdater.updatePhotoDate(ids, datetime)
      },
      saveDateOffset () {
        let ids = this.selectedPhotos.map(p => p.id)
        let offset = this.daysOffset + ' ' + this.timeOffset
        return this.dataUpdater.updatePhotoDateOffset(ids, offset)
      }
    },
    watch: {
      '$store.state.action.showEditDate' (showEditDate) {
        this.response = null
        this.isOffset = false
        let selectedPhotos = this.selectedPhotos
        this.date = selectedPhotos.length === 0 ? '' : selectedPhotos[0].date.substring(0, 10)
        this.time = selectedPhotos.length === 0 ? '' : selectedPhotos[0].date.substring(11)

        if (showEditDate && selectedPhotos.length > 0) {
          let suggestedDate = dateUtil.getDateTimeFromFileName(selectedPhotos[0].path)
          if (suggestedDate && suggestedDate !== this.date) {
            this.suggestedDates = [suggestedDate]
          }
        } else {
          this.suggestedDates = []
        }
      }
    }
  }
</script>

<style scoped>
  .inputStyle {
    margin: 0;
    font-size: 1.2em;
    border: none;
    background-color: transparent;
    color: inherit;
    font-family: inherit;
    background-color: #555;
    padding: 5px 10px;
  }

  .dialogContent {
    padding: 0 10px;
  }

  .offsetCheckbox {
    margin-left: 17px;
  }

  .originalValue {
    display: inline-block;
    width: auto;
  }

  .offsetValue {
    display: inline-block;
  }
</style>
