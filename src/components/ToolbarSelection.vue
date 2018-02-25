<template>
  <div class="flexFlow">
    <md-button class="flex md-icon-button" @click="selectedPhotos = []">
      <md-icon>clear</md-icon>
    </md-button>
    <h2 class="flex  md-title">{{selectedPhotos.length}} selected</h2>
    <ActionMenu></ActionMenu>
  </div>
</template>

<script>
  import ActionMenu from './ActionMenu.vue'

  export default {
    components: {
      ActionMenu
    },
    computed: {
      selectedPhotos: {
        get () {
          return this.$store.state.selection.selectedPhotos
        },
        set (value) {
          this.$store.commit('selectedPhotos', value)
        }
      }
    }
  }
</script>

<style scoped>
  .flexFlow {
    flex-flow: row wrap;
    display: flex;
  }

  h2 {
    line-height: 40px;
  }

  .flex {
    /*flex: 1;*/
    vertical-align: middle;
  }
</style>
