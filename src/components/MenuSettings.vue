<template>
  <div>
    <md-toolbar class="md-transparent" md-elevation="0">
      <md-button class="md-icon-button" @click="onClose" title="close">
        <md-icon>arrow_back</md-icon>
      </md-button>
      <span class="md-title">Menu</span>
    </md-toolbar>
    <MdCard>
      <MdSwitch v-model="isSortDesc">sort</MdSwitch>
    </MdCard>
    <MdCard>
      <md-list>
        <md-list-item class="md-dense" v-for="tagGroup in tagGroups" :key="tagGroup.group">
          <md-icon>local_offer</md-icon>
          <!--<md-icon>photo_camera</md-icon>-->
          <md-field>
            <label for="tags">{{tagGroup.group}}</label>
            <md-select v-model="selectedTags" name="tags" id="tags" multiple>
              <md-option v-for="tag in tagGroup.tags" :key="tag.name" :value="tag.name">{{tag.name}}</md-option>
            </md-select>
          </md-field>
        </md-list-item>
      </md-list>
    </MdCard>
  </div>
</template>

<script>
  import util from '../js/util'

  export default {
    dependencies: ['urlHelper', 'navigator', 'dataRetriever'],
    props: ['showMenu'],
    data: () => {
      return {
        tagGroups: [],
        isSortDesc: true
      }
    },
    computed: {
      selectedTags: {
        get () {
          return util.tagsToArray(this.$route.query.q)
        },
        set (values) {
          this.navigator.setDateTags(this.$route.query.d, util.tagsToHashObject(values))
        }
      }
    },
    mounted () {
      this.dataRetriever.retrieveAllTags().then(data => {
        let response = data.body
        let groups = response.map(tagItem => tagItem.groupName)
        let responseMap = util.removeDuplicates(groups).map(group => {
          return {
            'group': group,
            'tags': response.filter(tagItem => tagItem.groupName === group)
          }
        })
        console.log(responseMap)
        this.tagGroups = responseMap
      })
    },
    methods: {
      onClose () {
        this.$emit('close')
      },
      updateServerUrl () {
        this.$store.commit('serverUrl', this.serverUrl)
        localStorage.setItem('serverUrl', this.serverUrl)
      }
    },
    watch: {}
  }
</script>

<style scoped>
</style>
