<template>
  <div class="photoDetailsPane">
    <md-progress-bar class="loadingBar" v-if="status == 'loading'" md-mode="indeterminate"></md-progress-bar>
    <div class="sideBar">
      <md-button class="md-icon-button" @click="onClose" title="close">
        <md-icon>clear</md-icon>
      </md-button>
      <a :href="downloadUrl" download>
        <md-button class="md-icon-button" title="download">
          <md-icon>get_app</md-icon>
        </md-button>
      </a>
      <div>{{getPhotoDate()}}</div>
      <div class="filePath">{{photo.path}}</div>
      <md-field>
        <md-datepicker v-model="photoDate" :md-open-on-focus="true"/>
      </md-field>
      <md-button class="md-raised" @click="onUpdate" title="close">
        save
      </md-button>
      <TagDetailsPane :photo="photo"></TagDetailsPane>
      <ExifDetailsPane :photo="photo"></ExifDetailsPane>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ExifDetailsPane from './ExifDetailsPane.vue'
  import TagDetailsPane from './TagDetailsPane.vue'

  export default {
    dependencies: ['urlHelper', 'navigator', 'dataRetriever'],
    props: ['photo'],
    components: {
      ExifDetailsPane,
      TagDetailsPane
    },
    data: function () {
      return {
        photoDate: this.photo.date,
        status: 'idle'
      }
    },
    methods: {
      onUpdate: function (event) {
        Vue.http.post(this.urlHelper.getPhotoDateUrl(this.photo, this.photoDate.getTime()))
        console.log('update')
      },
      getPhotoDate: function () {
        let date = new Date(this.photo.dateInMillis)
        return date.toDateString() + ' ' + date.toLocaleTimeString()
      },
      onClose: function () {
        this.navigator.clearPhoto()
      }
    },
    computed: {
      downloadUrl: function () {
        this.urlHelper.getPhotoUrl(this.photo)
      }
    }
  }
</script>

<style scoped>
  .sideBar {
    padding: 0 10px;
  }

  .photoDetailsPane {
    background-color: #111;
    position: absolute;
    right: 0;
    width: 20%;
    height: 100%;
    overflow: auto;
    font-size: 11px;
    padding: 0;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.9);
  }

  .filePath {
    word-break: break-all;
  }
</style>
