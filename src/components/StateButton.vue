<template>
  <MdButton @click="onClick" class="md-raised" :class="{'md-primary': selected}">
    <slot></slot>
  </MdButton>
</template>

<script>
  import ExifDetailsPane from './ExifDetailsPane.vue'
  import TagDetailsPane from './TagDetailsPane.vue'
  import ActionMenu from './ActionMenu.vue'
  import Rating from './Rating.vue'
  import util from '../js/util'

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
