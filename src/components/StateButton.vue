<template>
  <v-btn fab small flat @click="onClick" :class="{'primary': selected}">
    <slot></slot>
  </v-btn>
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
