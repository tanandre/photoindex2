<template>
  <div>
    <v-icon v-for='idx in rating' :key="idx">star</v-icon>
  </div>
</template>

<script>
  export default {
    props: ['rating']
  }
</script>
