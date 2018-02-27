<template>
  <div>
    <MdButton class="md-icon-button" v-for='idx in 5' :key="idx" @click="updateRating(idx)" :title="'rate ' + idx">
      <MdIcon v-if="idx <= selectedRating">star</MdIcon>
      <MdIcon v-if="idx > selectedRating">star_border</MdIcon>
    </MdButton>
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
