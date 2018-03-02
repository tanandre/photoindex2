<template>
  <md-dialog md-active md-close-on-esc v-if="showEditTags">
    <md-dialog-title>
      <span>Edit Tags</span></md-dialog-title>
    <MdContent class="dialogContent">
      <TagSelector v-model="toAddTags"></TagSelector>
      <div class="item">
        <MdIcon>local_offer</MdIcon>
        <MdChip class="md-primary" md-deletable v-for="tag in currentTags" :key="tag.name" md-clickable
                @click="removeTag(tag)">{{tag.name}}
        </MdChip>

        <MdChip class="md-accent" md-deletable v-for="tag in toAddTags" :key="tag" md-clickable
                @click="removeAddedTag(tag)">{{tag}}
        </MdChip>
      </div>
      <div class="item">
        <MdIcon>remove_circle</MdIcon>
        <MdChip md-deletable v-for="tag in toRemoveTags" :key="tag.name" md-clickable @click="unremoveTag(tag)">
          {{tag.name}}
        </MdChip>
      </div>
      <div v-if="response">{{response.rowCount}} photos updated</div>
      <md-progress-bar class="loadingBar" md-mode="indeterminate" v-if="loading"></md-progress-bar>
    </MdContent>
    <md-dialog-actions>
      <md-button class="md-primary" @click="onClose" title="close dialog">Close</md-button>
      <md-button class="md-primary" @click="saveTags" title="update images with date">
        Update ({{selectedPhotos.length}})
      </md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  import util from '../js/util'
  import TagSelector from './TagSelector.vue'

  export default {
    dependencies: ['dataRetriever'],

    components: {
      TagSelector
    },
    data () {
      return {
        loading: false,
        response: null,
        currentTags: [],
        toRemoveTags: [],
        toAddTags: []
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
      removeTag (tag) {
        util.removeFromArray(this.currentTags, tag)
        this.toRemoveTags.push(tag)
      },
      unremoveTag (tag) {
        util.removeFromArray(this.toRemoveTags, tag)
        this.currentTags.push(tag)
      },
      saveTags () {

      },
      loadTags () {
        if (this.selectedPhotos.length === 0) {
          return
        }

        this.currentTags = []
        // TODO support for more photos
        this.dataRetriever.retrieveTags(this.selectedPhotos[0]).then(data => {
          this.currentTags = data.body
        })
      }

    },
    watch: {
      '$store.state.action.showEditTags' (showEditTags) {
        this.currentTags = []
        this.toRemoveTags = []
        if (showEditTags) {
          this.loadTags()
        } else {

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
