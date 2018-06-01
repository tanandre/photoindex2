<template>
  <div class="exifDetailsPane">
    <div v-for='(exifSection, key) in exif'>
      <div class='exifHeader'>{{key}}</div>
      <table>
        <tbody>
        <tr v-for='(value, key) in exifSection'>
          <td class='key'>{{key}}</td>
          <td>{{value}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    dependencies: ['urlHelper', 'navigator', 'dataRetriever'],
    props: ['photo'],
    data () {
      return {
        exif: {}
      }
    },
    methods: {
      loadExif () {
        this.exif = {}

        this.dataRetriever.retrieveExif(this.photo).then(data => {
          this.exif = data.body
        })
      }
    },
    mounted () {
      this.loadExif()
    },
    watch: {
      'photo' () {
        if (!this.photo) {
          this.exif = {}
          return
        }
        this.loadExif()
      }
    }
  }
</script>

<style scoped>
</style>
