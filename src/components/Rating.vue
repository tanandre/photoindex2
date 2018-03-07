<template>
  <div>
    <MdIcon v-for='idx in rating' :key="idx">star</MdIcon>
  </div>
</template>

<script>
  export default {
    props: ['rating']
  }
</script>
