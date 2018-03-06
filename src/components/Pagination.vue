<template>

  <div class="pagination">
    <MdButton :class="getCssClass(idx)" v-if="shouldDisplay(idx)" v-for="idx in pageCount"
              :key="idx" @click="onClick(idx)"
              class="paginationButton md-raised pageButton">{{idx}}
    </MdButton>
    <!--<input v-if="pageCount > pageThreshold" class="pageInput" type="number" md-layout="box" v-model="page"/>-->
    <input v-if="pageCount > pageThreshold" type="range" min="1" :max="pageCount" v-model="page" class="slider">
  </div>
</template>

<script>
  import util from '../js/util'

  export default {
    dependencies: ['navigator'],
    data () {
      return {
        range: 2,
        pageThreshold: 7,
        delay: util.delay()
      }
    },
    computed: {
      page: {
        get () {
          return this.$store.state.gallery.page
        },
        set (value) {
          this.delay(() => {
            this.navigator.setPage(value)
          }, 500)
        }
      },
      pageCount () {
        return this.$store.state.gallery.pageCount
      }
    },
    methods: {
      onClick (idx) {
        this.navigator.setPage(idx)
      },

      shouldDisplay (idx) {
        if (this.pageCount === 1) {
          return false
        }

        if (this.pageCount < this.pageThreshold) {
          return true
        }
        if (idx === 1 || idx === this.pageCount) {
          return true
        }

        if (idx < 7 && this.page <= 3) {
          return true
        }

        if (idx > (this.pageCount - (this.pageThreshold - 1)) && this.page >= (this.pageCount - 3)) {
          return true
        }

        if (Math.abs(idx - this.page) <= this.range) {
          return true
        }

        return false
      },

      getCssClass (idx) {
        if (idx === this.page) {
          return 'md-primary'
        }
        return ''
      }
    }
  }
</script>

<style scoped>
  .paginationButton {
    /*width: 40px;*/
    width: calc(100% / 7);
    min-width: inherit;
    margin: 0;
  }

  .pageInput {
    border: 0;
    /*width: 40px;*/
    width: calc(100% / 7);
    /*background-color: transparent;*/
    /*color: white;*/
  }

  .slider {
    -webkit-appearance: none; /* Override default CSS styles */
    appearance: none;
    width: 100%; /* Full-width */
    height: 10px; /* Specified height */
    background: #555; /* Grey background */
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
  }

  /* Mouse-over effects */
  .slider:hover {
    opacity: 1; /* Fully shown on mouse-over */
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 15px; /* Set a specific slider handle width */
    height: 15px; /* Slider handle height */
    background: #448aff; /* Green background */
    cursor: pointer; /* Cursor on hover */
    border-radius: 5px;
    border: 1px solid black;
  }

  .slider::-moz-range-thumb {
    width: 15px; /* Set a specific slider handle width */
    height: 15px; /* Slider handle height */
    background: #448aff; /* Green background */
    cursor: pointer; /* Cursor on hover */
    border-radius: 5px;
    border: 1px solid black;
  }
</style>
