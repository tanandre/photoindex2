<template>
  <div>
    <md-toolbar class="md-transparent md-dense" md-elevation="0">
      <md-button class="md-icon-button" @click="onClose" title="close">
        <md-icon>arrow_back</md-icon>
      </md-button>
      <span class="md-title">Menu</span>
    </md-toolbar>
    <MdCard>
      <MdSwitch v-model="isSortDesc">sort</MdSwitch>
      <md-list-item class="md-dense">
        <md-icon>star</md-icon>
        <md-field>
          <label for="rating">Rating</label>
          <md-select v-model="selectedRating" name="rating" id="rating">
            <md-option v-for="idx in 5" :key="idx" :value="idx">{{idx}}</md-option>
          </md-select>
        </md-field>
      </md-list-item>

    </MdCard>
    <MdCard>
      <TagSelector v-model="selectedTags"></TagSelector>
    </MdCard>
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
    data: () => {
      return {
        isSortDesc: true,
        selectedRating: 3
      }
    },
    computed: {
      selectedTags: {
        get () {
          return util.tagsToArray(this.$route.query.q)
        },
        set (values) {
          this.navigator.setTagsAndDates(util.tagsToHashObject(values), this.$route.query.d)
        }
      }
    },
    methods: {
      onClose () {
        this.$emit('close')
      },
      updateServerUrl () {
        this.$store.commit('serverUrl', this.serverUrl)
        localStorage.setItem('serverUrl', this.serverUrl)
      }
    }
  }
</script>

<style scoped>
</style>
