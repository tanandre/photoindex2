<template>
  <div class="flexFlow">
    <v-btn fab small flat @click="selectedPhotos = []">
      <v-icon>clear</v-icon>
    </v-btn>
    <div class="flex">{{selectedPhotos.length}} selected</div>
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
