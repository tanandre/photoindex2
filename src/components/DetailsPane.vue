<template>
  <MdContent class="photoDetailsPane md-scrollbar">
    <md-progress-bar class="loadingBar" v-if="status == 'loading'" md-mode="indeterminate"></md-progress-bar>
    <md-toolbar class="md-transparent md-dense" md-elevation="0">
      <ActionMenu @click.native="onClickAction"></ActionMenu>
      <a :href="downloadUrl" download>
        <md-button class="md-icon-button" title="download">
          <md-icon>get_app</md-icon>
        </md-button>
      </a>
      <div class="md-toolbar-section-end">
        <md-button class="md-raised md-icon-button" @click="onClose" title="close">
          <md-icon>clear</md-icon>
        </md-button>
      </div>
    </md-toolbar>
    <MdContent class="sideBar">
      <MdList>
        <MdListItem>
          <md-button class="md-icon-button" @click="rotate(1)" title="rotate clockwise">
            <mdIcon>rotate_right</mdIcon>
          </md-button>
          <md-button class="md-icon-button" @click="rotate(-1)" title="rotate counter-clockwise">
            <mdIcon>rotate_left</mdIcon>
          </md-button>
        </MdListItem>
        <MdListItem>
          <Rating :rating="photo.rating"></Rating>
          {{photo.rating}}
        </MdListItem>
        <MdListItem>
          <md-button class="md-icon-button" @click="onClickDate" title="search by date">
            <mdIcon>event</mdIcon>
          </md-button>
          <div class="md-list-item-text">
            <span>{{photoDate}}</span>
            <span class="small" :title="photoDateTime">{{photoDateTime}}</span>
          </div>
        </MdListItem>
        <MdListItem>
          <MdButton v-if="!isVideo" class="md-icon-button">
            <mdIcon>photo_camera</mdIcon>
          </MdButton>
          <StateButton v-if="isVideo" class="md-icon-button" title="click to toggle video" @click.native="toggleVideo">
            <mdIcon>videocam</mdIcon>
          </StateButton>
          <div class="md-list-item-text">
            <span>{{photoFileName}}</span>
            <span class="small" :title="photo.path">{{photo.path}}</span>
            <a :href="kanjiPath">
              <span class="small" :title="kanjiPath">{{kanjiPath}}</span>
            </a>
          </div>
        </MdListItem>
      </MdList>
      <TagDetailsPane :photo="photo"></TagDetailsPane>
      <ExifDetailsPane :photo="photo"></ExifDetailsPane>
    </MdContent>
  </MdContent>
</template>

<script>
  import ExifDetailsPane from './ExifDetailsPane.vue'
  import TagDetailsPane from './TagDetailsPane.vue'
  import ActionMenu from './ActionMenu.vue'
  import StateButton from './StateButton.vue'
  import Rating from './Rating.vue'
  import util from '../js/util'

  export default {
    props: ['photo'],
    components: {
      ExifDetailsPane,
      TagDetailsPane,
      ActionMenu,
      StateButton,
      Rating
    },
    data () {
      return {
        status: 'idle'
      }
    },
    computed: {
      photoFileName () {
        let index = this.photo.path.lastIndexOf('/')
        return this.photo.path.substring(index + 1)
      },
      kanjiPath () {
        let index = this.photo.path.lastIndexOf('/')
        return this.photo.path.substring(0, index).replace('/volume1', '\\\\kanji').replace(/\//g, '\\')
      },
      photoDate () {
        return this.photo.date.substring(0, 11)
      },
      photoDateTime () {
        return this.photo.date.substring(11)
      },
      isVideo () {
        return util.isVideo(this.photo)
      },
      downloadUrl () {
        return this.$store.state.service.urlHelper.getPhotoUrl(this.photo)
      }
    },
    methods: {
      rotate (direction) {
        this.$emit('rotate', direction)
      },
      toggleVideo () {
        this.$emit('toggleVideo')
      },
      onClickAction () {
        console.log('onclikc')
      },
      onClickDate () {
        let date = this.photo.date.substring(0, 10).replace(/-/g, '')
        this.$store.state.service.navigator.setDates(util.tagsToHashObject([date]), this.$route)
        this.$store.state.service.navigator.clearPhoto()
      },
      onClose () {
        this.$store.state.service.navigator.clearPhoto()
      }
    }
  }
</script>

<style scoped>
  .sideBar {
    padding: 10px;
  }

  .photoDetailsPane {
    overflow: auto;
    font-size: 11px;
    padding: 0;
  }

  .filePath {
    word-break: break-all;
  }

  .md-card {
    margin: 5px 0;
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
