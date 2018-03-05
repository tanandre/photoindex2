<template>
  <MdList>
    <MdListItem class="md-dense" v-for="tagGroup in tagGroups" :key="tagGroup.id">
      <MdIcon>{{icon}}</MdIcon>
      <MdField>
        <label for="tags">{{tagGroup.name}}</label>
        <MdSelect v-model="selectedTags" name="tags" id="tags" multiple>
          <MdOption v-for="tag in tagGroup.tags" :key="tag.name" :value="tag.name">{{tag.name}}</MdOption>
        </MdSelect>
      </MdField>
    </MdListItem>
  </MdList>
</template>

<script>
  import util from '../js/util'

  export default {
    dependencies: ['dataRetriever'],
    props: ['value'],
    data () {
      return {
        tagGroups: [],
        icon: 'local_offer'
      }
    },
    mounted () {
      this.dataRetriever.retrieveAllTags().then(data => {
        this.tagGroups = util.mapTagsToGroups(data.body)
      })
    },
    computed: {
      selectedTags: {
        get () {
          return this.value
        },
        set (values) {
          this.$emit('input', values)
        }
      }
    }
  }
</script>

<style scoped>
</style>
