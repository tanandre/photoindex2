<template>
  <div>
    <md-toolbar class="md-transparent md-dense" md-elevation="0">
      <md-button class="md-icon-button" @click="onClose" title="close">
        <md-icon>arrow_back</md-icon>
      </md-button>
      <span class="md-title">Menu</span>
    </md-toolbar>
    <MdCard>
      <MdList>
        <MdListItem class="md-dense">
          <MdSwitch v-model="showHUD">HUD display</MdSwitch>
        </MdListItem>
      </MdList>
      <MdList>
        <MdListItem class="md-dense">
          <MdIcon>star</MdIcon>
          <MdField>
            <label for="rating">Rating</label>
            <MdSelect v-model="selectedRating" name="rating" id="rating">
              <MdOption v-for="idx in 5" :key="idx" :value="idx">{{idx}}</MdOption>
            </MdSelect>
          </MdField>
        </MdListItem>
      </MdList>
    </MdCard>
    <MdCard>
      <TagSelector v-model="selectedTags"></TagSelector>
    </MdCard>
    <MdCard>
      <MdButton @click="showEditTagGroups()" class="md-raised">
        <md-icon>settings</md-icon>
        Manage Tags
      </MdButton>
    </MdCard>
  </div>
</template>

<script>
  import util from '../js/util'
  import TagSelector from './TagSelector.vue'

  export default {
    components: {
      TagSelector
    },
    props: ['showMenu'],
    data () {
      return {
        selectedRating: this.$route.query.r ? Number(this.$route.query.r) : 1
      }
    },
    computed: {
      showHUD: {
        get () {
          return this.$store.state.action.showHUD
        },
        set (value) {
          this.$store.commit('showHUD', value)
        }
      },
      selectedTags: {
        get () {
          return util.tagsToArray(this.$route.query.q)
        },
        set (values) {
          let tags = util.tagsToHashObject(values)
          if (tags !== this.$route.query.q) {
            this.$store.state.service.navigator.setTags(tags, this.$route)
          }
        }
      }
    },
    methods: {
      onClose () {
        this.$emit('close')
      },
      showEditTagGroups () {
        this.$store.commit('showEditTagGroups', true)
      }
    },
    watch: {
      'selectedRating' (selectedRating) {
        this.$store.state.service.navigator.setRating(selectedRating, this.$route)
      }
    }
  }
</script>

<style scoped>
</style>
