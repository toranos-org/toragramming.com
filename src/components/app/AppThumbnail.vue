<template>
  <div>
    <nuxt-img
      :src="`/${lightImg}`"
      class="light-img"
      width="1280"
      height="640"
      :alt="`${title}-thumbnail`"
    />
    <nuxt-img
      :src="`/${darkImg}`"
      class="dark-img"
      width="1280"
      height="640"
      :alt="`${title}-thumbnail`"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: [Object, String],
      default: 'default-thumbnail.png',
    },
  },
  computed: {
    lightImg() {
      return this.thumbnail.light || this.thumbnail
    },
    darkImg() {
      return this.thumbnail.dark || this.thumbnail
    },
  },
}
</script>
