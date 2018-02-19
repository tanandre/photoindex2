<template>
  <div>
    <div class="datePane">
      <MdField class="dateField">
        <MdInput v-model="date" :disabled="!editDate"></MdInput>
      </MdField>
      <MdField class="small dateField">
        <MdInput v-model="time" :disabled="!editDate"></MdInput>
      </MdField>
    </div>
    <md-button v-if="!editDate" class="md-icon-button" @click="editDate = true" title="edit date">
      <mdIcon>edit</mdIcon>
    </md-button>
    <md-button v-if="editDate" class="md-icon-button" @click="editDate = false; saveDate()" title="save date">
      <mdIcon>save</mdIcon>
    </md-button>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    dependencies: ['urlHelper', 'navigator'],
    props: ['photo'],
    data () {
      return {
        editDate: false,
        date: this.photo.date.substring(0, 10),
        time: this.photo.date.substring(11)
      }
    },
    methods: {
      saveDate () {
        Vue.http.post(this.urlHelper.getPhotoUpdateUrl(), {
          date: (this.date.trim() + ' ' + this.time.trim()),
          id: [this.photo.id]
        }, {
          emulateJSON: true
        }).then(resp => {
          console.log('success', resp.body)
        }).catch(err => {
          console.error('error', err)
        })
      }
    }
  }
</script>

<style scoped>
  .datePane {
    display: inline-block;
    width: 80%;
  }

  .md-icon-button {
    display: inline-block;
    width: 20%;
  }

  .dateField {
    padding: 0;
    border: none;
    min-height: auto;
  }

  .dateField input:not([disabled]) {
    background-color: #888;
  }

  .dateField:after {
    content: none;
  }

  .dateField.small input {
    font-size: 0.7em;
    height: inherit;
    line-height: inherit;
  }

  .inputStyle {
    border: none;
    background-color: transparent;
    color: inherit;
    font-family: inherit;
  }
</style>
