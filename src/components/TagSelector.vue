<template>
  <MdList>
    <MdListItem class="md-dense" v-for="tagGroup in tagGroups" :key="tagGroup.id">
      <MdIcon>local_offer</MdIcon>
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
  export default {
    dependencies: ['dataRetriever'],
    props: ['value'],
    data () {
      return {
        tagGroups: []
      }
    },
    mounted () {
      this.dataRetriever.retrieveAllTags().then(data => {
        console.log('data tagg', data)
        this.tagGroups = data
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
