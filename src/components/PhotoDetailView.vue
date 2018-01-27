<template>
  <div class="photoDetailView">
    <photo-pane class="photoPane" :photo="photo"></photo-pane>
    <div class="photoDetailsPane">
      <md-button class="md-icon-button" @click="onClose" title="close">
        <md-icon>clear</md-icon>
      </md-button>
      <a :href="downloadUrl" download>
        <md-button class="md-icon-button" title="download">
          <md-icon>get_app</md-icon>
        </md-button>
      </a>
      <div>{{getPhotoDate()}}</div>
      <md-field>
        <md-datepicker v-model="photoDate" :md-open-on-focus="true" v-on:keydown.stop="doNothing"/>
      </md-field>
      <md-button class="md-raised" @click="onUpdate" title="close">
        save
      </md-button>
      <div>{{photo.path}}</div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import PhotoPane from './PhotoPane.vue'

  export default {
    components: {PhotoPane},
    dependencies: ['urlHelper', 'navigator'],
    props: ['photo'],
    data: function () {
      return {
        photoDate: this.photo.date,
        downloadUrl: ''
      }
    },
    methods: {
      onUpdate: function (event) {
        Vue.http.post(this.urlHelper.getPhotoDateUrl(this.photo, this.photoDate.getTime()))
        console.log('update')
      },
      doNothing: function (event) {
        // nothing
        console.log('donohting')
      },
      getPhotoDate: function () {
        let date = new Date(this.photo.dateInMillis)
        return date.toDateString() + ' ' + date.toLocaleTimeString()
      },
      onClose: function () {
        this.navigator.clearPhoto()
      }
    },
    mounted: function () {
      document.body.classList.add('noScroll')
      this.downloadUrl = this.urlHelper.getPhotoUrl(this.photo)
    },
    beforeDestroy: function () {
      document.body.classList.remove('noScroll')
    }
  }
</script>

<style scoped>
  .photoDetailView {
    background-color: #000;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }

  .photoDetailsPane {
    background-color: #111;
    position: absolute;
    right: 0;
    width: 20%;
    height: 100%;
    overflow: auto;
    font-size: 11px;
    padding: 4px;
  }

  .photoPane {
    position: absolute;
    width: 80%;
    height: 100%;
  }

</style>
