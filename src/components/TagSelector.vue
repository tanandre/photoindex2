<template>
  <MdList>
    <MdListItem class="md-dense" v-for="tagGroup in tagGroups" :key="tagGroup.id" v-if="suppress ? suppress.indexOf(tagGroup.name) : true">
      <MdIcon>{{getTagGroupIcon(tagGroup.name)}}</MdIcon>
      <MdField class="field">
        <label for="tags">{{tagGroup.name}}</label>
        <MdSelect v-model="selectedTags" name="tags" id="tags" md-dense multiple>
          <MdOption v-for="tag in tagGroup.tags" :key="tag.name" :value="tag.name">{{tag.name}}</MdOption>
        </MdSelect>
      </MdField>
    </MdListItem>
  </MdList>
</template>

<script>
  import util from '../js/util'

  const iconMap = {
    'Location': 'location_on',
    'Group': 'group',
    'Person': 'person',
    'Camera': 'photo_camera',
    'Date': 'event'
  }

  export default {
    dependencies: ['dataRetriever'],
    props: ['value', 'suppress'],
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
    },
    methods: {
      getTagGroupIcon (groupName) {
        const icon = iconMap[groupName]
        return icon || 'local_offer'
      }
    }
  }
</script>

<style scoped>
  .field,
  .md-field {
    margin: 0;
  }
</style>
