<template>
  <v-dialog v-model="showEditTagGroups" max-width="500">
    <v-card>
      <v-card-title>
        <span>Add Tags and Groups</span>
      </v-card-title>
      <v-card-text>
        <div class="item">
          <v-text-field clearable prepend-icon="local_offer" class="searchInput" v-model="tagName" placeholder="Tag name..." v-on:keyup.enter="addTag" autofocus></v-text-field>
          <v-chip class="primary" close v-for="tag in newTags" :key="tag" @click="removeTag(tag)">{{tag}}
          </v-chip>
          <v-autocomplete v-model="tagGroup" :items="tagGroups" label="Group">
          </v-autocomplete>
        </div>
        <div v-if="response">{{response.rowCount}} tag(s) added</div>
        <PromiseAwareLoader :promise="promise" v-if="promise !== null"></PromiseAwareLoader>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="onClose" title="close dialog">Close</v-btn>
        <v-btn class="primary" @click="saveTags" title="update Tags" :disabled="tagGroup === '' || newTags.length === 0">
          Add Tags ({{newTags.length}})
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import util from '../js/util'
  import PromiseAwareLoader from './PromiseAwareLoader.vue'

  export default {
    dependencies: ['dataRetriever', 'dataUpdater'],
    components: {
      PromiseAwareLoader
    },
    data() {
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
      selectedPhotos() {
        return this.$store.state.photo ? [this.$store.state.photo] : this.$store.state.selection.selectedPhotos
      },

      showEditTagGroups() {
        return this.$store.state.action.showEditTagGroups
      }
    },
    mounted() {
      this.loadTags()
    },
    methods: {
      loadTags() {
        this.dataRetriever.retrieveTagGroups().then(data => {
          this.tagGroups = data
        })
      },
      createGroup(value) {
        this.dataUpdater.addGroup(value).then(() => {
          this.loadTags()
        })
      },
      addTag(event) {
        event.target.select()
        if (this.tagName && !util.arrayContains(this.newTags, this.tagName)) {
          this.newTags.push(this.tagName)
        }
      },
      removeTag(tag) {
        util.removeFromArray(this.newTags, tag)
      },
      onClose() {
        this.$store.commit('showEditTagGroups', false)
      },
      saveTags() {
        this.response = null
        this.promise = this.dataUpdater.addTags(this.tagGroup, this.newTags).then(resp => {
          this.response = resp.body
        }).catch(err => {
          console.error(err)
        })
      }
    },
    watch: {
      '$store.state.action.showEditTagGroups'() {
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
