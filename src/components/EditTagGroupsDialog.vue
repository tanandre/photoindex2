<template>
  <md-dialog md-active md-close-on-esc v-if="showEditTagGroups">
    <md-dialog-title>
      <span>Add Tags and Groups</span></md-dialog-title>
    <MdContent class="dialogContent">
      <div class="item">
        <md-field md-clearable>
          <MdIcon>local_offer</MdIcon>
          <md-input class="searchInput" v-model="tagName" placeholder="Tag name..."
                    v-on:keyup.enter="addTag"
                    autofocus></md-input>
        </md-field>
        <MdChip class="md-primary" md-deletable v-for="tag in newTags" :key="tag" md-clickable
                @click="removeTag(tag)">{{tag}}
        </MdChip>
        <MdAutocomplete v-model="tagGroup" :md-options="tagGroups">
          <label>Group</label>
          <template slot="md-autocomplete-item" slot-scope="{ item, term }">
            <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
          </template>
          <template slot="md-autocomplete-empty" slot-scope="{ term }">
            Group not found, <a @click="createGroup(term)" class="action">Create {{term}}</a>
          </template>
        </MdAutocomplete>
      </div>
      <div v-if="response">{{response.rowCount}} tag(s) added</div>
      <PromiseAwareLoader :promise="promise" v-if="promise !== null"></PromiseAwareLoader>
    </MdContent>
    <md-dialog-actions>
      <md-button class="md-primary" @click="onClose" title="close dialog">Close</md-button>
      <md-button class="md-primary" @click="saveTags" title="update Tags"
                 :disabled="tagGroup === '' || newTags.length === 0">
        Add Tags ({{newTags.length}})
      </md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  import util from '../js/util'
  import PromiseAwareLoader from './PromiseAwareLoader.vue'

  export default {
    components: {PromiseAwareLoader},
    data () {
      return {
        response: null,
        tagName: '',
        tagGroup: '',
        promise: null,
        tagGroups: [],
        newTags: []
      }
    },
    computed: {
      selectedPhotos () {
        return this.$store.state.photo ? [this.$store.state.photo] : this.$store.state.selection.selectedPhotos
      },

      showEditTagGroups () {
        return this.$store.state.action.showEditTagGroups
      }
    },
    mounted () {
      this.loadTags()
    },
    methods: {
      loadTags () {
        this.$store.state.service.dataRetriever.retrieveTagGroups().then(data => {
          this.tagGroups = data
        })
      },
      createGroup (value) {
        this.$store.state.service.dataUpdater.addGroup(value).then(() => {
          this.loadTags()
        })
      },
      addTag (event) {
        event.target.select()
        if (this.tagName && !util.arrayContains(this.newTags, this.tagName)) {
          this.newTags.push(this.tagName)
        }
      },
      removeTag (tag) {
        util.removeFromArray(this.newTags, tag)
      },
      onClose () {
        this.$store.commit('showEditTagGroups', false)
      },
      saveTags () {
        this.response = null
        this.promise = this.$store.state.service.dataUpdater.addTags(this.tagGroup, this.newTags).then(resp => {
          this.response = resp.body
        }).catch(err => {
          console.error(err)
        })
      }
    },
    watch: {
      '$store.state.action.showEditTagGroups' () {
        this.newTags = []
        this.tagGroup = ''
        this.tagName = ''
        this.response = null
        this.promise = null
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

  .action {
    cursor: pointer;
  }

  .dialogContent {
    padding: 0 10px;
  }

  .item {
    padding: 10px;
  }

</style>
