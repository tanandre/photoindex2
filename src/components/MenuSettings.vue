<template>
  <div>
    <v-list dense>
      <v-list-tile>
        <v-switch v-model="showHUD" label="HUD display"></v-switch>
      </v-list-tile>
    </v-list>
    <v-list dense>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>star</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-combobox v-model="selectedRating" :items="[1,2,3,4,5]" placeholder="Rating">
          </v-combobox>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <div>
      <TagSelector v-model="selectedTags"></TagSelector>
    </div>
    <div>
      <v-btn @click="showEditTagGroups()">
        <v-icon>settings</v-icon>
        <span>Manage Tags</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
  import util from '../js/util'
  import TagSelector from './TagSelector.vue'

  export default {
    dependencies: ['urlHelper', 'navigator', 'dataRetriever'],
    components: {
      TagSelector
    },
    props: ['showMenu'],
    data() {
      return {
        selectedRating: this.$route.query.r ? Number(this.$route.query.r) : 1
      }
    },
    computed: {
      showHUD: {
        get() {
          return this.$store.state.action.showHUD
        },
        set(value) {
          this.$store.commit('showHUD', value)
        }
      },
      selectedTags: {
        get() {
          return util.tagsToArray(this.$route.query.q)
        },
        set(values) {
          let tags = util.tagsToHashObject(values)
          if (tags !== this.$route.query.q) {
            this.navigator.setTags(tags, this.$route)
          }
        }
      }
    },
    methods: {
      onClose() {
        this.$emit('close')
      },
      showEditTagGroups() {
        this.$store.commit('showEditTagGroups', true)
      }
    },
    watch: {
      'selectedRating'(selectedRating) {
        this.navigator.setRating(selectedRating, this.$route)
      }
    }
  }
</script>

<style scoped>
</style>
