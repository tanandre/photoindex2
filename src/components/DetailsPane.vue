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
      <div>{{photo.path}}</div>
      <md-field>
        <md-datepicker v-model="photoDate" :md-open-on-focus="true"/>
      </md-field>
      <md-button class="md-raised" @click="onUpdate" title="close">
        save
      </md-button>
      <div class="chips">
        <md-chip v-for="tag in tags" :key="tag" md-clickable @click="onClickTag(tag)">{{tag}}
        </md-chip>
      </div>
      <ExifDetailsPane :photo="photo"></ExifDetailsPane>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ExifDetailsPane from './ExifDetailsPane.vue'

  export default {
    dependencies: ['urlHelper', 'navigator', 'dataRetriever'],
    props: ['photo'],
    components: {
      ExifDetailsPane
    },
    data: function () {
      return {
        photoDate: this.photo.date,
        tags: [],
        status: 'idle'
      }
    },
    methods: {
      onClickTag: function (tag) {
        this.navigator.setTags(this.navigator.tagsToHashObject([tag]))
//        this.navigator.clearPhoto()
      },
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
      },
      loadTags: function () {
        this.tags = []

        this.promise = this.dataRetriever.retrieveTags(this.photo).then(data => {
          this.status = 'completed'
          this.tags = data.body.tags
        }, (err) => {
          console.error(err)
          this.status = 'error'
          this.isDone = true
        }, () => {
          this.status = 'loading'
        })
      }
    },
    mounted: function () {
      this.loadTags()
    },
    computed: {
      downloadUrl: function () {
        this.urlHelper.getPhotoUrl(this.photo)
      }
    },
    watch: {
      'photo': function () {
        if (!this.photo) {
          this.tags = []
          return
        }
        this.loadTags()
      }
    },
    beforeDestroy: function () {
      if (this.promise) {
        this.promise.cancel()
      }
    }
  }
</script>

<style scoped>
  .sideBar {
  }

  .loadingBar {
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
  }

  .chips {
  }
</style>
