<template>
  <MdContent class="photoDetailsPane md-scrollbar">
    <md-progress-bar class="loadingBar" v-if="status == 'loading'" md-mode="indeterminate"></md-progress-bar>
    <md-button class="md-icon-button" @click="onClose" title="close">
      <md-icon>clear</md-icon>
    </md-button>
    <a :href="downloadUrl" download>
      <md-button class="md-icon-button" title="download">
        <md-icon>get_app</md-icon>
      </md-button>
    </a>
    <MdContent class="sideBar">
      <MdList>
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
          <md-button class="md-icon-button">
            <mdIcon v-if="isVideo">videocam</mdIcon>
            <mdIcon v-if="!isVideo">photo_camera</mdIcon>
          </md-button>
          <div class="md-list-item-text">
            <span>{{photoFileName}}</span>
            <span class="small" :title="photo.path">{{photo.path}}</span>
          </div>
        </MdListItem>
      </MdList>
      <TagDetailsPane :photo="photo"></TagDetailsPane>
      <ExifDetailsPane :photo="photo"></ExifDetailsPane>
    </MdContent>
  </MdContent>
</template>

<script>
  import Vue from 'vue'
  import ExifDetailsPane from './ExifDetailsPane.vue'
  import TagDetailsPane from './TagDetailsPane.vue'
  import util from '../js/util'

  export default {
    dependencies: ['urlHelper', 'navigator'],
    props: ['photo'],
    components: {
      ExifDetailsPane,
      TagDetailsPane
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
      photoDate () {
        let date = new Date(this.photo.dateInMillis)
        return date.toDateString()
      },
      photoDateTime () {
        let date = new Date(this.photo.dateInMillis)
        return date.toTimeString()
      },
      isVideo () {
        return util.isVideo(this.photo)
      },
      downloadUrl () {
        return this.urlHelper.getPhotoUrl(this.photo)
      }
    },
    methods: {
      onClickDate () {
        let date = this.photo.date.substring(0, 10).replace(/-/g, '')
        this.navigator.setTags(date)
        this.navigator.clearPhoto()
      },
      onUpdate (event) {
        Vue.http.post(this.urlHelper.getPhotoDateUrl(this.photo, this.photoDate.getTime()))
        console.log('update')
      },
      onClose () {
        this.navigator.clearPhoto()
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

  .md-list-item-content {
    padding: 0;
  }
</style>
