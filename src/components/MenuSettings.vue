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
        isSortDesc: true
      }
    },
    computed: {
      selectedTags: {
        get () {
          return util.tagsToArray(this.$route.query.q)
        },
        set (values) {
          this.navigator.setDateTags(this.$route.query.d, util.tagsToHashObject(values.map(t => t.name)))
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
