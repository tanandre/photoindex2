<template>
  <v-dialog v-model="showEditDate" max-width="500">
    <v-card>
      <v-card-title class="headline">Edit date &amp; time</v-card-title>
      <v-card-text>
        <v-chip v-for="date in suggestedDates" :key="date" @click="onClickSuggestedDate(date)">{{date}}
        </v-chip>
        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>event</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                <input class="inputStyle" type="date" v-model="date" />
              </v-list-tile-title>
              <v-list-tile-sub-title>
                <div>
                  <span class="originalValue">{{referenceDate}}</span>
                  <span class="offsetValue" v-if="isOffset"> ({{daysOffset}} days)</span>
                </div>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>query_builder</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <div class="v-list-tile-text">
                <input class="inputStyle" v-model="time" />
                <div>
                  <span class="originalValue">{{referenceTime}}</span>
                  <span class="offsetValue" v-if="isOffset"> ({{timeOffset}})</span>
                </div>
              </div>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-checkbox v-model="isOffset" class="offsetCheckbox" label="Update Offset">
        </v-checkbox>
        <div v-if="response">{{response.rowCount}} photos updated</div>
        <PromiseAwareLoader :promise="promise" v-if="promise !== null"></PromiseAwareLoader>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="onClose" title="close dialog">Close</v-btn>
        <v-btn color="primary" @click="save" title="update images with date">
          Update ({{selectedPhotos.length}})
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import dateUtil from '../js/DateUtil'
  import RetrieveListingAction from '../js/action/RetrieveListingAction'
  import PromiseAwareLoader from './PromiseAwareLoader.vue'

  export default {
    dependencies: ['dataUpdater'],
    components: {
      PromiseAwareLoader
    },
    data() {
      return {
        suggestedDates: [],
        response: null,
        promise: null,
        isOffset: false,
        date: '',
        time: ''
      }
    },
    computed: {
      referenceDate() {
        return this.selectedPhotos.length === 0 ? '' : this.selectedPhotos[0].date.substring(0, 10)
      },
      referenceTime() {
        return this.selectedPhotos.length === 0 ? '' : this.selectedPhotos[0].date.substring(11)
      },
      daysOffset() {
        let date1 = new Date(this.referenceDate)
        let date2 = new Date(this.date)
        let timeDiff = date2.getTime() - date1.getTime()
        return Math.ceil(timeDiff / (1000 * 3600 * 24))
      },
      timeOffset() {
        return '00:00'
      },
      selectedPhotos() {
        return this.$store.state.photo ? [this.$store.state.photo] : this.$store.state.selection.selectedPhotos
      },

      showEditDate() {
        return this.$store.state.action.showEditDate
      }
    },
    methods: {
      onClose() {
        this.$store.commit('showEditDate', false)
      },

      onClickSuggestedDate(date) {
        this.date = date
      },

      save() {
        this.response = null
        this.promise = this.isOffset ? this.saveDateOffset() : this.saveDate()
        this.promise.then(resp => {
          this.response = resp.body
          new RetrieveListingAction(this.$store).execute(this.$route)
        }).catch(err => {
          console.error(err)
        })
      },
      saveDate() {
        let ids = this.selectedPhotos.map(p => p.id)
        let datetime = (this.date.trim() + ' ' + this.time.trim())

        return this.dataUpdater.updatePhotoDate(ids, datetime)
      },
      saveDateOffset() {
        let ids = this.selectedPhotos.map(p => p.id)
        let offset = this.daysOffset + ' ' + this.timeOffset
        return this.dataUpdater.updatePhotoDateOffset(ids, offset)
      }
    },
    watch: {
      '$store.state.action.showEditDate'(showEditDate) {
        this.response = null
        this.promise = null
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
