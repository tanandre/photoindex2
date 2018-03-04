<template>
  <div>
    <md-toolbar class="md-transparent md-dense" md-elevation="0">
      <md-button class="md-icon-button" @click="onClose" title="close">
        <md-icon>arrow_back</md-icon>
      </md-button>
      <span class="md-title">Menu</span>
    </md-toolbar>
    <MdCard>
      <!--<MdSwitch v-model="isSortDesc">sort</MdSwitch>-->
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
    data () {
      return {
        isSortDesc: true,
        selectedRating: this.$route.query.r ? Number(this.$route.query.r) : 1
      }
    },
    computed: {
      selectedTags: {
        get () {
          return util.tagsToArray(this.$route.query.q)
        },
        set (values) {
          this.navigator.setTags(util.tagsToHashObject(values), this.$route)
        }
      }
    },
    methods: {
      onClose () {
        this.$emit('close')
      }
    },
    watch: {
      'selectedRating' (selectedRating) {
        this.navigator.setRating(selectedRating, this.$route)
      }
    }
  }
</script>

<style scoped>
</style>
