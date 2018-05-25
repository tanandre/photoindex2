<template>
  <div class="chipsContainer">
    <MdChip md-deletable v-for="tag in dateTags" v-on:click="onCloseTag(tag)" :key="tag">{{tag}}
    </MdChip>
    <MdChip md-deletable v-for="tag in tags" v-on:click="onCloseTag(tag)" :key="tag">{{tag}}
    </MdChip>
  </div>
</template>

<script>
  import util from '../js/util'

  export default {
    computed: {
      tags () {
        return util.tagsToArray(this.$route.query.q)
      },
      dateTags () {
        return util.tagsToArray(this.$route.query.d)
      }
    },
    methods: {
      onCloseTag (tag) {
        if (util.isDate(tag)) {
          this.removeDateTag(tag)
        } else {
          this.removeTag(tag)
        }
      },
      removeTag (tag) {
        let found = this.tags.indexOf(tag)
        if (found > -1) {
          this.tags.splice(found, 1)
          this.setTags(this.tags)
        }
      },
      removeDateTag (tag) {
        let foundD = this.dateTags.indexOf(tag)
        if (foundD > -1) {
          this.dateTags.splice(foundD, 1)
          this.setDateTags(this.dateTags)
        }
      },

      setTags (tags) {
        this.$store.state.service.navigator.setTags(util.tagsToHashObject(tags), this.$route)
      },

      setDateTags (dateTags) {
        this.$store.state.service.navigator.setDates(util.tagsToHashObject(dateTags), this.$route)
      }
    }
  }
</script>

<style scoped>
  .chipsContainer {
    display: inline-block;
  }

</style>
