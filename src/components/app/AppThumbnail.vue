<template>
  <div>
    <nuxt-img
      :src="`${imgDir}/${lightImg}`"
      class="light-img"
      width="1280"
      :alt="`${title}-thumbnail`"
    />
    <nuxt-img
      :src="`${imgDir}/${darkImg}`"
      class="dark-img"
      width="1280"
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
    imgDir: {
      type: String, // PagePost, PagePostList からうまいこと document.dir ？ あたりをワタス
      default: '',
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
