<template>
  <div>
    <v-btn flat icon  v-for='idx in 5' :key="idx" @click="updateRating(idx)" :title="'rate ' + idx">
      <v-icon v-if="idx <= selectedRating">star</v-icon>
      <v-icon v-if="idx > selectedRating">star_border</v-icon>
    </v-btn>
  </div>
</template>

<script>
  export default {
    props: ['value', 'type'],
    data () {
      return {
        selectedRating: this.value
      }
    },
    methods: {
      updateRating (rating) {
        if (this.readOnly) {
          return
        }
        this.selectedRating = rating
        this.$emit('input', rating)
      }
    }
  }
</script>

<style scoped>
</style>
