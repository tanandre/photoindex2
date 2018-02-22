<template>
  <!--<div  v-if="selectedPhotos.length > 0">-->
  <div class="flexFlow">

    <md-button class="flex md-icon-button" @click="selectedPhotos = []">
      <md-icon>clear</md-icon>

    </md-button>
    <h2 class="flex  md-title">{{selectedPhotos.length}} selected</h2>
    <md-menu class="flex " md-size="medium" md-align-trigger>
      <md-button class="md-icon-button" md-menu-trigger>
        <md-icon>more_vert</md-icon>
      </md-button>

      <md-menu-content class="editMenu">
        <md-menu-item @click="onClickEditDates">
          <md-icon>event</md-icon>
          <span>Edit Dates</span>
        </md-menu-item>
        <md-menu-item @click="onClickEditTags">
          <md-icon>local_offer</md-icon>
          <span>Edit Tags</span>
        </md-menu-item>
        <md-menu-item>
          <md-icon>favorite</md-icon>
          <span>Favorite</span>
        </md-menu-item>
        <md-menu-item>
          <md-icon>archive</md-icon>
          <span>Archive</span>
        </md-menu-item>
        <md-divider></md-divider>
        <md-menu-item>
          <md-icon>delete</md-icon>
          <span>Delete</span>
        </md-menu-item>
      </md-menu-content>
    </md-menu>

  </div>
</template>

<script>
  export default {
    computed: {
      selectedPhotos: {
        get () {
          return this.$store.state.selection.selectedPhotos
        },
        set (value) {
          this.$store.commit('selectedPhotos', value)
        }
      }
    },

    methods: {
      onClickEditDates () {
        this.$store.commit('showEditDate', true)
      },
      onClickEditTags () {
        this.$store.commit('showEditTags', true)
      }
    }
  }
</script>

<style scoped>
  .flexFlow {
    /*-webkit-box-orient: horizontal;*/
    /*-webkit-box-direction: normal;*/
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
