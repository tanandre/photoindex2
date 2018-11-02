<template>
  <div class="photoDetailsPane">
    <v-progress-linear v-if="status == 'loading'" class="loadingBar" :indeterminate="true"></v-progress-linear>
    <v-toolbar dense flat class="detailsToolbar">
      <ActionMenu @click.native="onClickAction"></ActionMenu>
      <a :href="downloadUrl" download>
        <v-btn small fab flat title="download">
          <v-icon>get_app</v-icon>
        </v-btn>
      </a>
      <div>
        <v-btn fab small @click="onClose" title="close">
          <v-icon>clear</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <v-card class="sideBar">
      <v-list>
        <v-list-tile>
          <v-btn fab small flat @click="rotate(1)" title="rotate clockwise">
            <v-icon>rotate_right</v-icon>
          </v-btn>
          <v-btn fab small flat @click="rotate(-1)" title="rotate counter-clockwise">
            <v-icon>rotate_left</v-icon>
          </v-btn>
        </v-list-tile>
        <v-list-tile>
          <Rating :rating="photo.rating"></Rating>
          {{photo.rating}}
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-btn fab small flat @click="onClickDate" title="search by date">
              <v-icon>event</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-content>
            <div>
              <span>{{photoDate}}</span>
              <span class="small" :title="photoDateTime">{{photoDateTime}}</span>
            </div>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-btn v-if="!isVideo" fab small flat>
              <v-icon>photo_camera</v-icon>
            </v-btn>
            <StateButton v-if="isVideo" title="click to toggle video" @click.native="toggleVideo">
              <v-icon>videocam</v-icon>
            </StateButton>
          </v-list-tile-action>
          <v-list-tile-content>
            <div>
              <span>{{photoFileName}}</span>
              <span class="small" :title="photo.path">{{photo.path}}</span>
              <a :href="kanjiPath">
                <span class="small" :title="kanjiPath">{{kanjiPath}}</span>
              </a>
            </div>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <TagDetailsPane :photo="photo"></TagDetailsPane>
      <ExifDetailsPane :photo="photo"></ExifDetailsPane>
    </v-card>
  </div>
</template>

<script>
  import ExifDetailsPane from './ExifDetailsPane.vue'
  import TagDetailsPane from './TagDetailsPane.vue'
  import ActionMenu from './ActionMenu.vue'
  import StateButton from './StateButton.vue'
  import Rating from './Rating.vue'
  import util from '../js/util'

  export default {
    dependencies: ['urlHelper', 'navigator'],
    props: ['photo'],
    components: {
      ExifDetailsPane,
      TagDetailsPane,
      ActionMenu,
      StateButton,
      Rating
    },
    data() {
      return {
        status: 'idle'
      }
    },
    computed: {
      photoFileName() {
        let index = this.photo.path.lastIndexOf('/')
        return this.photo.path.substring(index + 1)
      },
      kanjiPath() {
        let index = this.photo.path.lastIndexOf('/')
        return this.photo.path.substring(0, index).replace('/volume1', '\\\\kanji').replace(/\//g, '\\')
      },
      photoDate() {
        return this.photo.date.substring(0, 11)
      },
      photoDateTime() {
        return this.photo.date.substring(11)
      },
      isVideo() {
        return util.isVideo(this.photo)
      },
      downloadUrl() {
        return this.urlHelper.getPhotoUrl(this.photo)
      }
    },
    methods: {
      rotate(direction) {
        this.$emit('rotate', direction)
      },
      toggleVideo() {
        this.$emit('toggleVideo')
      },
      onClickAction() {
        console.log('onclikc')
      },
      onClickDate() {
        let date = this.photo.date.substring(0, 10).replace(/-/g, '')
        this.navigator.setDates(util.tagsToHashObject([date]), this.$route)
        this.navigator.clearPhoto()
      },
      onClose() {
        this.navigator.clearPhoto()
      }
    }
  }
</script>

<style scoped>
  .v-toolbar.detailsToolbar {
    background-color: transparent;
  }

  .sideBar {
    padding: 10px;
  }

  .photoDetailsPane {
background-color: #424242;
    overflow: auto;
    font-size: 11px;
    padding: 0;
  }

  .filePath {
    word-break: break-all;
  }

  .small {
    font-size: 0.7em;
  }

  .loadingBar {
    position: absolute;
    width: 100%;
    top: 0;
  }
</style>
