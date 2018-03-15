<template>
  <MdButton @click="onClick" class="md-raised" :class="{'md-primary': selected}">
    <slot></slot>
  </MdButton>
</template>

<script>
  export default {
    data () {
      return {
        selected: false
      }
    },
    methods: {
      onClick () {
        this.selected = !this.selected
      }
    }
  }
</script>
