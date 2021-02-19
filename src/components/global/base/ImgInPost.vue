<template>
  <nuxt-img :src="`${dir}/${src}`" :alt="alt"></nuxt-img>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
  computed: {
    dir() {
      return `/assets${this.$route.path.toString()}`
    },
  },
})
</script>
