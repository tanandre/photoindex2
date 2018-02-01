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
      <md-field>
        <md-datepicker v-model="photoDate" :md-open-on-focus="true" v-on:keydown.stop="doNothing"/>
      </md-field>
      <md-button class="md-raised" @click="onUpdate" title="close">
        save
      </md-button>
      <div class="chips">
        <md-chip v-for="tag in tags" :key="tag">{{tag}}
        </md-chip>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    dependencies: ['urlHelper', 'navigator', 'tagsLoader'],
    props: ['photo'],
    data: function () {
      return {
        photoDate: this.photo.date,
        tags: [],
        status: 'idle'
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
      },
      loadTags: function () {
        this.tags = []
        let url = this.urlHelper.getTagsUrl(this.photo)

        if (this.promise && !this.promise.isDone()) {
          this.promise.cancel()
        }

        this.promise = this.tagsLoader.load(url).then(data => {
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
