<template>
  <v-dialog v-model="showEditTags" max-width="500">
<v-card>
  <v-card-title>
      <span>Edit Tags</span>
      </v-card-title>
    <v-card-text v-if="selectedPhotos.length == 0" class="dialogContent">
      <div>No photos selected</div>
    </v-card-text>
    <v-card-text v-if="selectedPhotos.length > 0" class="dialogContent">
      <TagSelector v-model="toAddTags" :suppress="suppressTagGroups"></TagSelector>
      <div class="item">
        <v-chip v-for="tag in currentTags" :key="tag.name">{{tag.name}}
        </v-chip>
        <v-chip class="primary" close v-for="tag in toAddTags" :key="tag"
                @click="removeAddedTag(tag)">{{tag}}
        </v-chip>
      </div>
      <div v-if="response">{{response.rowCount}} photos updated</div>
      <v-progress-linear v-if="loading" class="loadingBar" :indeterminate="true"></v-progress-linear>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="onClose" title="close dialog">Close (esc)</v-btn>
      <v-btn class="primary" @click="saveTags" title="update images with tags">
        Update ({{selectedPhotos.length}})
      </v-btn>
    </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import util from '../js/util'
  import TagSelector from './TagSelector.vue'

  export default {
    dependencies: ['dataRetriever', 'dataUpdater'],

    components: {
      TagSelector
    },
    data () {
      return {
        loading: false,
        response: null,
        currentTags: [],
        toAddTags: [],
        suppressTagGroups: ['Camera', 'Date']
      }
    },
    computed: {
      selectedPhotos () {
        return this.$store.state.photo ? [this.$store.state.photo] : this.$store.state.selection.selectedPhotos
      },

      showEditTags () {
        return this.$store.state.action.showEditTags
      }
    },
    methods: {
      onClose () {
        this.$store.commit('showEditTags', false)
      },
      removeAddedTag (tag) {
        util.removeFromArray(this.toAddTags, tag)
      },
      saveTags () {
        this.loading = true
        this.dataRetriever.retrieveAllTags().then(data => {
          let tags = data.body
          let tagIds = this.toAddTags.map(tagname => tags.find(tag => tag.name === tagname)).map(tag => tag.id)
          this.dataUpdater.editPhotosTags(this.selectedPhotos.map(p => p.id), tagIds).then(resp => {
            this.loading = false
            this.response = resp.body
          }).catch(this.errorHandler.handle)
        })
      },
      loadTags () {
        if (this.selectedPhotos.length === 0) {
          return
        }

        this.currentTags = []
        this.dataRetriever.retrieveTags(this.selectedPhotos[0]).then(data => {
          this.currentTags = data.body
        })
      }
    },
    watch: {
      '$store.state.action.showEditTags' (showEditTags) {
        this.currentTags = []
        this.toAddTags = []
        this.response = null
        if (showEditTags) {
          this.loadTags()
        }
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
