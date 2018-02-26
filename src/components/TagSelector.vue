<template>
  <md-list>
    <md-list-item class="md-dense" v-for="tagGroup in tagGroups" :key="tagGroup.id">
      <md-icon>local_offer</md-icon>
      <md-field>
        <label for="tags">{{tagGroup.name}}</label>
        <md-select v-model="selectedTags" name="tags" id="tags" multiple>
          <md-option v-for="tag in tagGroup.tags" :key="tag.name" :value="tag.name">{{tag.name}}</md-option>
        </md-select>
      </md-field>
    </md-list-item>
  </md-list>
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
