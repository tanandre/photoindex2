<template>
  <v-list dense>
    <v-list-tile v-for="tagGroup in tagGroups" :key="tagGroup.id" v-if="suppress ? suppress.indexOf(tagGroup.name) : true">
      <v-list-tile-action>
        <v-icon>{{getTagGroupIcon(tagGroup.name)}}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content class="field">
        <v-autocomplete :return-object="false" multiple
                chips small-chips
                deletable-chips item-text="name" item-value="name" :placeholder="tagGroup.name" v-model="selectedTags" name="tags" id="tags" :items="tagGroup.tags">
        </v-autocomplete>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  import util from '@/js/util'

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
    data() {
      return {
        tagGroups: [],
        icon: 'local_offer'
      }
    },
    mounted() {
      this.dataRetriever.retrieveAllTags().then(data => {
        this.tagGroups = util.mapTagsToGroups(data.body)
      })
    },
    computed: {
      selectedTags: {
        get() {
          return this.value
        },
        set(values) {
          this.$emit('input', values)
        }
      }
    },
    methods: {
      getTagGroupIcon(groupName) {
        const icon = iconMap[groupName]
        return icon || 'local_offer'
      }
    }
  }
</script>

<style scoped>
  .field {
    margin: 0;
  }
</style>
