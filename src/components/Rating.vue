<template>
  <div>
    <MdIcon v-for='idx in rating' :key="idx">star</MdIcon>
    <MdIcon v-for='idx in ratingLeft' :key='idx + rating'>star_border</MdIcon>
  </div>
</template>

<script>
  export default {
    props: ['rating'],
    computed: {
      ratingLeft () {
        return this.rating > 5 ? 0 : 5 - this.rating
      }
    }
  }
</script>

<style scoped>
</style>
